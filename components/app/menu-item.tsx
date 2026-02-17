import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";  
import { Dispatch } from "react";
import {motion} from "motion/react"
export const MenuItem = ({
  children,
  title,
  alert,
  isActive,
  to,
  setActiveTab,
  name
}: {
  children: React.ReactNode;
  title: string;
  alert?: boolean;
  to: string;
  isActive? : boolean
  name : string
  setActiveTab : any
}) => {


  return (
    <Link
      href={to}
      className={cn(
        "flex items-center rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-zinc-500 shadow",
        isActive && "bg-red-600/70 text-zinc-100 shadow-md",
      )}
      onClick={() => setActiveTab(name)}
    >
      <div
        className={cn(
          "flex flex-2 flex-row-reverse items-center justify-evenly lg:flex-row",
          isActive && "text-zinc-100",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full",
            alert && "animate-pulse bg-red-500",
          )}
        ></span>
        {children}
      </div>
      <p className="hidden flex-5 text-xs lg:block">{title}</p>
    </Link>
  );
};