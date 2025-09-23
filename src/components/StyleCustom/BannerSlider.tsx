"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface BannerSliderProps {
  autoplay?: boolean; // เปิด-ปิด autoplay จากข้างนอก
}

const banners = [
  {
    id: 1,
    title: "31 Cafe 31 Artist",
    desc: "เก็บสแตมป์ครบ 31 ชิ้น",
    image: "/images/banner1.jpg",
  },
  {
    id: 2,
    title: "Special Promotion",
    desc: "ลดสูงสุด 50% ที่ร้านค้าในเครือ",
    image: "/images/banner2.jpg",
  },
  {
    id: 3,
    title: "Lucky Draw Event",
    desc: "ลุ้นรางวัลใหญ่เมื่อซื้อครบ 500.-",
    image: "/images/banner3.jpg",
  },
];

export default function BannerSlider({ autoplay = true }: BannerSliderProps) {
  return (
    <Swiper
      spaceBetween={16}
      centeredSlides
      autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-64 rounded-lg overflow-hidden relative"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative w-full h-64">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white">
              <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
              <p className="text-sm opacity-90">{banner.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* ให้ Swiper สร้าง pagination ด้านล่าง */}
      <div className="swiper-pagination !bottom-2 !top-auto"></div>
    </Swiper>
  );
}
