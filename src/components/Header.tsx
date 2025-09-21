"use client";

import Image from "next/image";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: TopbarProps) {
  return (
    <header className="px-4 py-3 flex justify-between items-center border-b bg-white">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-black">PAIMAI</h1>
          <p className="text-xs text-gray-600 -mt-1">Collectible Pass</p>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div>
        <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
      </div>
    </header>
  );
}
