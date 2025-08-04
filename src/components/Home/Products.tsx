"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    title: "Enterprise CRM Solution",
    price: "$1,299",
    description:
      "Comprehensive customer relationship management system for businesses of all sizes.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/e0ec6df6b0-c08b16d4c9e97a3ec3d4.png",
    delay: 0.1,
  },
  {
    title: "E-Learning Platform",
    price: "$899",
    description:
      "Complete learning management system with interactive features and analytics.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/b0aceb9f34-ed9e13d60282ad20eb10.png",
    delay: 0.2,
  },
  {
    title: "Inventory Management System",
    price: "$749",
    description:
      "Streamline your inventory processes with our advanced management solution.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/ab3edf0d32-27b0a6373d243c812665.png",
    delay: 0.3,
  },
  {
    title: "Business Analytics Suite",
    price: "$999",
    description:
      "Transform your data into actionable insights with our analytics platform.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/3eccbb46ce-660ea8e97988502a82c4.png",
    delay: 0.4,
  },
];

const StoreSection = () => {
  return (
    <section id="store" className="py-20 bg-gray-50 cursor-default">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Store</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium tech products and solutions
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: product.delay }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-600">
                    {product.price}
                  </span>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <span className="bg-white border border-primary-600 text-primary-600 px-6 py-3 rounded-md font-medium hover:bg-primary-600 hover:text-white transition duration-300 inline-block cursor-pointer">
            View All Products
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default StoreSection;
