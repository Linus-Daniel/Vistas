"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      alt: "Digital design",
      initialRotate: -20,
      className: "absolute -left-10 top-32 w-[60%]",
      zIndex: "z-20",
    },
    {
      src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      alt: "Digital technology",
      initialRotate: 0,
      className: "absolute left-1/2 -top-16 w-[60%] -translate-x-1/2",
      zIndex: "z-30",
    },
    {
      src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      alt: "Digital technology",
      initialRotate: 20,
      className: "absolute -right-16 top-32 w-[60%]",
      zIndex: "z-20",
    },
  ];

  return (
    <section
      id="home"
      className="relative py-24 sm:py-32 lg:py-40 cursor-default overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/hero.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Shaping the{" "}
              <span className="text-primary-300">Digital Future</span> Together
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg">
              We build innovative software solutions, empower through education,
              and create digital experiences that transform businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition">
                Explore Services
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition">
                Contact Us
              </button>
            </div>
          </motion.div>

          {/* Right Image Gallery */}
          <div className="w-full lg:w-1/2 relative h-[400px] hidden md:block">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`rounded-xl shadow-2xl overflow-hidden ${image.className} ${image.zIndex}`}
                style={{
                  transformOrigin: "center bottom",
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                initial={{ rotate: image.initialRotate, y: 20 }}
                whileHover={{
                  rotate: 0,
                  y: 0,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                  zIndex: 40,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={350}
                  className="w-full h-full object-cover"
                  priority={index === 1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
