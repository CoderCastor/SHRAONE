"use client";
import { AudioPlayer } from "@/components/app/audio-player";
import { DisplayCard } from "@/components/app/display-card";
import { MainMenuStack } from "@/components/app/main-menu-stack";
import { OptionBar } from "@/components/app/option-bar";
import { QuickPlayCard } from "@/components/app/quick-play";
import { cn, shadow1 } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [showAudioPlayer, setShowAudioPlayer] = useState<boolean>(true);
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="h-22 w-full"></div>
      <div className="flex min-h-0 flex-1 flex-col">
        <OptionBar>this is Option Bar</OptionBar>
        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-30 lg:w-1/3 flex-col gap-2 py-2">
            <MainMenuStack />
            <QuickPlayCard />
          </div>

          <motion.div className="flex flex-1 min-h-0 flex-col">
            <DisplayCard />
            <AnimatePresence initial={false}>
              {showAudioPlayer && <AudioPlayer />}
            </AnimatePresence>
          </motion.div>
        </div>
        <OptionBar classname="mb-2">
          <p>Designed and Develop by codercastor</p>
        </OptionBar>
      </div>
    </div>
  );
}



