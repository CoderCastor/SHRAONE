"use client"

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   HEADPHONE CHARACTER  –  Pixel Perfect v3
   • Transparent face
   • Smooth morphing transitions between states
   • Accurate ear cups matching reference image
───────────────────────────────────────── */

const STATES = ["idle", "thinking", "happy", "sad", "loading"];

// ── Lerp / easing ──────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOutSine(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }
function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function lerpAngle(a, b, t) {
  let d = ((b - a + 540) % 360) - 180;
  return a + d * t;
}

// Spring physics for smooth interpolation
function makeSpring(stiffness = 0.12, damping = 0.75) {
  return { value: 0, velocity: 0, target: 0, stiffness, damping };
}
function tickSpring(sp, dt = 1) {
  const force = (sp.target - sp.value) * sp.stiffness;
  sp.velocity = sp.velocity * sp.damping + force;
  sp.value += sp.velocity;
  return sp.value;
}

// ── Target values per state ────────────────────────
const STATE_TARGETS = {
  idle: {
    eyeScaleY: 1, eyeOffX: 0, eyeOffY: 0,
    mouthCurve: 0.45,   // 0=flat 1=big smile
    mouthOffY: 0,
    browLift: 0,        // positive=up(thinking), negative=down(sad)
    browAngle: 0,       // tilt
    cheekOpacity: 0,
    headBaseY: 0, headBaseRot: 0,
    // bob/tilt are animated via sine; these are amplitudes
    bobAmp: 2.5, tiltAmp: 1.2, bobSpeed: 0.0005, tiltSpeed: 0.00032,
  },
  thinking: {
    eyeScaleY: 0.52, eyeOffX: -2.5, eyeOffY: -3,
    mouthCurve: 0.08,
    mouthOffY: 2,
    browLift: -6, browAngle: 12,
    cheekOpacity: 0,
    headBaseY: 0, headBaseRot: 0,
    bobAmp: 1.5, tiltAmp: 9, bobSpeed: 0.0007, tiltSpeed: 0.0009,
  },
  happy: {
    eyeScaleY: 0.08, eyeOffX: 0, eyeOffY: 0,
    mouthCurve: 1,
    mouthOffY: 0,
    browLift: 4, browAngle: -5,
    cheekOpacity: 0.38,
    headBaseY: 0, headBaseRot: 0,
    bobAmp: 7, tiltAmp: 6, bobSpeed: 0.0038, tiltSpeed: 0.0042,
  },
  sad: {
    eyeScaleY: 0.5, eyeOffX: 0, eyeOffY: 2.5,
    mouthCurve: -0.55,
    mouthOffY: 8,
    browLift: -4, browAngle: -14,
    cheekOpacity: 0,
    headBaseY: 5, headBaseRot: 0,
    bobAmp: 1.2, tiltAmp: 1.5, bobSpeed: 0.00022, tiltSpeed: 0.00025,
  },
  loading: {
    eyeScaleY: 0.38, eyeOffX: 0, eyeOffY: 0,
    mouthCurve: 0.15,
    mouthOffY: 0,
    browLift: 0, browAngle: 0,
    cheekOpacity: 0,
    headBaseY: 0, headBaseRot: 0,
    bobAmp: 1.5, tiltAmp: 1.2, bobSpeed: 0.0011, tiltSpeed: 0.0013,
  },
};

// ── rAF hook ──────────────────────────────────────
function useRaf(cb) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    let id, last = null;
    const loop = (ts) => {
      const dt = last ? Math.min(ts - last, 50) : 16;
      last = ts;
      cbRef.current(ts, dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
}

export default function App() {
  const [state, setState] = useState("idle");
  const stateRef = useRef("idle");

  // Interpolated display values
  const [disp, setDisp] = useState({
    eyeScaleY: 1, eyeOffX: 0, eyeOffY: 0,
    mouthCurve: 0.45, mouthOffY: 0,
    browLift: 0, browAngle: 0, cheekOpacity: 0,
    headY: 0, headRot: 0,
  });

  const [thinkDots, setThinkDots] = useState([0, 0, 0]);
  const [sparkles, setSparkles] = useState([]);
  const [loadRot, setLoadRot] = useState(0);

  // Spring bank for smooth transitions
  const springs = useRef({
    eyeScaleY: { ...makeSpring(0.1, 0.72), value: 1, target: 1 },
    eyeOffX:   { ...makeSpring(0.1, 0.72), value: 0, target: 0 },
    eyeOffY:   { ...makeSpring(0.1, 0.72), value: 0, target: 0 },
    mouthCurve:{ ...makeSpring(0.09, 0.74), value: 0.45, target: 0.45 },
    mouthOffY: { ...makeSpring(0.09, 0.74), value: 0, target: 0 },
    browLift:  { ...makeSpring(0.1, 0.74), value: 0, target: 0 },
    browAngle: { ...makeSpring(0.1, 0.74), value: 0, target: 0 },
    cheek:     { ...makeSpring(0.08, 0.78), value: 0, target: 0 },
    headY:     { ...makeSpring(0.06, 0.80), value: 0, target: 0 },
    headRot:   { ...makeSpring(0.07, 0.78), value: 0, target: 0 },
  });

  // Blink automaton
  const blink = useRef({ phase: "wait", timer: 0, next: 2500 + Math.random()*2000 });

  // Sparkle timer
  const sparkTick = useRef(0);

  // Handle state change → update spring targets
  const handleSetState = useCallback((s) => {
    stateRef.current = s;
    setState(s);
    const T = STATE_TARGETS[s];
    const sp = springs.current;
    sp.eyeScaleY.target = T.eyeScaleY;
    sp.eyeOffX.target   = T.eyeOffX;
    sp.eyeOffY.target   = T.eyeOffY;
    sp.mouthCurve.target= T.mouthCurve;
    sp.mouthOffY.target = T.mouthOffY;
    sp.browLift.target  = T.browLift;
    sp.browAngle.target = T.browAngle;
    sp.cheek.target     = T.cheekOpacity;
    sp.headY.target     = T.headBaseY;
  }, []);

  // Happy auto-return
  useEffect(() => {
    if (state === "happy") {
      const t = setTimeout(() => handleSetState("idle"), 2500);
      return () => clearTimeout(t);
    }
    if (state !== "happy") setSparkles([]);
  }, [state]);

  useRaf((ts, dt) => {
    const s = stateRef.current;
    const sp = springs.current;
    const T = STATE_TARGETS[s];

    // Tick all springs
    const eScaleY  = tickSpring(sp.eyeScaleY);
    const eOffX    = tickSpring(sp.eyeOffX);
    const eOffY    = tickSpring(sp.eyeOffY);
    const mCurve   = tickSpring(sp.mouthCurve);
    const mOffY    = tickSpring(sp.mouthOffY);
    const bLift    = tickSpring(sp.browLift);
    const bAngle   = tickSpring(sp.browAngle);
    const ck       = tickSpring(sp.cheek);
    const hY       = tickSpring(sp.headY);
    const hRot     = tickSpring(sp.headRot);

    // Sine-wave animation layered on top of spring base
    const bobY  = Math.sin(ts * T.bobSpeed)  * T.bobAmp;
    const tiltR = Math.sin(ts * T.tiltSpeed) * T.tiltAmp;

    // Blink logic (only when eye is naturally open)
    let finalEyeScale = eScaleY;
    if (s === "idle") {
      const bl = blink.current;
      if (bl.phase === "wait") {
        bl.timer += dt;
        if (bl.timer >= bl.next) { bl.phase = "close"; bl.timer = 0; }
      } else if (bl.phase === "close") {
        bl.timer += dt;
        const p = clamp(bl.timer / 90, 0, 1);
        finalEyeScale = Math.max(0.04, 1 - easeInOutQuad(p));
        if (p >= 1) { bl.phase = "open"; bl.timer = 0; }
      } else if (bl.phase === "open") {
        bl.timer += dt;
        const p = clamp(bl.timer / 90, 0, 1);
        finalEyeScale = easeInOutQuad(p);
        if (p >= 1) {
          bl.phase = "wait"; bl.timer = 0;
          bl.next = 2000 + Math.random() * 3000;
        }
      }
    }

    // Thinking dots
    if (s === "thinking") {
      setThinkDots([
        (Math.sin(ts / 370) + 1) / 2,
        (Math.sin(ts / 370 + 2.09) + 1) / 2,
        (Math.sin(ts / 370 + 4.19) + 1) / 2,
      ]);
    }

    // Happy sparkles
    if (s === "happy") {
      sparkTick.current += dt;
      if (sparkTick.current > 190) {
        sparkTick.current = 0;
        setSparkles(prev => [
          ...prev.filter(p => p.life > 0),
          ...Array.from({ length: 5 }, () => ({
            id: Math.random(),
            x: 60 + Math.random() * 280,
            y: 30 + Math.random() * 260,
            life: 1,
            rot: Math.random() * 360,
            sz: 4 + Math.random() * 10,
            vy: -0.6 - Math.random() * 1.6,
          })),
        ]);
      }
      setSparkles(prev =>
        prev.map(p => ({ ...p, life: p.life - 0.02, y: p.y + p.vy })).filter(p => p.life > 0)
      );
    }

    // Loading ring
    if (s === "loading") setLoadRot(ts / 5);

    setDisp({
      eyeScaleY: finalEyeScale,
      eyeOffX: eOffX,
      eyeOffY: eOffY,
      mouthCurve: mCurve,
      mouthOffY: mOffY,
      browLift: bLift,
      browAngle: bAngle,
      cheekOpacity: ck,
      headY: hY + bobY,
      headRot: hRot + tiltR,
    });
  });

  // ── SVG geometry constants ─────────────────────────────────
  // ViewBox: 0 0 400 400
  // Face: cx=200, cy=230, r=90  (transparent fill)
  // Eyes: (165,215) and (235,215), r=8.5
  // Mouth centre: y≈250
  //
  // EAR CUPS (from reference image analysis):
  //   The cups are pill/stadium shaped, taller than wide.
  //   Left cup:  slightly inward-leaning top, wider at bottom.
  //     Outer dark shell cx≈116 cy≈228, rx≈28 ry≈46
  //     Inner bright red, slightly smaller, offset inward
  //   Right cup: mirror
  //   They attach at band endpoint via a small connecting piece
  //
  // BAND: cubic bezier from L-cup-top to R-cup-top peaking at y≈100

  const FCX = 200, FCY = 230, FR = 90;
  const LEX = 165, REX = 235, EYE_Y = 215, EYE_R = 8.5;
  const MOUTH_Y = 252;

  // Mouth path generated from mouthCurve spring
  // mouthCurve: -1=sad frown, 0=flat, 0.45=gentle smile, 1=big happy
  const buildMouth = (curve, offY) => {
    const cy = MOUTH_Y + offY;
    const w = 26;          // half-width of mouth
    const depth = curve * 26; // control point depth
    const x1 = FCX - w + 6, x2 = FCX + w - 6;
    return `M${x1},${cy} Q${FCX},${cy + depth} ${x2},${cy}`;
  };

  // Brow positions
  const buildBrows = (lift, angle) => {
    // Left brow centred on eye
    const lx = LEX, rx = REX, by = EYE_Y - 24;
    const hw = 18; // half-width
    const tiltL = angle; // degrees of tilt
    const tiltR = -angle;
    const rad = a => a * Math.PI / 180;
    const lx1 = lx - hw, lx2 = lx + hw;
    const rx1 = rx - hw, rx2 = rx + hw;
    // lift moves brows up (negative = down)
    const ly1 = by - lift + Math.sin(rad(tiltL)) * hw;
    const ly2 = by - lift - Math.sin(rad(tiltL)) * hw;
    const ry1 = by - lift + Math.sin(rad(tiltR)) * hw;
    const ry2 = by - lift - Math.sin(rad(tiltR)) * hw;
    return { lx1, ly1, lx2, ly2, rx1, ry1, rx2, ry2 };
  };

  const br = buildBrows(disp.browLift, disp.browAngle);
  const showBrows = Math.abs(disp.browLift) > 0.5 || Math.abs(disp.browAngle) > 0.5;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ECEAE6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    }}>

      <svg width="400" height="420" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
        <defs>
          {/* Clip so face features stay inside face circle */}
          <clipPath id="faceClip">
            <circle cx={FCX} cy={FCY} r={FR} />
          </clipPath>
        </defs>

        {/* ── Sparkles ── */}
        {sparkles.map(sp => (
          <g key={sp.id}
            transform={`translate(${sp.x},${sp.y}) rotate(${sp.rot})`}
            opacity={sp.life * 0.9}
          >
            <path
              d={`M0,${-sp.sz} L${sp.sz*.26},${-sp.sz*.26} L${sp.sz},0 L${sp.sz*.26},${sp.sz*.26} L0,${sp.sz} L${-sp.sz*.26},${sp.sz*.26} L${-sp.sz},0 L${-sp.sz*.26},${-sp.sz*.26}Z`}
              fill="#E03020"
            />
          </g>
        ))}

        {/* ── Main character group ── */}
        <g transform={`translate(0,${disp.headY})`}>
          <g transform={`rotate(${disp.headRot},${FCX},${FCY})`}>

            {/* ══════════════════════════════════════
                HEADPHONES — drawn carefully to match
                reference image pixel-by-pixel
                ══════════════════════════════════════ */}

            {/*
              LEFT EAR CUP
              Reference: the left cup is a tall oval that's wider/fuller
              in the middle, dark maroon on outside, bright red cushion
              on the face-side. Top of cup connects to band.
              The cup sits OUTSIDE the face, overlapping it slightly.

              Shape analysis:
              - Overall pill: ~56px wide, ~88px tall
              - Rotated slightly (~15deg) so top tilts right toward face
              - Center at roughly (108, 228)
              - Dark maroon outer: full pill
              - Red inner cushion: slightly smaller, offset toward face (right)
              - Very dark maroon/brown inner-right edge giving 3D depth
            */}
            <g transform="translate(108,230) rotate(-8)">
              {/* Dark maroon outer shadow/shell */}
              <ellipse cx="0" cy="0" rx="30" ry="48" fill="#6B1008" />
              {/* Mid dark red */}
              <ellipse cx="2" cy="0" rx="27" ry="45" fill="#9E1810" />
              {/* Bright red main body */}
              <ellipse cx="4" cy="0" rx="23" ry="41" fill="#E03020" />
              {/* Dark inner-right depth shadow */}
              <ellipse cx="14" cy="0" rx="10" ry="32" fill="#7A1208" opacity="0.55" />
              {/* Highlight top-left */}
              <ellipse cx="-6" cy="-16" rx="9" ry="13" fill="#F05040" opacity="0.38" />
            </g>

            {/*
              RIGHT EAR CUP — mirror of left
              Center at roughly (292, 228)
            */}
            <g transform="translate(292,230) rotate(8)">
              {/* Dark maroon outer */}
              <ellipse cx="0" cy="0" rx="30" ry="48" fill="#6B1008" />
              {/* Mid dark red */}
              <ellipse cx="-2" cy="0" rx="27" ry="45" fill="#9E1810" />
              {/* Bright red main body */}
              <ellipse cx="-4" cy="0" rx="23" ry="41" fill="#E03020" />
              {/* Dark inner-left depth shadow */}
              <ellipse cx="-14" cy="0" rx="10" ry="32" fill="#7A1208" opacity="0.55" />
              {/* Highlight top-right */}
              <ellipse cx="6" cy="-16" rx="9" ry="13" fill="#F05040" opacity="0.38" />
            </g>

            {/*
              HEADPHONE BAND
              Cubic bezier arc from top of L-cup to top of R-cup.
              Left top connect point ~(118, 184)
              Right top connect point ~(282, 184)
              Arc peaks around y=100 at center x=200

              Band construction (matching reference):
              1. Dark maroon thick stroke — outer border/shadow
              2. Bright red thick stroke — main band
              3. Thin lighter highlight on top edge
            */}
            {/* Dark outer border */}
            <path
              d="M120,188 C120,98 280,98 280,188"
              fill="none"
              stroke="#6B1008"
              strokeWidth="34"
              strokeLinecap="round"
            />
            {/* Main red band */}
            <path
              d="M120,188 C120,98 280,98 280,188"
              fill="none"
              stroke="#E03020"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Top highlight strip */}
            <path
              d="M124,183 C124,105 276,105 276,183"
              fill="none"
              stroke="#F05540"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.45"
            />

            {/* ══════════════════════════════════════
                FACE — transparent circle (no fill)
                ══════════════════════════════════════ */}
            <circle cx={FCX} cy={FCY} r={FR} fill="transparent" />

            {/* ── Cheeks (happy state) ── */}
            {disp.cheekOpacity > 0.01 && (
              <>
                <ellipse cx={FCX - 52} cy={FCY + 12}
                  rx="28" ry="14"
                  fill="#FF7055"
                  opacity={disp.cheekOpacity * 0.85}
                />
                <ellipse cx={FCX + 52} cy={FCY + 12}
                  rx="28" ry="14"
                  fill="#FF7055"
                  opacity={disp.cheekOpacity * 0.85}
                />
              </>
            )}

            {/* ── Eyebrows ── (spring-animated, appear in thinking/sad) */}
            {showBrows && (
              <>
                <line
                  x1={br.lx1} y1={br.ly1} x2={br.lx2} y2={br.ly2}
                  stroke="#E03020" strokeWidth="3.5" strokeLinecap="round"
                  opacity={Math.min(1, Math.abs(disp.browLift) / 3)}
                />
                <line
                  x1={br.rx1} y1={br.ry1} x2={br.rx2} y2={br.ry2}
                  stroke="#E03020" strokeWidth="3.5" strokeLinecap="round"
                  opacity={Math.min(1, Math.abs(disp.browLift) / 3)}
                />
              </>
            )}

            {/* ── Tears (sad) — clipped to face ── */}
            <g clipPath="url(#faceClip)">
              {stateRef.current === "sad" && disp.eyeScaleY < 0.7 && (
                <>
                  <ellipse cx={LEX} cy={EYE_Y + 28}
                    rx="5" ry="12"
                    fill="#AADDFF"
                    opacity={Math.max(0, (0.72 - disp.eyeScaleY) * 1.4)}
                  />
                  <ellipse cx={REX} cy={EYE_Y + 28}
                    rx="5" ry="12"
                    fill="#AADDFF"
                    opacity={Math.max(0, (0.72 - disp.eyeScaleY) * 1.4)}
                  />
                </>
              )}
            </g>

            {/* ── Left Eye ── */}
            <g transform={`translate(${LEX + disp.eyeOffX}, ${EYE_Y + disp.eyeOffY})`}>
              <ellipse
                cx="0" cy="0"
                rx={EYE_R}
                ry={EYE_R * Math.max(0.04, disp.eyeScaleY)}
                fill="#E03020"
              />
            </g>

            {/* ── Right Eye ── */}
            <g transform={`translate(${REX + disp.eyeOffX}, ${EYE_Y + disp.eyeOffY})`}>
              <ellipse
                cx="0" cy="0"
                rx={EYE_R}
                ry={EYE_R * Math.max(0.04, disp.eyeScaleY)}
                fill="#E03020"
              />
            </g>

            {/* ── Mouth ── spring-animated path */}
            <path
              d={buildMouth(disp.mouthCurve, disp.mouthOffY)}
              stroke="#E03020"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

          </g>{/* /rotate */}
        </g>{/* /translateY */}

        {/* ── Thinking dots — outside rotation so they float stably ── */}
        {stateRef.current === "thinking" && (
          <g transform={`translate(0,${disp.headY})`}>
            {thinkDots.map((d, i) => (
              <circle
                key={i}
                cx={308 + i * 21}
                cy={178 - d * 24}
                r={5 + d * 4.5}
                fill="#E03020"
                opacity={0.18 + d * 0.82}
              />
            ))}
          </g>
        )}

        {/* ── Loading ring ── */}
        {stateRef.current === "loading" && (
          <g transform={`translate(200,358) translate(0,${disp.headY})`}>
            {Array.from({ length: 10 }, (_, i) => {
              const a = (loadRot + i * 36) * Math.PI / 180;
              const r = 20;
              const sz = 2.5 + (i / 9) * 3;
              return (
                <circle
                  key={i}
                  cx={Math.cos(a) * r}
                  cy={Math.sin(a) * r}
                  r={sz}
                  fill="#E03020"
                  opacity={(i + 1) / 10 * 0.9}
                />
              );
            })}
          </g>
        )}

      </svg>

      {/* State label */}
      <p style={{
        marginTop: 2,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#B02A1A",
        fontFamily: "monospace",
        opacity: 0.55,
      }}>
        {state}
      </p>

      {/* Buttons */}
      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 20,
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "0 20px",
      }}>
        {STATES.map(s => (
          <button
            key={s}
            onClick={() => handleSetState(s)}
            style={{
              padding: "9px 22px",
              borderRadius: 999,
              border: `2px solid ${state === s ? "#E03020" : "#C4BAB4"}`,
              background: state === s ? "#E03020" : "transparent",
              color: state === s ? "#fff" : "#B02A1A",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              fontWeight: state === s ? "bold" : "normal",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
