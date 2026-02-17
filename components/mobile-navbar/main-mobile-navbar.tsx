import MobileUpperMenuControls from "./controls";
import MobileInfo from "./website-info";

export default function MobileNavbar() {
  return <div className="absolute md:hidden top-5 mx-8 h-12 inset-x-0 rounded-2xl flex items-center justify-between">
    <MobileInfo />
    <MobileUpperMenuControls/>
  </div>;
}
