"use client";

import { useScrollRef } from "@/app/(routes)/ScrollContext";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import TabBar from "./TabBar";
import InfoBar from "./InfoBar";

function MainBar() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const scrollRef = useScrollRef();

  const { scrollY } = useScroll({
    container: scrollRef || undefined,
  });

  // Reset ONLY when pathname changes (route navigation)
  useEffect(() => {
    setHidden(false);
  }, [pathname]); // Only pathname, not scrollRef

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous !== undefined) {
      if (latest > previous && latest > 50) {
        setHidden(true);
      } else if (latest < previous) {
        setHidden(false);
      }
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 200, opacity: 0 },
      }}
      initial="visible"
      animate={hidden ? { y: 18, height: 40, width: 250 } : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut",delay:0.3 }}
      className="fixed right-0 bottom-7 left-0 z-10 mx-auto flex h-18 w-10/12 overflow-hidden rounded-2xl px-2 "
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <TabBar hidden={hidden} />
        <InfoBar hidden={hidden} />
      </div>
    </motion.div>
  );
}

export default MainBar;
