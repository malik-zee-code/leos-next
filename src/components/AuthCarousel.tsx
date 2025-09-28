"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  highlightedText1: string;
  highlightedText2: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/auth/login_banner1.jpg",
    title: "Defining the",
    subtitle: "Through",
    highlightedText1: "Art of Living",
    highlightedText2: "Innovative Design",
  },
  {
    id: 2,
    image: "/auth/login_banner2.jpg",
    title: "Defining the",
    subtitle: "Through",
    highlightedText1: "Art of Living",
    highlightedText2: "Innovative Design",
  },
  {
    id: 3,
    image: "/auth/login_banner3.jpg",
    title: "Defining the",
    subtitle: "Through",
    highlightedText1: "Art of Living",
    highlightedText2: "Innovative Design",
  },
];

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-full w-full overflow-hidden ">
      {/* Slides */}
      <div className="relative h-full w-full ">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={`Carousel slide ${slide.id}`}
              fill
              className="object-cover rounded-2xl "
              priority={index === 0}
            />

            {/* Overlay */}
            <div className="absolute inset-0 " />

            {/* Content */}
            <div className="absolute inset-7 flex flex-col items-center justify-between p-8">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <Image
                  src="/logo/logo.png"
                  alt="LEOS"
                  width={180}
                  height={40}
                  className="brightness-0 invert shadow-2xl "
                />
              </div>

              {/* Text Overlay */}
              <div className="rounded-xl bg-white/90 px-6 py-4 text-center backdrop-blur-sm">
                <p className="text-lg font-medium text-gray-800">
                  {slide.title}{" "}
                  <span className="font-bold text-[#B8860B]">{slide.highlightedText1}</span>
                </p>
                <p className="text-lg font-medium text-gray-800">
                  {slide.subtitle}{" "}
                  <span className="font-bold text-[#B8860B]">{slide.highlightedText2}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2 ">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 w-18  rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#B8860B]" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
