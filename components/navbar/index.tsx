import { WebSiteNameLogo } from "./website-logo-name";
import { Navtabs } from "./navtab";
import { ProfileControls } from "./profile-controls";
export default function Navbar() {
  return (
    <div className="absolute inset-x-0 top-5 mx-auto flex max-w-5xl items-center overflow-hidden rounded-2xl bg-zinc-50 text-black">
      <WebSiteNameLogo />
      <Navtabs />
      <ProfileControls />
    </div>
  );
}
