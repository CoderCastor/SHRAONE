"use client";
import { cn, shadow2 } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
export const Navtabs = () => {
  const navTabs = [
    {
      id: 1,
      href: "/app",
      title: "App",
    },
    {
      id: 2,
      href: "/app",
      title: "Profile",
    },
    {
      id: 3,
      href: "/app",
      title: "History",
    },
  ];

  const [navtab, setNavtab] = useState<number>(1);

  return (
    <div className="flex flex-3 items-center justify-end gap-1.5">
      <div
        className={cn(
          "relative flex rounded-3xl bg-white px-1 py-1 ring-1 ring-black/10",
          shadow2,
        )}
      >
        {navTabs.map((item) => (
          <Link
            className="relative rounded-xl px-6 py-1.5 tracking-wide"
            onClick={() => setNavtab(item.id)}
            key={item.id}
            href={item.href}
          >
            <div className="relative">{item.title}</div>
            {navtab == item.id && (
              <motion.div
                layoutId="hover"
                className="absolute inset-0 z-10 flex items-center justify-center rounded-xl border border-red-400 bg-red-400 text-zinc-100"
              >
                {item.title}
              </motion.div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
