import { cn } from "@/lib/utils";
import { IconBrandGooglePodcasts, IconHeartFilled } from "@tabler/icons-react";
import { motion } from "motion/react";

export const ShimmerCard = () => {
  return (
    <motion.div className="border-grey-400 relative grid min-h-[140px] grid-cols-8 overflow-hidden rounded-lg border bg-white p-2 inset-shadow-sm inset-shadow-red-500/10">
      <motion.div className="relative col-span-3 hidden h-32 w-20 animate-pulse items-center justify-center overflow-hidden rounded-lg bg-zinc-100 md:flex md:w-28 lg:w-27"></motion.div>
      <div className="col-span-8 flex flex-col gap-2 pt-1 pl-2 md:col-span-5">
        <motion.div className="h-5.5 w-full animate-pulse bg-zinc-100"></motion.div>
        <div className="flex gap-2">
          <motion.div className="relative hidden h-4 w-4 animate-pulse rounded-full bg-zinc-100 md:block"></motion.div>
          <motion.p className="h-full w-full animate-pulse bg-zinc-100"></motion.p>
        </div>

        <motion.div className="flex gap-2">
          <button className="h-[21px] w-11.5 animate-pulse rounded-2xl bg-zinc-100"></button>
          <button className="h-[21px] w-[53px] animate-pulse rounded-2xl bg-zinc-100"></button>
          <button className="flex animate-pulse items-center justify-center gap-1 rounded-2xl text-[8px]">
            <IconHeartFilled stroke={2} size={18} color="#F9F9FA" />
          </button>
          <button className="h-[21px] w-[26px] animate-pulse rounded-2xl bg-zinc-100"></button>
        </motion.div>

        <div
          className={cn(
            "bg-zinc-20 flex h-4 w-full animate-pulse gap-2 rounded-2xl bg-zinc-100",
          )}
        ></div>
        <motion.div className="flex items-center justify-around">
          <div className="flex items-center gap-1">
            <IconBrandGooglePodcasts size={12} color="#eeeeee" />{" "}
            <p className="h-3.5 w-10 animate-pulse bg-zinc-100"></p>
          </div>

          <p className="h-3.5 w-10 animate-pulse bg-zinc-100"></p>

          <p className="h-3.5 w-10 animate-pulse bg-zinc-100"></p>
        </motion.div>
      </div>
    </motion.div>
  );
};
