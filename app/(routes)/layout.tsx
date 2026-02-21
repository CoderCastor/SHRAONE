"use client";

import MainBar from "@/components/bottom-menubar-mobile/main-bar";
import { ScrollProvider, useScrollRef } from "./ScrollContext";
import MobileNavbar from "@/components/mobile-navbar/main-mobile-navbar";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

function RoutesContent({ children }: { children: React.ReactNode }) {
  const scrollRef = useScrollRef();

  return (
    <div
      ref={scrollRef}
      className="h-screen w-full overflow-y-scroll"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 3, 4, 0.2) 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
}

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <SessionProvider>
        <MainBar />
        <MobileNavbar />
        <Navbar />
        <RoutesContent>{children}</RoutesContent>
      </SessionProvider>
    </ScrollProvider>
  );
}
