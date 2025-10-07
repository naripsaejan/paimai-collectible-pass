"use client";

import { Box } from "@mui/material";
import Image from "next/image";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: TopbarProps) {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        bgcolor: "white",
        borderBottom: "1px solid #0000000D",
      }}
    >
      <div className="flex items-center space-x-3">
        <Image
          src="/logo/paimai_collectible_pass.svg"
          alt="Menu"
          width={76}
          height={76}
        />
      </div>
      <div>
        <Image src="/icons/menu.svg" alt="Menu" width={40} height={40} />
      </div>
    </Box>
  );
}
