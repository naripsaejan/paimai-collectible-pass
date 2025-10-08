"use client";

import CircleButton from "@/components/StyleCustom/CircleButton";
import { Box, Button, Typography, ButtonBase } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
const cardData = [
  {
    img: "/imgMock/Image2.svg",
    title: "Puttrow Slowbar x Nui Kasorn",
  },
  {
    img: "/imgMock/Image3.svg",
    title: "Kokie x Homie",
  },
  {
    img: "/imgMock/Image3.svg",
    title: "Kokie x Homie",
  },
];

const Card = ({
  img,
  title,
  id,
}: {
  img: string;
  title: string;
  id: number;
}) => {
  const router = useRouter();

  return (
    <ButtonBase
      onClick={() => router.push(`/wallet/detal/${id}`)} // ✅ ไปหน้า detal/[id]
      sx={{
        width: { xs: "48%", sm: "30%", md: "20%" },
        height: { xs: 215 },
        borderRadius: 3,
        bgcolor: "#3C3C3C",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        p: 0.5,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* โลโก้มุมขวาบน */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 27,
          height: 27,
        }}
      >
        <Image
          src="/logo/bko.svg"
          alt="Logo"
          width={27}
          height={27}
          style={{ borderRadius: "6px" }}
        />
      </Box>

      {/* ภาพหลัก */}
      <Box
        sx={{
          width: "100%",
          height: "176px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={img}
          alt={title}
          width={170}
          height={176}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* ข้อความ */}
      <Typography
        variant="caption"
        sx={{
          color: "white",
          fontSize: 11,
          textAlign: "center",
          mt: 1,
          px: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </Typography>
    </ButtonBase>
  );
};

export default function WalletPage() {
  return (
    <Box className="min-h-screen bg-white " sx={{ pt: 2 }}>
      <Box sx={{ px: 2, mb: 3 }}>
        <Button
          fullWidth
          sx={{
            aspectRatio: "16/9",
            borderRadius: 2,
            color: "white",
            textTransform: "none",
            transition: "0.3s",
          }}
          onClick={() => alert("check click")}
        >
          <Box textAlign="center">
            <Image
              src="/imgMock/Image1.svg"
              alt="Banner"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        </Button>
      </Box>

      <Box sx={{ px: 2, mb: 3 }}>
        <Button
          sx={{
            fontSize: 12,
            textTransform: "none",
            py: 0.5,
          }}
          variant="outlined"
          onClick={() => alert("check click")}
        >
          Collectible Wallet
        </Button>
      </Box>
      {/* ---------------------------Card--------------------------- */}
      <Box
        sx={{
          px: 2,
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {cardData.map((item, idx) => (
          <Card key={idx} id={idx + 1} img={item.img} title={item.title} />
        ))}
      </Box>
    </Box>
  );
}
