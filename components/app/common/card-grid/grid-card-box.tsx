import { RemoveScrollBar } from "react-remove-scroll-bar";
import { cn } from "@/lib/utils";


export const GridCardBox = ({children}:{children : React.ReactNode}) => {
  

  return (
    <div
      className={cn(
        "mask-y -from-98% min-h-0 flex-5 overflow-y-auto rounded-xl border border-red-100 bg-zinc-100 py-2",
      )}
    >
      <RemoveScrollBar />
      <div className="grid grid-cols-2 gap-2 px-2">
        {children}
      </div>
    </div>
  );
};
