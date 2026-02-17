import Image from "next/image";
import logoSource from "@/public/shraone_mobile_navbar.jpg";

export default function MobileInfo() {
  return (
    <div className="flex h-10 w-4/12 items-center justify-center gap-3 rounded-2xl bg-black px-1">
      <div className="relative size-4 overflow-hidden rounded-full border border-zinc-700/80">
        <Image src={logoSource.src} fill alt="logo-Image" />
      </div>
      <h4 className="text-sm tracking-wide text-zinc-500 drop-shadow-2xl md:text-xs dark:bg-linear-to-b dark:from-white dark:to-white/30 dark:bg-clip-text dark:text-transparent">
        Shraone
      </h4>
    </div>
  );
}
