"use client";

import { CommentBox } from "@/components/app/view/common/comment-box";
import { EpisodesList } from "@/components/app/view/common/shared-episodes-list";

import { FullScreenCard } from "@/components/app/view/common/shared-link-fullScreen-card";

import { ViewLayout } from "@/components/layout/view";
import { useGetFullScreenCardDataQuery } from "@/lib/services/apiSlice";
import { cn } from "@/lib/utils";
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
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  const link = searchParams?.get("link");
  const [fullScreen, setFullScreen] = useState({
    categories: "Science",
    commentCount: null,
    createdAt: "2026-02-04T14:38:12.154Z",
    createdBy: "cmhlodkca0005s6jalbjoei17",
    episodes: [
      {
        id: "cml84u46z0002s69nmzk77f81",
        title: "The Hidden Ledger",
        number: 1,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/2025cb22-8bb2-4b1b-8150-4774eb4c6fde.mp3",
      },
      {
        id: "cml851jj30004s69n715tygfr",
        title: "Echoes in the Data",
        number: 2,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/2db981d0-1939-4766-8be3-490f235d0a2d.mp3",
      },
    ],
    id: "cml84u46z0001s69n2aph2k24",
    isLiked: false,
    likeCount: 0,
    likedMonologues: [],
    playedCount: null,
    thumbnailUrl:
      "https://dxq8l7kg5zaxh.cloudfront.net/images/607b5547-3463-4b5d-bbef-fbbf48a63233.png",
    title: "ESTIM Files of Jeffery",
    user: {
      name: "shraonecloud",
      image: "https://avatars.githubusercontent.com/u/242138080?v=4",
      id: "cmhlodkca0005s6jalbjoei17",
    },
    visibility: "PRIVATE",
  });


  const { data, isLoading } = useGetFullScreenCardDataQuery(
    link?.split("-")[link.split("-").length-1] as string,
  );
console.log(data)
  return (
    <ViewLayout header="Shared Monologue">
      {isLoading ? <div>Loading</div> : <motion.div
        className={cn("flex flex-1 items-start gap-2 bg-gray-100 px-2")}
      >
        <FullScreenCard isCloseButtonVisible={false} fullScreen={data?.data} />
        <div className="flex h-full min-h-0 flex-5 flex-col gap-4 pt-3 pr-2 pl-4">
          <EpisodesList fullScreen={data?.data} />
          <CommentBox monologueId={data?.data.id as string} />
        </div>
      </motion.div>}
    </ViewLayout>
  );
}
