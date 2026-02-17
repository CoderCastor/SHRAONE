import { cn, shadow1, shadow2 } from "@/lib/utils";
import {
  IconPlayerPlayFilled,
  IconFilter2Search,
  IconBrandGooglePodcasts,
  IconHeartFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import thumb from "@/public/thumbnail.png"
export const QuickPlayCard = () => {
  return (
    <div
      className={cn(
        "hidden h-full flex-col overflow-hidden rounded-3xl bg-zinc-50 px-3 py-2 text-zinc-700 lg:flex",
        shadow1,
      )}
    >
      <p className="mb-1 px-2 text-xl font-semibold text-red-800">Tools</p>
      <div
        className={cn(
          "px py flex items-center rounded-3xl border border-zinc-200",
        )}
      >
        <QucikToolMenuItem select={true} title="Quick Play">
          <IconPlayerPlayFilled stroke={2} size={8} />
        </QucikToolMenuItem>
        <span className="text-red-600">|</span>
        <QucikToolMenuItem title="Advance Filters">
          <IconFilter2Search stroke={2} size={10} />
        </QucikToolMenuItem>
      </div>
      <div
        className={cn(
          "mt-2 flex flex-1 flex-col gap-2 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 py-2",
          shadow2,
        )}
      >
        {/* Quick Play */}
        <QuickPlayAudioItemList />
      </div>
    </div>
  );
};

const QucikToolMenuItem = ({
  children,
  classname,
  title,
  select,
}: {
  children: React.ReactNode;
  title: string;
  classname?: string;
  select?: boolean;
}) => {
  return (
    <motion.button
      whileHover={select ? { scale: 1.1 } : { scale: 1.1 }}
      className={cn(
        "m-1 flex cursor-pointer items-center gap-2 rounded-2xl border bg-zinc-100 px-2 py-1",
        select && "border-red-200 bg-red-100",
      )}
    >
      <div className="flex size-4 items-center justify-center rounded-full bg-red-500 text-zinc-200">
        {children}
      </div>
      <p className={cn("text-[10px] text-red-900", select && "text-red-400")}>
        {title}
      </p>
    </motion.button>
  );
};

const QuickPlayAudioItemList = () => {
  return (
    <div className="flex min-h-0 w-full flex-1 gap-2 overflow-y-auto mask-y-from-90% px-2">
      <div className="flex flex-col gap-2">
        <QuickPlayAudioItem isPlaying={false} Like={true} />
        <QuickPlayAudioItem isPlaying={true} Like={true} />
        <QuickPlayAudioItem isPlaying={false} Like={true} />
        <QuickPlayAudioItem isPlaying={false} Like={true} />
      </div>
    </div>
  );
};

const QuickPlayAudioItem = ({
  isPlaying,
  Like,
}: {
  isPlaying?: boolean;
  Like?: boolean;
}) => {
  return (
    <div
      className={cn(
        "listitem flex min-h-[100px] items-center rounded-2xl border bg-zinc-50 px-2",
        isPlaying && "bg-red-50 shadow-md shadow-red-800/20",
      )}
    >
      <div className="relative flex h-15 w-15 items-center justify-center overflow-hidden rounded-2xl">
        <Image
          src={
            thumb.src
          }
          alt="monologue-image"
          fill
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3
          className={cn(
            "px-2 pt-3 text-sm font-bold text-nowrap text-purple-950",
            isPlaying && "text-red-600",
          )}
        >
          Power of Subconscious Mind
        </h3>
        <h3 className="mt-1 flex gap-2 px-2 text-xs text-zinc-800/50">
          <div className="relative h-4 w-4 overflow-hidden rounded-full">
            <Image
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no"
              }
              fill={true}
              alt="image-thumbnail"
            />
          </div>
          <p className="text-purple-900/70">Tejas Shinde</p>
        </h3>
        <div className="my-2 flex justify-around px-2 text-xs text-zinc-600/80">
          <div className="flex items-center gap-1 text-violet-900">
            <IconBrandGooglePodcasts size={12} /> <p>2239</p>
          </div>
          <div
            className={cn("flex items-center gap-1", Like && "text-red-600")}
          >
            <IconHeartFilled size={12} /> <p>103</p>
          </div>
          <p className="text-violet-900">16 Dec 2024</p>
        </div>
      </div>
    </div>
  );
};
