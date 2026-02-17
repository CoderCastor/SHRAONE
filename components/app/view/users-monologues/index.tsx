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
  const [fullScreen, setFullScreen] = useState<null | PodcastType>({
    id: "cmlgfmbr90001s6zjvgawt921",
    title: "Does god exist or not ?",
    createdBy: "cmhlock430000s6ja0swu0ltx",
    playedCount: null,
    likeCount: null,
    commentCount: null,
    categories: "Science",
    visibility: "PRIVATE",
    thumbnailUrl:
      "https://dxq8l7kg5zaxh.cloudfront.net/images/2449cf32-4ccc-424f-adb3-54394408d897.png",
    createdAt: "2026-02-10T10:02:13.851Z",
    user: {
      name: "CoderCastor",
      image: "https://avatars.githubusercontent.com/u/103727502?v=4",
      id: "cmhlock430000s6ja0swu0ltx",
    },
    episodes: [
      {
        id: "cmlgfmbr90002s6zj9vfx6j09",
        title: "The Silent Question",
        number: 1,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/ca1f25b8-94ee-4958-9a32-de932e69605c.mp3",
      },
      {
        id: "cmlgfn0zx0004s6zj12rvop2z",
        title: "Echoes in the Quiet",
        number: 2,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/e808c509-1b5d-4bd8-a2bc-c825cd531dba.mp3",
      },
      {
        id: "cmlgfo1to0006s6zj2l49lmng",
        title: "The Desert Whisper: Listening to Silence",
        number: 3,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/65dc3902-d06a-46ab-b0ac-590d3735ca9f.mp3",
      },
      {
        id: "cmlgfoacf0008s6zj57g79mhq",
        title: "Echoes in a Cup",
        number: 4,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/f0ac7c09-0050-4438-af7d-7d501266bc1a.mp3",
      },
      {
        id: "cmlgfoiqs000as6zjhfvtckzk",
        title: "The Garden's Whisper",
        number: 5,
        audioUrl:
          "https://dxq8l7kg5zaxh.cloudfront.net/audio/1cf3971d-0b44-49df-ad01-85fe756cd969.mp3",
      },
    ],
    isLiked: false,
  });

  console.log();
  const gridCards: GridCardProps[] = [
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
      title: "Epic Mountain Adventure",
      creater: "Alex Chen",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["travel", "nature", "adventure"],
      isLiked: true,
      played_count: 15420,
      like_count: 2341,
      post_by: "2024-11-15",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Code Review Best Practices",
      creater: "Sarah Johnson",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["coding", "tutorial", "javascript"],
      isLiked: false,
      played_count: 8934,
      like_count: 1567,
      post_by: "2024-12-03",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      title: "Jazz Night Live Session",
      creater: "Marcus Williams",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["music", "jazz", "live"],
      isLiked: true,
      played_count: 45678,
      like_count: 8923,
      post_by: "2025-01-05",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
      title: "Healthy Meal Prep Ideas",
      creater: "Emma Rodriguez",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["cooking", "health", "lifestyle"],
      isLiked: false,
      played_count: 23456,
      like_count: 4521,
      post_by: "2025-01-08",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1579547621869-0ddb5f237392",
      title: "Climate Change Documentary",
      creater: "David Kim",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["documentary", "environment", "education"],
      isLiked: true,
      played_count: 67890,
      like_count: 12340,
      post_by: "2024-10-22",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      title: "Morning Yoga Routine",
      creater: "Priya Sharma",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["fitness", "yoga", "wellness"],
      isLiked: false,
      played_count: 34567,
      like_count: 5678,
      post_by: "2025-01-10",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      title: "Blockchain Explained Simply",
      creater: "Ryan Thompson",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["blockchain", "crypto", "tech"],
      isLiked: true,
      played_count: 19283,
      like_count: 3456,
      post_by: "2024-12-28",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783",
      title: "Abstract Art Tutorial",
      creater: "Luna Martinez",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["art", "tutorial", "creative"],
      isLiked: false,
      played_count: 12890,
      like_count: 2109,
      post_by: "2025-01-02",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
      title: "Machine Learning Fundamentals",
      creater: "James Patterson",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["AI", "machine-learning", "python"],
      isLiked: true,
      played_count: 28901,
      like_count: 6234,
      post_by: "2024-11-30",
    },
    {
      thumbnail_image_url:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      title: "Tokyo Street Photography",
      creater: "Yuki Tanaka",
      creater_profile:
        "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no",
      tags: ["photography", "travel", "japan"],
      isLiked: false,
      played_count: 41234,
      like_count: 7890,
      post_by: "2024-12-18",
    },
  ];

  return (
    <ViewLayout header={"Your Monologues"} showLayoutHeader={!fullScreen}>
      {!fullScreen && (
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
            />
          ))}
        </GridCardBox>
      )}
      {fullScreen && (
        <motion.div
          layoutId={`card-${fullScreen.id}`}
          className={cn(
            "relative z-10 flex h-full flex-1 items-start bg-gray-100 px-2 gap-2",
          )}
        >
           <FullScreenCard
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
          <div className="flex h-full min-h-0 flex-5 flex-col pt-3 pr-2 pl-4">
            <EpisodesList fullScreen={fullScreen} />
            <CommentBox />
          </div>
         
        </motion.div>
      )}
    </ViewLayout>
  );
};
