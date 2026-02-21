import { AnimatePresence, motion } from "motion/react";
export const EpisodeItem = ({
  number,
  title,
}: {
  number: number;
  title: string;
}) => {
  const listItem = {
    hidden: { y: -10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <AnimatePresence>
      <motion.li
        initial={{
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -10,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex  items-center justify-start gap-2 rounded-2xl px-2 py-2 text-[12px] hover:bg-zinc-100"
      >
        <div className="flex shrink-0 size-6 items-center justify-center rounded-full bg-red-300 text-red-800">
          {number}
        </div>
        <p className="text-red-900 text-[10px] leading-3">{title}</p>
      </motion.li>
    </AnimatePresence>
  );
};
