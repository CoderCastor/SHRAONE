import { motion } from "motion/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TabBarProps {
  hidden: boolean;
}

function TabBar({ hidden }: TabBarProps) {
  const [tab, setTab] = useState<string>("add");
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
      setTab("add");
    } else if (pathname === "/settings" || pathname.startsWith("/settings/")) {
      setTab("settings");
    } else if (pathname === "/exe" || pathname.startsWith("/exe/")) {
      setTab("exe");
    }
  }, [pathname]);

  return (
    <motion.div
      animate={hidden ? { opacity: 0, display: "none" } : {}}
      transition={{ delay: 0.3 }}
      className="absolute flex h-full w-full items-center justify-center gap-5"
    >
      <motion.div
        initial={{}}
        animate={isPlayerVisible ? { display: "none" } : {}}
        className="flex h-full w-full items-center justify-center gap-5"
      >
        <motion.div
          // animate={hidden ? { opacity: 0 } : {}}
          // transition={{ duration: 0.3, delay: 0.4 }}
          className="px z-40 flex h-full flex-1 items-center justify-around rounded-2xl border border-[#1C1C1E]/20 bg-black backdrop-blur-xs"
        >
          <motion.button
            onClick={() => {
              setTab("add");
              router.push("/dashboard");
            }}
            className={`rounded-2xl ${tab === "add" && "bg-zinc-200"} p-4 transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => {
              setTab("settings");
              router.push("/settings");
            }}
            className={`rounded-2xl ${tab === "settings" && "bg-zinc-200"} p-4 transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5 text-black"
            >
              <path
                fillRule="evenodd"
                d="M15 4.5A3.5 3.5 0 0 1 11.435 8c-.99-.019-2.093.132-2.7.913l-4.13 5.31a2.015 2.015 0 1 1-2.827-2.828l5.309-4.13c.78-.607.932-1.71.914-2.7L8 4.5a3.5 3.5 0 0 1 4.477-3.362c.325.094.39.497.15.736L10.6 3.902a.48.48 0 0 0-.033.653c.271.314.565.608.879.879a.48.48 0 0 0 .653-.033l2.027-2.027c.239-.24.642-.175.736.15.09.31.138.637.138.976ZM3.75 13a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                clipRule="evenodd"
              />
              <path d="M11.5 9.5c.313 0 .62-.029.917-.084l1.962 1.962a2.121 2.121 0 0 1-3 3l-2.81-2.81 1.35-1.734c.05-.064.158-.158.426-.233.278-.078.639-.11 1.062-.102l.093.001ZM5 4l1.446 1.445a2.256 2.256 0 0 1-.047.21c-.075.268-.169.377-.233.427l-.61.474L4 5H2.655a.25.25 0 0 1-.224-.139l-1.35-2.7a.25.25 0 0 1 .047-.289l.745-.745a.25.25 0 0 1 .289-.047l2.7 1.35A.25.25 0 0 1 5 2.654V4Z" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => {
              setTab("exe");
              router.push("/exe");
            }}
            className={`rounded-2xl ${tab === "exe" && "bg-zinc-200"} p-4 transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 text-black"
            >
              <path
                fillRule="evenodd"
                d="M11 3.5v2.257c0 .597.237 1.17.659 1.591l2.733 2.733c.39.39.608.918.608 1.469a2.04 2.04 0 0 1-1.702 2.024C11.573 13.854 9.803 14 8 14s-3.573-.146-5.298-.426A2.04 2.04 0 0 1 1 11.55c0-.551.219-1.08.608-1.47l2.733-2.732A2.25 2.25 0 0 0 5 5.758V3.5h-.25a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5H11ZM6.5 5.757V3.5h3v2.257a3.75 3.75 0 0 0 1.098 2.652l.158.158a3.36 3.36 0 0 0-.075.034c-.424.2-.916.194-1.335-.016l-1.19-.595a4.943 4.943 0 0 0-2.07-.52A3.75 3.75 0 0 0 6.5 5.757Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </motion.div>

        <motion.button
          onClick={() => setIsPlayerVisible(true)}
          // animate={hidden ? { x: -100, opacity: 0 } : {}}
          // transition={{ duration: 0.3 }}
          className="flex size-16 items-center justify-center rounded-full bg-black shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),10px_10px_30px_4px_rgba(45,78,255,0.15)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-14 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Stripe 2 */}
      <motion.div
        initial={{ display: "none" }}
        animate={isPlayerVisible ? { display: "flex" } : {}}
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

export default TabBar;
