import { motion } from "motion/react";
import {
  IconBrandSketch,
  IconLoader2,
  IconSubtitlesAi,
  IconX,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
export const GenerateMonologueInputBox = ({
  setShowConfirmationPopup,
  input,
  setInput,
}: {
  setShowConfirmationPopup: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <motion.div className="page-1 relative z-20 flex max-w-4/6 flex-col items-start gap-1 rounded-xl p-2 shadow-xs ring-1 shadow-black/5 ring-black/5">
      <input
        type="text"
        placeholder="Share your idea here"
        className="w-full text-sm text-zinc-800 caret-red-400 outline-0"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />
      <div className="my-2 flex flex-wrap items-center gap-2">
        <button className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
          <p>Quantum Computing</p>
          <button className="flex size-3 items-center justify-center rounded-full hover:bg-zinc-300">
            <IconX size={7} />
          </button>
        </button>
        <button className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
          <p>Quantum Computing</p>
          <button className="flex size-3 items-center justify-center rounded-full hover:bg-zinc-300">
            <IconX size={7} />
          </button>
        </button>
        <button className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
          <p>Quantum Computing</p>
          <button className="flex size-3 items-center justify-center rounded-full hover:bg-zinc-300">
            <IconX size={7} />
          </button>
        </button>
        <button className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
          <p>Quantum Computing</p>
          <button className="flex size-3 items-center justify-center rounded-full hover:bg-zinc-300">
            <IconX size={7} />
          </button>
        </button>
      </div>
      <div className="flex w-full gap-3">
        <button
          onClick={setShowConfirmationPopup}
          className="flex flex-1 justify-center gap-2 rounded-lg bg-red-500 py-1.5 pr-2 pl-4 text-xs text-white shadow-[0px_0px_2px_1px_rgba(255,255,255,0.2)_inset] ring ring-white/20 text-shadow-sm text-shadow-white/10"
        >
          <p>Generate with ShraoneAI</p>
          <motion.div className="flex size-4 items-center justify-center">
            <IconSubtitlesAi className="ai-icon" stroke={2} size={15} />
            <IconLoader2
              className="loader animate-spin"
              style={{
                display: "none",
              }}
              stroke={2}
              size={13}
            />
          </motion.div>
        </button>
        <button className="flex flex-1 justify-center gap-2 rounded-lg bg-red-50 px-4 py-1.5 text-xs text-red-800 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10">
          Bring more thoughts
          <IconBrandSketch stroke={2} size={15} />
        </button>
      </div>
    </motion.div>
  );
};
