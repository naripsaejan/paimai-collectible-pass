"use client";

import CircleButton from "@/components/StyleCustom/CircleButton";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function WalletPage() {
  return (
    <Box className="min-h-screen bg-white">
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
              alt="Chevron Right"
              width={343}
              height={192.94}
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
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 175,
            height: 215,
            borderRadius: 3,
            bgcolor: "#3C3C3C",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            pt: 0.5,
            pl: 0.5,
            pr: 0.5,
          }}
        >
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
              src="/imgMock/Image2.svg"
              alt="Artwork"
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
            Puttrow Slowbar x Nui Kasorn
          </Typography>
        </Box>

        <Box
          sx={{
            width: 175,
            height: 215,
            borderRadius: 3,
            bgcolor: "#3C3C3C",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            pt: 0.5,
            pl: 0.5,
            pr: 0.5,
          }}
        >
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
              src="/imgMock/Image3.svg"
              alt="Artwork"
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
            Kokie x Homie
          </Typography>
        </Box>

        <Box
          sx={{
            width: 175,
            height: 215,
            borderRadius: 3,
            bgcolor: "#3C3C3C",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            pt: 0.5,
            pl: 0.5,
            pr: 0.5,
          }}
        >
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
              src="/imgMock/Image3.svg"
              alt="Artwork"
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
            Kokie x Homie
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
