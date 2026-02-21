"use client";
import { ViewLayout } from "@/components/layout/view";
import { GridCardBox } from "../../common/card-grid/grid-card-box";
import { GridCard, GridCardProps } from "../../common/card-grid/grid-card";
import { useGetUsersMonologuesQuery } from "@/lib/services/apiSlice";
import { useState } from "react";
import { PodcastType } from "@/types/monologue";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CommentBox } from "../common/comment-box";
import { EpisodesList } from "../common/episodes-list";
import { FullScreenCard } from "../common/fullscreen-card";

export const UsersMonologues = () => {
  const { data, isLoading, isError, error } = useGetUsersMonologuesQuery();
  const [fullScreen, setFullScreen] = useState<null | PodcastType>(null);
  const [fixZindexCardId, setFixZindexCardId] = useState<string | null>(null);
  return (
    <ViewLayout header={"Your Monologues"} showLayoutHeader={!fullScreen}>
      <GridCardBox>
        {data?.data.map((item, idx) => (
          <GridCard
            creater={item.user.name}
            isLiked={item.isLiked}
            like_count={item.likeCount ? item.likeCount : 0}
            played_count={item.playedCount ? item.playedCount : 0}
            tags={"Science"}
            title={item.title}
            key={idx}
            post_by={item.post_by}
            creater_profile={item.user.image}
            thumbnail_image_url={item.thumbnailUrl}
            setFullScreen={setFullScreen}
            item={item}
            fullScreen={fullScreen}
            fixZindexCardId={fixZindexCardId}
            setFixZindexCardId={setFixZindexCardId}
          />
        ))}
      </GridCardBox>

      {fullScreen && (
        <motion.div
          style={{
            zIndex:
              fixZindexCardId && fixZindexCardId === fullScreen.id ? 50 : 0,
          }}
          layoutId={`card-${fullScreen.id}`}
          className={cn(
            "absolute inset-0 z-10 flex h-full flex-1 items-start gap-2 bg-gray-100 px-2",
          )}
        >
          <FullScreenCard
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
          <div className="flex h-full min-h-0 flex-5 flex-col gap-4 pt-3 pr-2 pl-4">
            <EpisodesList fullScreen={fullScreen} />
            <CommentBox monologueId={fullScreen.id} />
          </div>
        </motion.div>
      )}
    </ViewLayout>
  );
};
