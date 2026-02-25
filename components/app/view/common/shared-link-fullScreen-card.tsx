import {
  useGetFullScreenCardDataQuery,
  useUpdateMonologueDislikeMutation,
  useUpdateMonologueLikeMutation,
} from "@/lib/services/apiSlice";
import { cn } from "@/lib/utils";
import { PodcastType } from "@/types/monologue";
import {
  IconBrandGooglePodcasts,
  IconHeart,
  IconHeartFilled,
  IconPlayerPlayFilled,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const FullScreenCard = ({
  fullScreen,
  isCloseButtonVisible = true,
}: {
  fullScreen: PodcastType;
  isCloseButtonVisible?: boolean;
}) => {
  
  const [likeMonologue, {}] = useUpdateMonologueLikeMutation();
  const [dislikeMonologue, {}] = useUpdateMonologueDislikeMutation();

  return (
    <>
      {fullScreen && (
        <AnimatePresence>
          <div className="flex flex-4 flex-col items-center justify-center pt-2">
            <motion.div
              layoutId={`card-image-${fullScreen.id}`}
              className="relative ml-3 h-65 w-65 self-start overflow-hidden rounded-xl"
            >
              <Image src={fullScreen.thumbnailUrl} fill alt="thumbnail" />
            </motion.div>

            <div className="mt-2 flex w-full flex-1 flex-col gap-y-2 px-4">
              <motion.h2
                layoutId={`card-title-${fullScreen.id}`}
                className="text-[15px] font-bold text-zinc-900"
              >
                {fullScreen.title}
              </motion.h2>
              <div className="flex items-center gap-2">
                <motion.div
                  layoutId={`user-image-${fullScreen.id}`}
                  className="relative flex size-5 items-center justify-center overflow-hidden rounded-full"
                >
                  <Image src={fullScreen.user.image} fill alt="usre-image" />
                </motion.div>
                <h2 className="text-[12px] text-zinc-800">
                  {fullScreen.user.name}
                </h2>
              </div>
              <motion.p
                layoutId={`user-name-${fullScreen.id}`}
                className="text-[12px] text-zinc-500"
              >
                {fullScreen.categories}
              </motion.p>

              <motion.div
                layoutId={`control-buttons-${fullScreen.id}`}
                className="flex items-center gap-3"
                exit={{
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.3 }}
              >
                <button className="flex items-center justify-center gap-1 rounded-2xl bg-red-500 px-3 py-1.5 text-[8px] font-semibold text-white">
                  <IconPlayerPlayFilled stroke={2} size={8} />
                  Play
                </button>
                <button className="flex items-center justify-center gap-1 rounded-2xl border-[0.1px] border-purple-500 px-3 py-1.5 text-[8px] font-semibold text-purple-500">
                  <IconShare stroke={2} size={8} />
                  Share
                </button>
                <button className="flex items-center justify-center gap-1 rounded-2xl text-[5px] text-zinc-400">
                  {fullScreen.isLiked ? (
                    <IconHeartFilled
                      onClick={() => dislikeMonologue(fullScreen.id)}
                      stroke={2}
                      size={20}
                      color="red"
                    />
                  ) : (
                    <IconHeartFilled
                      onClick={() => likeMonologue(fullScreen.id)}
                      stroke={2}
                      size={20}
                    />
                  )}
                </button>
              </motion.div>

              <motion.div
                layoutId={`stats-buttons-${fullScreen.id}`}
                className="mt-2 flex justify-start gap-5 text-[12px] text-zinc-600/80"
              >
                <div className="flex items-center gap-1 text-violet-900">
                  <IconBrandGooglePodcasts size={12} /> <p>{0}</p>
                </div>
                <div className={cn("flex items-center gap-1", "text-red-600")}>
                  <IconHeart size={12} /> <p>{fullScreen.likeCount}</p>
                </div>
                <p className="text-violet-900">
                  {fullScreen.createdAt.split("T")[0]}
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};
