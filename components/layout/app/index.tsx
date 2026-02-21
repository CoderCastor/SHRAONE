"use client";
import App from "@/components/animation-character";
import BotCharacter from "@/components/animation-character";
import { AudioPlayer } from "@/components/app/audio-player";
import { DisplayCard } from "@/components/app/display-card";
import { MainMenuStack } from "@/components/app/main-menu-stack";
import { OptionBar } from "@/components/app/option-bar";
import { QuickPlayCard } from "@/components/app/quick-play";
import { AnimatePresence, motion } from "motion/react";
export const MainAppScreenLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-zinc-100">
      <div className="mx-auto flex h-screen max-w-5xl flex-col">
        <div className="h-20 w-full"></div>
        <div className="flex min-h-0 flex-1 flex-col">
          {/* <OptionBar>this is Option Bar</OptionBar> */}
          <div className="flex min-h-0 flex-1">
            <div className="flex min-w-30 flex-col gap-2 py-2 lg:w-1/3">
              <MainMenuStack />
              <QuickPlayCard />
            </div>

            <motion.div className="flex min-h-0 flex-1 flex-col">
              {children}
              <AnimatePresence initial={false}>
                <AudioPlayer />
              </AnimatePresence>
            </motion.div>
          </div>
          <OptionBar classname="mb-2 text-[10px] text-zinc-600">
            <p>Designed and Develop by codercastor</p>
          </OptionBar>
        </div>
      </div>
      {/* <App /> */}
    </section>
  );
};
