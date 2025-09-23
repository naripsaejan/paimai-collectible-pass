"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import CircleButton from "@/components/StyleCustom/CircleButton";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import BannerSlider from "@/components/StyleCustom/BannerSlider";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={24} sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          กำลังโหลด...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      {/* Campaign Section */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            sx={{ mr: "6px" }}
          >
            Campaign
          </Typography>
          <CircleButton
            size={25}
            color="#F5F5F5"
            icon={
              <Image
                src="/icons/chevron_right.svg"
                alt="Chevron Right"
                width={18}
                height={18}
              />
            }
            onClick={() => alert("ไปที่ Campaign")}
          />
        </Box>

        <Button
          fullWidth
          sx={{
            aspectRatio: "16/9",
            borderRadius: 2,
            background: "linear-gradient(135deg, #9333ea, #ec4899)",
            color: "white",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(135deg, #7e22ce, #db2777)",
            },
          }}
        >
          <Box textAlign="center">
            <BannerSlider autoplay={true} />
          </Box>
        </Button>
      </Box>

      {/* News Section */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            sx={{ mr: "6px" }}
          >
            News
          </Typography>
          <CircleButton
            size={25}
            color="#F5F5F5"
            icon={
              <Image
                src="/icons/chevron_right.svg"
                alt="Chevron Right"
                width={18}
                height={18}
              />
            }
            onClick={() => alert("ไปที่ Campaign")}
          />
        </Box>

        <Box sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            ART ACTIVITY
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="error"
            gutterBottom
          >
            31 CAFÉS 31 ARTISTS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            31 Cafés 31 Artists คือกิจกรรมที่สรรหาศิลปินกลุ่มทำงานสร้างสรร 31 คน
            ร่วมจัดแสดงผลงานศิลปะกับคาเฟ่ 31 ร้านในเมืองโคราช
            เพื่อกระตุ้นเศรษฐกิจและกิจกรรม
          </Typography>
        </Box>
      </Box>

      {/* Info Section */}
      <Box sx={{ px: 2, mb: 4 }}>
        <Box sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            วิธีการเล่น
          </Typography>
          <Box
            component="ul"
            sx={{ pl: 2, m: 0, fontSize: "0.8rem", color: "text.secondary" }}
          >
            <li>เข้าสู่ระบบด้วย Google หรือ LINE</li>
            <li>เชื่อม Bitkub NEXT Wallet</li>
            <li>ไปร้านค้า 31 แห่งในโคราช</li>
            <li>สแกน QR Code เพื่อเก็บสแตมป์</li>
            <li>รับ NFT ไปยังกระเป๋า Bitkub</li>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
