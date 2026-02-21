import { cn } from "@/lib/utils";
import { PodcastType } from "@/types/monologue";
import {motion} from "motion/react"
export const EpisodesList = ({fullScreen}:{fullScreen : null | PodcastType}) => {

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
    
      const listItem = {
        hidden: { y: -10, opacity: 0 },
        show: { y: 0, opacity: 1 },
      };

    return  <div className={cn("flex h-[200px] min-h-0 flex-col rounded-2xl")}>
              <div className="mb-2.5 flex items-center gap-2">
                <h3 className="w-full text-[15px] font-bold text-red-800">
                  Episodes
                </h3>
              </div>

              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="flex min-h-0 flex-1 flex-col overflow-scroll rounded-xl border bg-zinc-50 mask-y-from-90% px-1 py-2"
              >
                {fullScreen && fullScreen.episodes.map((item, idx) => (
                  <motion.li
                    variants={listItem}
                    className="flex items-center justify-start gap-2 rounded-2xl px-2 py-2 text-[12px] hover:bg-zinc-100"
                    key={idx}
                  >
                    <div className="flex shrink-0  size-6 items-center justify-center rounded-full bg-red-300 text-red-800">
                      {item.number}
                    </div>
                    <p className="text-red-900 text-[10px]">{item.title}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
}