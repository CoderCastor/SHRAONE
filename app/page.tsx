import FooterSection from "@/components/LandingPage/footer";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import UserInfo from "@/components/UserInfo";
import LandingNavbar from "@/components/LandingPage/navbar";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      // style={{
      //   background:
      //     "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ff8383 100%)",
      // }}
    >
      <HeroSection />
      <FooterSection />
    </div>
  );
}
