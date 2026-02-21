"use client";
import { cn, shadow1, shadow2 } from "@/lib/utils";
import Image from "next/image";
import {
  IconSubtitlesAi,
  IconStretching2,
  IconGitMerge,
  IconHeart,
  IconFlame,
} from "@tabler/icons-react";
import Link from "next/link";
import { MenuItem } from "./menu-item";
import { useState } from "react";
export const MainMenuStack = () => {
  const [activeTab, setActiveTab] = useState<
    "generate" | "your_own" | "recommended" | "liked" | "trending"
  >("trending");

  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-zinc-50 px-3 py-3 text-zinc-700",
        shadow1,
      )}
    >
      <p className="mb-2 px-2 text-xl font-semibold text-red-800">Menu</p>

      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2",
          shadow2,
        )}
      >
        <MenuItem
          title="Generate your own"
          isActive={activeTab == "generate" ? true : false}
          setActiveTab={setActiveTab}
          to={"/app/generate"}
          name="generate"
        >
          <IconSubtitlesAi stroke={2} size={15} />
        </MenuItem>
        <MenuItem
          title="Top Trending"
          isActive={activeTab == "trending" ? true : false}
          setActiveTab={setActiveTab}
          alert={true}
          to={"/app/trending"}
          name="trending"
        >
          <IconFlame stroke={2} size={15} />
        </MenuItem>
        <MenuItem
          title="Recommended"
          isActive={activeTab == "recommended" ? true : false}
          setActiveTab={setActiveTab}
          alert={true}
          to={"/app/recommended"}
          name="recommended"
        >
          <IconGitMerge stroke={2} size={15} />
        </MenuItem>
        <MenuItem
          title="Your Monologues"
          isActive={activeTab == "your_own" ? true : false}
          setActiveTab={setActiveTab}
          to={"/app/monologues"}
          name="your_own"
        >
          <IconStretching2 stroke={2} size={15} />
        </MenuItem>
        <MenuItem
          title="Liked Monologue"
          isActive={activeTab == "liked" ? true : false}
          setActiveTab={setActiveTab}
          to={"/app/liked"}
          name="liked"
        >
          <IconHeart stroke={2} size={15} />
        </MenuItem>
      </div>
    </div>
  );
};
