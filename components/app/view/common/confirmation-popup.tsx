import { cn, shadow1, shadow2 } from "@/lib/utils";
import { IconCardsFilled } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import {motion} from "motion/react"
export const ConfirmationPopUp = ({
  showConfirmationPopup,
  setShowConfirmationPopup,
  handleGenerateApprove
}: {
  showConfirmationPopup: boolean;
  setShowConfirmationPopup: Dispatch<SetStateAction<boolean>>;
  handleGenerateApprove : ()=>void
}) => {
  return (
    <motion.div
    initial={{
        opacity: 0,
        y: -10,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -10,
        filter: "blur(10px)",
      }}
      transition={{
        duration : 0.3
      }}
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-lg ",
        shadow2,
      )}
    >
      <div className={cn("rounded-3xl bg-zinc-50 p-2 border  ")}>
        <div className={cn("rounded-2xl bg-zinc-50 px-10 py-5 text-zinc-900 shadow-black/5 shadow-2xs ring-1 ring-black/5")}>
          <div className="flex items-center gap-2 text-xs font-bold">
            <p className="">It will Const you</p>
            <div className="flex gap-2 rounded-md bg-amber-100 ring-1 ring-[#f6ba24]/30 px-2.5 py-1.5">
              <IconCardsFilled color="#f6ba24" size={15} />
              <p className="text-red-500">-1</p>
            </div>
            <p>Credit</p>
          </div>
          <div className="mt-5 flex w-full justify-between px-3">
            <button onClick={()=>{
                handleGenerateApprove();
                setShowConfirmationPopup(false)
            }} className="shadow-[0px_0px_2px_1px_rgba(255, 255, 255, 0.8)_inset] flex justify-center gap-2 rounded-lg bg-emerald-50 px-4 py-1.5 text-xs text-emerald-800 ring ring-emerald-500/20 text-shadow-sm text-shadow-white/10">
              Approve
            </button>
            <button onClick={()=>setShowConfirmationPopup(false)} className="flex justify-center gap-2 rounded-lg bg-red-50 px-4 py-1.5 text-xs text-red-800 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10">
              cancel
            </button>
          </div>
          <div className="mt-4 flex w-full items-center justify-center gap-2 text-center text-[8px]">
            <input
              type="checkbox"
              className="border-default-medium bg-neutral-secondary-medium focus:ring-brand-soft size-3 rounded-xs border focus:ring-2"
              name=""
              id=""
            />
            <p>Don&apos;t ask me again</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
