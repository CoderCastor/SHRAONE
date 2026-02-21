import { cn } from "@/lib/utils";
import { IconCircuitBattery } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Bars } from "react-loader-spinner";
export const EpisodeStackUL = ({
  generating,
  children,
  handleGenerateNextEpisode
}: {
  generating: boolean;
  children: React.ReactNode;
  handleGenerateNextEpisode : () => void
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delay: 0.1,
      },
    },
  };

  return (
    <div className="flex-1">
      <div className={cn("flex h-[200px] min-h-0 flex-1 flex-col rounded-2xl")}>
        <div className="items-between mb-2.5 flex gap-2">
          <h3 className="w-full text-[15px] font-bold text-red-800">
            Episodes
          </h3>
          <div className="flex justify-end">
            <button
              onClick={handleGenerateNextEpisode}
              className="text-purple-white/10 flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-1.5 text-[10px] text-nowrap text-purple-950 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] text-shadow-sm"
            >
              Generate Next
              {generating ? (
                <Bars
                  height="12"
                  width="12"
                  color="#3e0057"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <IconCircuitBattery stroke={2} size={15} />
              )}
            </button>
          </div>
        </div>

        <ul
          // variants={container}
          // initial="hidden"
          // animate="show"
          className="flex min-h-0 flex-1 flex-col overflow-scroll rounded-xl border bg-zinc-50 mask-y-from-90% px-1 py-2"
        >
          {children}
        </ul>
      </div>
    </div>
  );
};
