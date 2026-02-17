import {
  IconCheck,
  IconEditCircle,
  IconLockFilled,
  IconPlayerPlayFilled,
  IconShare,
  IconTagFilled,
  IconTrash,
  IconWorldUpload,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { Grid } from "react-loader-spinner";
import { motion } from "motion/react";
import { GetMonologueResponse } from "@/types/monologue";
export const MonologueCard = ({
  monologueData,
  thumbnailURL,
}: {
  monologueData: GetMonologueResponse | undefined;
  thumbnailURL: string | null;
}) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 md:flex-row">
      {/* image */}
      <div className="relative h-37 w-30 overflow-hidden rounded-sm">
        {thumbnailURL ? (
          <Image src={thumbnailURL} alt="thumbnail-image" fill />
        ) : (
          <div className="flex h-full w-full animate-pulse items-center justify-center bg-zinc-200">
            <Grid
              visible={true}
              height="20"
              width="20"
              color="#bababa"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
          </div>
        )}
      </div>
      {/* info */}
      <div className="flex h-full w-full min-w-0 flex-1 flex-col justify-evenly py-7">
        <div className="flex w-full min-w-0 flex-col justify-center gap-3 overflow-hidden pr-0.5 pb-2">
          <motion.p
            layoutId="main-title-text"
            className="line-clamp-2 max-h-10 w-full truncate align-middle text-[14px] leading-5 font-bold tracking-tight text-wrap text-zinc-900 text-shadow-2xs text-shadow-zinc-300"
          >
            {monologueData?.data.title}
          </motion.p>
          <div className="flex items-center justify-between gap-0.5">
            <div className="flex min-w-0 items-center gap-2">
              <div className="relative hidden h-4 w-4 min-w-0 overflow-hidden rounded-full md:block">
                <Image
                  src={
                    "https://lh3.googleusercontent.com/a/ACg8ocIt1ZJgJUoc0gEL3U1WY60Pc6X7XZRGR60ejUE8ckZbU5fsdgY=s96-c"
                  }
                  fill={true}
                  alt="image-thumbnail"
                />
              </div>
              <p className="text-500-300 flex-1 truncate overflow-hidden text-[10px] tracking-tight text-zinc-700">
                {"codercastor code"}
              </p>
            </div>
            <motion.button className="mx-1 flex w-12 justify-center rounded-sm bg-zinc-50 py-1 text-[8px] font-bold text-zinc-950">
              EDIT
            </motion.button>
          </div>
          <div className="flex w-full gap-2">
            <motion.button className="flex items-center justify-center gap-1 rounded-sm bg-zinc-800 py-1 pr-2 pl-1.5 text-[8px] font-bold text-zinc-100">
              <IconLockFilled stroke={2} size={8} />
              <p>{monologueData?.data.visibility}</p>
            </motion.button>
            <motion.button className="flex items-center justify-center gap-1 rounded-sm bg-purple-800 py-1 pr-2 pl-1.5 text-[8px] font-bold text-zinc-100">
              <IconTagFilled stroke={2} size={8} />
              <p>Unknown</p>
            </motion.button>
            <button className="flex items-center justify-center gap-1 rounded-2xl border-[0.1px] border-purple-500 px-2 py-1 text-[8px] font-semibold text-purple-500">
              <IconShare stroke={2} size={10} />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="text-white-800 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-2 py-1 text-[10px] shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10">
              <IconPlayerPlayFilled stroke={2} size={8} />
              Play
            </button>
            <button
              onClick={() => {}}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-50 px-2 py-1 text-[10px] text-purple-950 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.2)_inset] ring ring-purple-900/20 text-shadow-purple-50/10 text-shadow-sm"
            >
              <IconWorldUpload stroke={2} size={12} />
              Publish
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-2 py-1 text-[10px] text-red-800 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10">
              <IconTrash stroke={2} size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
