"use client";
import {
  FaUsers,
  FaCrown,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Nasiru Abdulsalam",
      role: "MD/CEO",
      expertise: ["Embedded System", "Wireless sensor network"],
      isCEO: true,
    },
    {
      name: "Kaseem garba",
      role: "CTO",
      expertise: [
        "Embedded system hardware",
        "Electronics",
        "AutoCAD",
        "C programming language",
      ],
    },
    {
      name: "Loveth M Linus",
      role: "Secretary/Instructor",
      expertise: ["WEB DEVELOPMENT"],
    },
    {
      name: "Yohanna Philip Abana",
      role: "Asst. HR/Instructor",
      expertise: [
        "Embedded Systems",
        "C/C++",
        "Frontend and Backend web development",
      ],
    },
    {
      name: "Ikegbo Stanley Ogochukwu",
      role: "Instructor",
      expertise: [
        "DataScience",
        "Machine Learning",
        "Software Development",
        "Embedded Systems",
      ],
    },
    {
      name: "Samuel Adesola",
      role: "Instructor",
      expertise: ["Artificial Intelligence", "C++"],
    },
    {
      name: "Nurudeen sulu Gambari",
      role: "Administrative Officer",
      expertise: ["Administrative Officer"],
    },
    {
      name: "Mohammed Fahad",
      role: "HOP/HOI/Instructor",
      expertise: [
        "3D modelling/animation",
        "Android app development",
        "Desktop app development",
      ],
    },
    {
      name: "Ayobami Ismail Opeyemi",
      role: "Instructor",
      expertise: [
        "Programming (MATLAB, C, C++, Python)",
        "Embedded system",
        "Renewable energy",
      ],
    },
    {
      name: "Eleazar William",
      role: "Asst. Project Manager/Instructor",
      expertise: ["Data Engineering Fundamentals", "Report writing"],
    },
    {
      name: "Abdulazeez Ridwanullah",
      role: "Instructor",
      expertise: ["Database Management", "Data Analysis", "Cyber Security"],
    },
    {
      name: "Abdulfatah Munirudeen",
      role: "Asst. HOP/HOI/Instructor",
      expertise: ["Graphics", "UI Design", "Ethical Hacking"],
    },
    {
      name: "Kasim Garba Alasinrin",
      role: "H.R/Instructor",
      expertise: ["Embedded system", "Networking and cyber security"],
    },
    {
      name: "Abimbola Mujeeb Ayodeji",
      role: "Project Manager/Instructor",
      expertise: [
        "Frontend web development",
        "Data analysis",
        "Project management",
        "3D design and printing",
        "Report writing",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <FaUsers className="text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Dream Team
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Meet the brilliant minds powering innovation and education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* CEO Card - Special Section */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
              Leadership
            </h2>
            <div className="max-w-4xl mx-auto">
              {teamMembers
                .filter((member) => member.isCEO)
                .map((ceo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-primary-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-primary-100"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative">
                        <div className="h-full w-full bg-gradient-to-b from-primary-100 to-primary-200 flex items-center justify-center p-8">
                          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                              src={`https://ui-avatars.com/api/?name=${ceo.name.replace(
                                " ",
                                "+"
                              )}&background=random&size=512`}
                              alt={ceo.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                              <FaCrown className="mr-2" />
                              CEO
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-8 md:p-12">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                              {ceo.name}
                            </h3>
                            <p className="text-primary-600 font-medium text-lg">
                              {ceo.role}
                            </p>
                          </div>
                          <div className="flex space-x-3">
                            <a
                              href="#"
                              className="text-gray-500 hover:text-primary-600 transition-colors"
                            >
                              <FaLinkedin className="text-xl" />
                            </a>
                            <a
                              href="#"
                              className="text-gray-500 hover:text-primary-600 transition-colors"
                            >
                              <FaTwitter className="text-xl" />
                            </a>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {ceo.expertise.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-6">
                          Leading our company with vision and expertise, driving
                          innovation in embedded systems and wireless
                          technologies.
                        </p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                            <span className="text-primary-600 font-bold">
                              15+
                            </span>
                          </div>
                          <span className="text-gray-600">
                            Years of experience
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Team Members */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Our Expert Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers
              .filter((member) => !member.isCEO)
              .map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${member.name.replace(
                        " ",
                        "+"
                      )}&background=random&size=256`}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-4 pt-2">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We are always looking for talented individuals to join our mission of
            innovation and education
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-700 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
          >
            View Open Positions
          </motion.button>
        </div>
      </section>
    </div>
  );
}
