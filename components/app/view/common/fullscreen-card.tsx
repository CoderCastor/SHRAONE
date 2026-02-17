import { cn } from "@/lib/utils";
import { PodcastType } from "@/types/monologue";
import {
  IconBrandGooglePodcasts,
  IconHeartFilled,
  IconPlayerPlayFilled,
  IconShare,
  IconX,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const FullScreenCard = ({
  fullScreen,
  setFullScreen,
}: {
  fullScreen: null | PodcastType;
  setFullScreen: Dispatch<SetStateAction<null | PodcastType>>;
}) => {
  return (
    <>
      {fullScreen && (
        <div className="flex flex-4 flex-col items-center justify-center pt-2">
          <div
            onClick={() => setFullScreen(null)}
            className="mb-2 flex size-8 items-center justify-center self-start  rounded-full bg-red-400"
          >
            <IconX color="white" size={14} />
          </div>
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
              <div className="relative flex size-5 items-center justify-center overflow-hidden rounded-full">
                <Image src={fullScreen.user.image} fill alt="usre-image" />
              </div>
              <h2 className="text-[12px]">{fullScreen.user.name}</h2>
            </div>
            <h2 className="text-[12px] text-zinc-500">
              {fullScreen.categories}
            </h2>

            <div className="flex items-center gap-3">
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
                  <IconHeartFilled stroke={2} size={20} color="red" />
                ) : (
                  <IconHeartFilled stroke={2} size={20} />
                )}
              </button>
            </div>

            <div className="mt-2 flex justify-start gap-5 text-[12px] text-zinc-600/80">
              <div className="flex items-center gap-1 text-violet-900">
                <IconBrandGooglePodcasts size={12} /> <p>{1234}</p>
              </div>
              <div className={cn("flex items-center gap-1", "text-red-600")}>
                <IconHeartFilled size={12} /> <p>{1234}</p>
              </div>
              <p className="text-violet-900">
                {fullScreen.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
