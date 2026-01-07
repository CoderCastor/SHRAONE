import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MobileAudioPlayer } from "../mobile-audio-player";
import { MobileTabBar } from "../mobile-tab-bar";

interface TabBarProps {
  hidden: boolean;
}

function AppBar({ hidden }: TabBarProps) {
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(false);

  return (
    <motion.div
      animate={hidden ? { opacity: 0, display: "none" } : {}}
      transition={{ delay: 0.3 }}
      className="absolute flex h-full w-full items-center justify-center gap-5"
    >
      <div className="relative h-full w-full">
        <AnimatePresence>
          {/* Stripe 1 */}
          {!isPlayerVisible && (
            <MobileTabBar
              isPlayerVisible={isPlayerVisible}
              setIsPlayerVisible={setIsPlayerVisible}
            />
          )}

          {/* Stripe 2 */}
          {isPlayerVisible && (
            <MobileAudioPlayer
              isPlayerVisible={isPlayerVisible}
              setIsPlayerVisible={setIsPlayerVisible}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default AppBar;
