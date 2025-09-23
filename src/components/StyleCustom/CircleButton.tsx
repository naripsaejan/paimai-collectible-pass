import { Button } from "@mui/material";
import React from "react";

interface CircleButtonProps {
  icon: React.ReactNode;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  icon,
  size = 56,
  color = "#f5f5f5",
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.2), 0px 4px 6px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: "#e0e0e0",
          boxShadow:
            "0px 4px 8px rgba(0,0,0,0.25), 0px 6px 12px rgba(0,0,0,0.2)",
        },
        "&:active": {
          transform: "scale(0.95)",
          boxShadow:
            "0px 2px 3px rgba(0,0,0,0.3), 0px 4px 6px rgba(0,0,0,0.25)",
        },
      }}
    >
      {icon}
    </Button>
  );
};

export default CircleButton;
