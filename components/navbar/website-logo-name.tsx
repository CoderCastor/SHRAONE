import Image from "next/image"
import logoSource from "@/public/shraone-png.png"
export const WebSiteNameLogo = () => {
    return <div className="flex-1 flex items-center justify-start  gap-3 rounded-2xl pl-10 py-4">
      <div className="relative size-4 overflow-hidden rounded-full">
        <Image className="invert-100" src={logoSource.src} fill alt="logo-Image" />
      </div>
      <h4 className="text-sm tracking-wide text-zinc-800 drop-shadow-2xl">
        Shraone
      </h4>
      
    </div>
}