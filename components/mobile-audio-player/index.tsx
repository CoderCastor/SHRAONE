import { motion } from "motion/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface MobileAudioPlayerProps {
  isPlayerVisible: boolean;
  setIsPlayerVisible: Dispatch<SetStateAction<boolean>>;
}

export function MobileAudioPlayer({
  isPlayerVisible,
  setIsPlayerVisible,
}: MobileAudioPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      className="flex h-full w-full items-center bg-black px-2"
    >
      {/* Image */}
      <div className="ml-1 flex h-full w-12 items-center justify-center">
        <motion.div className="relative size-10 overflow-hidden rounded-full bg-purple-300">
          <Image
            src={
              "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no"
            }
            fill={true}
            alt="image-thumbnail"
          />
        </motion.div>
      </div>

      {/* Main div 2 */}
      <div className="flex-1">
        {/* Flex 1 - audio info */}
        <div className="w-full px-3">
          <p className="text-[10px]">Power of meditation</p>
        </div>

        {/* flex 2 - audio controls */}
        <motion.div className="flex flex-1 items-center justify-around px-1">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-rewind-backward-15"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 20h2a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-2v-3h3" />
              <path d="M15 18a6 6 0 1 0 0 -12h-11" />
              <path d="M5 14v6" />
              <path d="M7 9l-3 -3l3 -3" />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
              <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-rewind-forward-15"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 9l3 -3l-3 -3" />
              <path d="M9 18a6 6 0 1 1 0 -12h11" />
              <path d="M16 20h2a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-2v-3h3" />
              <path d="M13 14v6" />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-clock-play"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 7v5l2 2" />
              <path d="M17 22l5 -3l-5 -3z" />
              <path d="M13.017 20.943a9 9 0 1 1 7.831 -7.292" />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-repeat-off"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3" />
              <path d="M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3" />
              <path d="M3 3l18 18" />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-share-3"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" />
            </svg>
          </div>
        </motion.div>

        {/* flex 2 (seekbar time volume) */}
        <div className="flex items-center justify-around gap-1 px-2">
          <div className="h-[5px] w-4/6 rounded-2xl bg-white"></div>
          {/* Time Duration */}
          <div>
            <p className="text-xs">2:30</p>
          </div>
          {/* volume */}
          <ControlButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 8a3 3 0 0 1 0 6" />
              <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
              <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
            </svg>
          </ControlButton>
        </div>
      </div>

      {/* Main Div 3 */}
      <div className="flex w-12 items-center justify-center px-1">
        <button
          onClick={() => setIsPlayerVisible(false)}
          className="rounded-full bg-white p-1.5 text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-table-share"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8" />
            <path d="M3 10h18" />
            <path d="M10 3v18" />
            <path d="M16 22l5 -5" />
            <path d="M21 21.5v-4.5h-4.5" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function ControlButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="rounded-2xl p-1" onClick={onClick}>
      {children}
    </button>
  );
}
