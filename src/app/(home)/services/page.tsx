"use client";
import {
  FaLaptopCode,
  FaSolarPanel,
  FaPlug,
  FaPaintBrush,
  FaShoppingCart,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PageHero from "@/components/Home/PageHero";
import Link from "next/link";

// Define the Service type
type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

export default function ServicesPage() {
  const services: Service[] = [
    {
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
      title: "SALES OF ELECTRONIC COMPONENTS/MODULES",
      description:
        "High-quality electronic components and modules for all your project needs",
      features: [
        "Wide range of components",
        "Competitive pricing",
        "Technical support",
        "Reliable suppliers",
      ],
    },
    {
      icon: <FaPaintBrush className="text-3xl text-purple-500" />,
      title: "GRAPHICS DESIGN",
      description:
        "Professional graphic design services for your brand and marketing needs",
      features: [
        "Logo design",
        "Brand identity",
        "Marketing materials",
        "Digital graphics",
      ],
    },
    {
      icon: <FaSolarPanel className="text-3xl text-yellow-500" />,
      title: "SOLAR SYSTEM DESIGN & INSTALLATION",
      description:
        "Custom solar solutions for residential and commercial properties",
      features: [
        "Energy assessment",
        "System design",
        "Professional installation",
        "Maintenance services",
      ],
    },
    {
      icon: <FaPlug className="text-3xl text-green-500" />,
      title: "ELECTRICAL SERVICE DESIGN",
      description:
        "Comprehensive electrical system design for buildings and facilities",
      features: [
        "Wiring design",
        "Load calculations",
        "Safety compliance",
        "Energy efficiency",
      ],
    },
    {
      icon: <FaLaptopCode className="text-3xl text-indigo-500" />,
      title: "SOFTWARE DEVELOPMENT",
      description:
        "Custom software solutions tailored to your business requirements",
      features: [
        "Web applications",
        "Mobile apps",
        "Database systems",
        "API integration",
      ],
    },
    {
      icon: <FaPlug className="text-3xl text-red-500" />,
      title: "INVERTER DESIGN & INSTALLATION",
      description: "Reliable power conversion solutions for your energy needs",
      features: [
        "Custom inverter design",
        "Efficient power conversion",
        "Professional installation",
        "Maintenance services",
      ],
    },
    {
      icon: <FaGlobe className="text-3xl text-blue-400" />,
      title: "WEBSITE DESIGN AND MANAGEMENT",
      description: "Complete web solutions from design to ongoing maintenance",
      features: [
        "Responsive design",
        "SEO optimization",
        "Content management",
        "Security updates",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHero
          title="Our ICT Consultancy Services"
          description="Professional technology solutions for your business needs"
          bgColor="from-blue-50 to-indigo-100"
          icon={<FaLaptopCode />}
        />

        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive{" "}
                <span className="text-primary-600">ICT Solutions</span>
              </h2>
              <p className="text-lg text-gray-600">
                We provide professional ICT consultancy services to help your
                business leverage technology effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mt-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Custom ICT Solutions
                  </h3>
                  <p className="text-lg mb-6">
                    We offer tailored ICT consultancy services to meet your
                    specific business requirements and challenges.
                  </p>
                  <Link href={"/contact"} className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Contact Us
                  </Link>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-xl font-bold mb-4">Business Benefits</h4>
                  <ul className="space-y-3">
                    {[
                      "Customized technology solutions",
                      "Expert technical advice",
                      "Cost-effective implementations",
                      "Ongoing support and maintenance",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-white text-primary-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          ✓
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
