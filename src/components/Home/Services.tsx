"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    title: "ICT CONSULTANCY",
    description:
      "Expert IT consulting services to optimize your business technology infrastructure.",
  },
  {
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704",
    title: "SALES OF ELECTRONIC COMPONENTS/MODULES",
    description:
      "High-quality electronic components and modules for all your project needs.",
  },
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    title: "GRAPHICS DESIGN",
    description:
      "Creative visual solutions that communicate your brand message effectively.",
  },
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    title: "SOLAR SYSTEM DESIGN & INSTALLATION",
    description: "Custom solar power solutions for homes and businesses.",
  },
  {
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
    title: "ELECTRICAL SERVICE DESIGN",
    description:
      "Professional electrical system design and implementation services.",
  },
  {
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    title: "SOFTWARE DEVELOPMENT",
    description:
      "Custom software solutions tailored to your business requirements.",
  },
  {
    image: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb",
    title: "INVERTER DESIGN & INSTALLATION",
    description:
      "Reliable power backup solutions with professional installation.",
  },
  {
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    title: "WEBSITE DESIGN AND MANAGEMENT",
    description:
      "Beautiful, functional websites with ongoing maintenance and support.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Our Services
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Comprehensive solutions tailored to meet your business and
            technology needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="h-48 relative">
                <Image
                  src={`${service.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority={index < 3} // Only prioritize first few images
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-primary-600 font-medium flex items-center hover:underline cursor-pointer">
                  Learn More
                  <FaArrowRight className="ml-2" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
