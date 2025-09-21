"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  { href: "/", icon: "/icons/home_fill.svg" },
  { href: "/campaign", icon: "/icons/discover.svg" },
  { href: "/rewards", icon: "/icons/gift.svg" },
  { href: "/wallet", icon: "/icons/wallet.svg" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white grid grid-cols-4 text-sm">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex flex-col items-center justify-center py-2 transition-colors ${
              active ? "text-blue-600 font-semibold" : "text-gray-500"
            }`}
          >
            <Image
              src={it.icon}
              alt="nav icon"
              width={24}
              height={24}
              className={`mb-1 ${active ? "opacity-100" : "opacity-70"}`}
            />
            {/* <span className="text-xs">{it.label}</span> */}
          </Link>
        );
      })}
    </nav>
  );
}
