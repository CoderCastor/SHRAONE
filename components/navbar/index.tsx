import { WebSiteNameLogo } from "./website-logo-name";
import { Navtabs } from "./navtab";
import { ProfileControls } from "./profile-controls";
import { IconBellFilled } from "@tabler/icons-react";
import { cn, shadow1, shadow2 } from "@/lib/utils";
export default function Navbar() {
  return (
    <div className="absolute inset-x-0 top-5 mx-auto flex max-w-5xl items-center justify-between  rounded-2xl text-[12px] text-black">
      <WebSiteNameLogo />
      <div className="flex flex-2 items-center justify-center gap-8 ">
        <Navtabs />
        <div className={cn("size-9 relative rounded-full flex justify-center items-center",shadow1)}>
          <IconBellFilled stroke={1} size={15} color="#3d3d3d"/>
          <div className="absolute bg-red-500 -top-2 -right-3 text-zinc-200 rounded-full text-[10px] px-1.5">12</div>
        </div>
        <ProfileControls />
      </div>
    </div>
  );
}
