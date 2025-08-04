"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaRocket, FaUsers, FaGraduationCap } from "react-icons/fa";

const features = [
  {
    icon: <FaCheck />,
    title: "Expert Team",
    description:
      "Our team consists of industry experts with years of experience in delivering cutting-edge solutions.",
  },
  {
    icon: <FaRocket />,
    title: "Innovative Approach",
    description:
      "We stay ahead of the curve by embracing the latest technologies and methodologies.",
  },
  {
    icon: <FaUsers />,
    title: "Client-Centric Focus",
    description:
      "Your success is our priority. We work closely with you to understand your needs and deliver tailored solutions.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Educational Excellence",
    description:
      "Our training programs are designed to equip you with practical, industry-relevant skills.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-white cursor-default">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-12"
          >
            <img
              className="w-full rounded-lg shadow-xl"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6faa6a4e9c-054a22b8df54ce625623.png"
              alt="Team collaboration"
            />
          </motion.div>

          {/* Text + Features */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-gray-600 mb-8">
              At Nascomsoft, we are committed to excellence in everything we do. Here is what sets us apart:
            </p>

            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-primary-600 bg-opacity-10 p-3 rounded-full mr-4 text-white text-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
