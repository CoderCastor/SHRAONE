import { Dot, Play } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface InfoBarProps {
  hidden: boolean;
}

function InfoBar({ hidden }: InfoBarProps) {
  return (
    <motion.div
      initial={{ display: "none", opacity: 0,width:100 }}
      animate={hidden ? { display: "flex", opacity: 1, width: 300 } : {}}
      transition={{ duration: 0.2, delay: 0.2 }}
      
      className="absolute z-20 flex h-full items-center justify-center rounded-2xl bg-black pl-3 pr-19 text-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
    >
      <div className="rounded-xl border border-purple-900 p-[0.2px]">
        <Image
          height={20}
          width={20}
          className="rounded-xl"
          alt="profile"
          src={
            "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no"
          }
        />
      </div>
      <motion.div initial={{display:"none"}} animate={{display:"flex"}} transition={{delay:0.2}} className="flex flex-1 flex-col justify-center px-3">
        <h2 className="text-neutral-200 text-nowrap text-sm">Gym Motivation</h2>
        <p className="-mt-1 -ml-1 flex items-center justify-start text-[8px] text-neutral-400">
          {" "}
          <span className="scale-200 animate-pulse flex justify-center items-center">
            <Dot color="purple" size={12} />
          </span>
          codercastor
        </p>
      </motion.div>
      <span className="bg-red-500 rounded-full p-1 flex justify-center items-center">
        <Play size={18} />
      </span>
    </motion.div>
  );
}

export default InfoBar;
