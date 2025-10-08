"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function WalletDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const cardData = [
    {
      id: 1,
      img: "/imgMock/Image2.svg",
      title: "Puttrow Slowbar x Nui Kasorn",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: 2,
      img: "/imgMock/Image3.svg",
      title: "Kokie x Homie",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: 3,
      img: "/imgMock/Image4.svg",
      title: "Kokie x Homie",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];

  const selected = cardData.find((item) => item.id === Number(id));

  if (!selected) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">ไม่พบข้อมูล</Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          ← กลับ
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        minHeight: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          position: "relative",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 27,
            height: 27,
            zIndex: 2,
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

        <Image
          src={selected.img}
          alt={selected.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "#000",
        }}
      >
        {selected.title}
      </Typography>

      <Typography
        sx={{
          mb: 2,
          fontSize: 14,
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        {selected.desc}
      </Typography>

      <Button
        fullWidth
        sx={{
          mt: 3,
          fontSize: 16,
          fontWeight: "bold",
          borderRadius: 2,
          backgroundColor: "#0000001F",
          color: "#000",
          textTransform: "none",
          py: 1.2,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
            boxShadow: "none",
          },
        }}
        variant="contained"
        onClick={() => router.back()}
      >
        แลกของรางวัล
      </Button>
    </Box>
  );
}
