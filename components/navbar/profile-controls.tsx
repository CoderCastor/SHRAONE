"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useGetCreditBalanceQuery } from "@/lib/services/apiSlice";
import { IconCardsFilled, IconLoader2, IconMoon } from "@tabler/icons-react";
import { cn, shadow1 } from "@/lib/utils";

export const ProfileControls = () => {
  const { data, isLoading } = useGetCreditBalanceQuery();

  console.log(data);

  return (
    <div className={cn("bg-black-500 mr-4 flex h-full  shrink-0 w-45  items-center justify-around rounded-3xl border border-zinc-200 bg-zinc-50/50 py-1.5",shadow1)}>
      <div className="flex size-7 items-center justify-center rounded-full border border-zinc-300/50">
     <IconMoon size={15} />
      </div>
      {isLoading ? (
        <div className="flex h-7 w-16 animate-pulse items-center justify-center gap-1 rounded-xl border border-zinc-100/60 bg-zinc-200/30 px-3 py-1 text-sm"></div>
      ) : (
        <div className="flex h-7 w-16 items-center justify-center gap-1 rounded-xl border border-zinc-200/60 px-3 py-1 text-sm bg-yellow-300/10">
          <div className="flex h-4 w-4 items-center justify-center">
            {data?.data.credit == 0 ? <p className="text-[12px] text-red-600 font-bold">{data?.data.credit}</p> : <p className="text-[12px] font-bold text-yellow-600">{data?.data.credit}</p>}
          </div>
          <IconCardsFilled size={16} color="#ffba24" />
        </div>
      )}
      <motion.div className="relative size-6 overflow-hidden rounded-full bg-purple-300">
        <Image
          src={
            "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no"
          }
          fill={true}
          alt="image-thumbnail"
        />
      </motion.div>
    </div>
  );
};
