import { cn } from "@/lib/utils"
import { IconLayoutGridFilled, IconMenu2 } from "@tabler/icons-react"

export const GridCardHeaderAndLayoutButtons = ({
  header 
}:{header? : string}) => {
    return <div className="mb-2 flex h-8 items-center justify-between px-4 text-zinc-500">
          <p className="font-bold text-red-600">{header}</p>
          <div
            className={cn(
              "flex items-center gap-1 rounded-lg bg-zinc-100 px-2",
            )}
          >
            <button className="rounded p-1 text-red-500">
              <IconLayoutGridFilled size={13} />
            </button>
            <p className="text-xs text-zinc-200">|</p>
            <button className="rounded p-1">
              <IconMenu2 size={13} />
            </button>
          </div>
        </div>
}