"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import CircleButton from "@/components/StyleCustom/CircleButton";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import BannerSlider from "@/components/StyleCustom/BannerSlider";
import { useRouter } from "next/navigation";
export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
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
    <Box sx={{ minHeight: "100vh", bgcolor: "white", pt: "2px" }}>
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
            color: "white",
            textTransform: "none",
            transition: "0.3s",
          }}
        >
          <Box textAlign="center">
            {/* <BannerSlider autoplay={true} /> */}
            <Image
              src="/imgMock/Banner.svg"
              alt="Chevron Right"
              width={343}
              height={479}
            />
          </Box>
        </Button>

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

          <Button
            fullWidth
            sx={{
              aspectRatio: "16/9",
              borderRadius: 2,
              color: "white",
              textTransform: "none",
              transition: "0.3s",
            }}
          >
            <Box textAlign="center">
              <Image
                src="/imgMock/Image1.svg"
                alt="Chevron Right"
                width={343}
                height={192.94}
              />
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
