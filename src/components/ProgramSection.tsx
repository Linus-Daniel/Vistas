import React from "react";
import { FaIndustry, FaLaptopCode, FaCheck } from "react-icons/fa";

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-20 bg-white cursor-default-must">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Gain practical experience and kickstart your career with our specialized programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Industrial Training */}
          <div
            id="industrial-training"
            className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300"
            data-aos="fade-right"
          >
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-primary-600 text-white p-4 rounded-full mb-6 md:mb-0 md:mr-6">
                <FaIndustry className="text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Industrial Training</h3>
                <p className="text-gray-600 mb-6">
                  Our industrial training program offers hands-on experience in real-world projects under the
                  guidance of industry experts. Perfect for students looking to bridge the gap between academic
                  knowledge and practical skills.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "6-month intensive training program",
                    "Work on live projects with real clients",
                    "Mentorship from industry professionals",
                    "Certificate upon successful completion",
                  ].map((text, idx) => (
                    <li className="flex items-start" key={idx}>
                      <FaCheck className="text-primary-600 mt-1 mr-3" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <span className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-300 inline-block cursor-pointer">
                  Apply Now
                </span>
              </div>
            </div>
          </div>

          {/* Internship */}
          <div
            id="internship"
            className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300"
            data-aos="fade-left"
          >
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-primary-600 text-white p-4 rounded-full mb-6 md:mb-0 md:mr-6">
                <FaLaptopCode className="text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Internship Program</h3>
                <p className="text-gray-600 mb-6">
                  Join our internship program to gain valuable industry experience, develop your skills, and
                  build your professional network. Ideal for students and recent graduates looking to jumpstart
                  their careers.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "3-month structured internship",
                    "Stipend-based opportunities",
                    "Regular feedback and performance reviews",
                    "Potential for full-time employment",
                  ].map((text, idx) => (
                    <li className="flex items-start" key={idx}>
                      <FaCheck className="text-primary-600 mt-1 mr-3" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <span className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-300 inline-block cursor-pointer">
                  Apply Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
