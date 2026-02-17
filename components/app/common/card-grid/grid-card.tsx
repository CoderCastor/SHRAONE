import { cn, shadow2 } from "@/lib/utils";
import {
  IconBrandGooglePodcasts,
  IconHeart,
  IconHeartFilled,
  IconListDetails,
  IconPlayerPlayFilled,
  IconShare,
} from "@tabler/icons-react";
import Image from "next/image";
import thumb from "@/public/thumbnail.png";
import { ActionDispatch, Dispatch } from "react";
import { PodcastType } from "@/types/monologue";
import {motion} from "motion/react"
export interface GridCardProps {
  thumbnail_image_url?: string;
  title: string;
  creater: string;
  creater_profile?: string;
  tags?: string[];
  isLiked: boolean;
  played_count: number;
  like_count: number;
  post_by: string;
  setFullScreen : Dispatch<React.SetStateAction<null | PodcastType>>
  item : PodcastType
}

export const GridCard = ({
  thumbnail_image_url,
  title,
  creater,
  creater_profile,
  tags,
  isLiked,
  played_count,
  like_count,
  post_by,
  setFullScreen,
  item
}: GridCardProps) => {
  return (
    <motion.div layoutId={`card-${item.id}`} className="border-grey-400 relative grid min-h-[140px] grid-cols-8 overflow-hidden rounded-lg border bg-white p-2 inset-shadow-sm inset-shadow-red-500/10">
      <motion.div layoutId={`card-image-${item.id}`} className="relative col-span-3 hidden items-center justify-center overflow-hidden rounded-lg md:flex">
       <Image
          quality={40}
          src={thumbnail_image_url == "PENDING" ? "" : thumbnail_image_url}
          alt="monologue-image"
          fill
        />
      </motion.div>
      <div className="col-span-8 flex flex-col gap-2 pt-1 pl-2 md:col-span-5">
        <motion.h3 layoutId={`card-title-${item.id}`} className="truncate overflow-hidden text-sm tracking-tight text-zinc-600">
          {title}
        </motion.h3>
        <div className="flex gap-2">
          <div className="relative hidden h-4 w-4 overflow-hidden rounded-full md:block">
            <Image
              src={creater_profile as string}
              fill={true}
              alt="image-thumbnail"
            />
          </div>
          <p className="text-500-300 truncate overflow-hidden text-[10px] tracking-tight text-zinc-700">
            {creater}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-1 rounded-2xl bg-red-500 px-2 py-1 text-[8px] font-semibold text-white">
            <IconPlayerPlayFilled stroke={2} size={10} />
            Play
          </button>
          <button className="flex items-center justify-center gap-1 rounded-2xl border-[0.1px] border-purple-500 px-2 py-1 text-[8px] font-semibold text-purple-500">
            <IconShare stroke={2} size={10} />
            Share
          </button>
          <button className="flex items-center justify-center gap-1 rounded-2xl text-[8px] text-zinc-400">
            {isLiked ? (
              <IconHeartFilled stroke={2} size={18} color="red" />
            ) : (
              <IconHeartFilled stroke={2} size={18} />
            )}
          </button>
          <button onClick={()=>setFullScreen(item)} className="flex items-center justify-center gap-1 rounded-full bg-zinc-300 px-2 py-1 text-[8px] text-white">
            <IconListDetails stroke={2} size={10} />
          </button>
        </div>

        <div
          className={cn(
            "bg-zinc-20 flex gap-2 rounded-2xl px-2 py-0.5 text-zinc-700",
            shadow2,
          )}
        >
          <p className="text-[8px]">Motivation</p>
          <p className="text-[8px]">Motivation</p>
          <p className="text-[8px]">Motivation</p>
        </div>
        <div className="flex justify-around text-[10px] text-zinc-600/80">
          <div className="flex items-center gap-1 text-violet-900">
            <IconBrandGooglePodcasts size={12} /> <p>{played_count}</p>
          </div>
          <div className={cn("flex items-center gap-1", "text-red-600")}>
            <IconHeartFilled size={12} /> <p>{like_count}</p>
          </div>
          <p className="text-violet-900">{item.createdAt.split("T")[0]}</p>
        </div>
      </div>

      {/* <Image
        quality={40}
        src={
          "https://dxq8l7kg5zaxh.cloudfront.net/images/05284a7c-69f5-499b-a368-aee6eabf3f85.png"
        }
        alt="monologue-image"
        fill
        className="opacity-20 blur-lg"
      /> */}
    </motion.div>
  );
};
