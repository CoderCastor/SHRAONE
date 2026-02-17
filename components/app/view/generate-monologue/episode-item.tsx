import { motion } from "motion/react";
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
    <li
      
      className="flex items-center justify-start gap-2 rounded-2xl px-2 py-2 text-[12px] hover:bg-zinc-100"
      
    >
      <div className="flex size-6 items-center justify-center rounded-full bg-red-300 text-red-800">
        {number}
      </div>
      <p className="text-red-900">{title}</p>
    </li>
  );
};
