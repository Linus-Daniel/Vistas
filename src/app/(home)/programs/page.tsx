"use client";
import { useState } from "react";
import PageHero from "@/components/Home/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaTimes,
  FaUserTie,
  FaLaptopCode,
  FaBriefcase,
} from "react-icons/fa";

type Program = {
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: React.ReactNode;
  highlights: string[];
  formFields?: {
    [key: string]: {
      label: string;
      type: string;
      required: boolean;
      options?: string[];
    };
  };
};

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const programs: Program[] = [
    {
      title: "Industrial Training",
      description: "Real-world project experience with industry mentors",
      duration: "3-6 Months",
      level: "Intermediate",
      icon: <FaLaptopCode className="text-2xl text-primary-500" />,
      highlights: [
        "Industry-aligned curriculum",
        "Mentorship from tech professionals",
        "Capstone project for portfolio",
        "Career placement assistance",
      ],
      formFields: {
        degree: {
          label: "Current Degree Program",
          type: "select",
          required: true,
          options: ["High School", "Bachelor's", "Master's", "PhD", "Other"],
        },
        skills: {
          label: "Technical Skills",
          type: "textarea",
          required: true,
        },
        project: {
          label: "Preferred Project Domain",
          type: "select",
          required: false,
          options: [
            "Web Development",
            "Mobile Development",
            "Data Science",
            "AI/ML",
            "Cybersecurity",
          ],
        },
      },
    },
    {
      title: "Professional Internship",
      description: "Work with tech companies on live products",
      duration: "6-12 Months",
      level: "Advanced",
      icon: <FaBriefcase className="text-2xl text-purple-500" />,
      highlights: [
        "Paid internship opportunities",
        "Real client projects",
        "Professional development",
        "Networking with industry leaders",
      ],
      formFields: {
        experience: {
          label: "Years of Experience",
          type: "select",
          required: true,
          options: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
        },
        resume: {
          label: "Resume/CV Link",
          type: "url",
          required: true,
        },
        availability: {
          label: "Availability (Hours/Week)",
          type: "number",
          required: true,
        },
      },
    },
    {
      title: "Non-Tech Internship",
      description: "Opportunities in business, marketing, and administration",
      duration: "3-12 Months",
      level: "All Levels",
      icon: <FaUserTie className="text-2xl text-green-500" />,
      highlights: [
        "Various departments available",
        "Professional work environment",
        "Skill development",
        "Networking opportunities",
      ],
      formFields: {
        department: {
          label: "Preferred Department",
          type: "select",
          required: true,
          options: [
            "Marketing",
            "Human Resources",
            "Finance",
            "Operations",
            "Sales",
          ],
        },
        skills: {
          label: "Relevant Skills",
          type: "textarea",
          required: false,
        },
        references: {
          label: "Professional References",
          type: "textarea",
          required: false,
        },
      },
    },
  ];

  const handleOpenModal = (program: Program) => {
    setSelectedProgram(program);
    setFormData({ program: program.title });
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
    setFormData({});
    setCurrentStep(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    handleCloseModal();
  };

  const renderFormField = (fieldName: string, fieldConfig: any) => {
    switch (fieldConfig.type) {
      case "select":
        return (
          <select
            id={fieldName}
            name={fieldName}
            value={formData[fieldName] || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required={fieldConfig.required}
          >
            <option value="">Select {fieldConfig.label}</option>
            {fieldConfig.options?.map((option:any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={fieldName}
            name={fieldName}
            value={formData[fieldName] || ""}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required={fieldConfig.required}
          />
        );
      default:
        return (
          <input
            type={fieldConfig.type}
            id={fieldName}
            name={fieldName}
            value={formData[fieldName] || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required={fieldConfig.required}
          />
        );
    }
  };

  const renderStep = () => {
    if (!selectedProgram) return null;

    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              {selectedProgram.formFields &&
                Object.entries(selectedProgram.formFields).map(
                  ([fieldName, fieldConfig]) => (
                    <div key={fieldName}>
                      <label
                        htmlFor={fieldName}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {fieldConfig.label}
                        {fieldConfig.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {renderFormField(fieldName, fieldConfig)}
                    </div>
                  )
                )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="text-gray-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHero
          title="Our Programs"
          description="Structured pathways to professional excellence"
          bgColor="from-primary-50 to-primary-100"
          icon={<FaGraduationCap className="text-primary-500" />}
        />

        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transformative{" "}
                <span className="text-primary-600">Professional Experiences</span>
              </h2>
              <p className="text-lg text-gray-600">
                Our programs are designed to take you from learning to
                industry-ready through structured pathways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="h-3 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6">{program.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {program.duration}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          program.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : program.level === "Intermediate"
                            ? "bg-primary-100 text-primary-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {program.level}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {program.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            ✓
                          </div>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenModal(program)}
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Our <span className="text-primary-600">Learning Approach</span>
                  </h3>
                  <p className="text-gray-700 mb-6">
                    We combine practical learning with professional mentorship to
                    create career-transforming experiences.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Hands-On Projects",
                        description:
                          "Learn by working on real-world applications",
                      },
                      {
                        title: "Professional Networking",
                        description: "Connect with industry leaders and peers",
                      },
                      {
                        title: "Mentorship",
                        description: "Guidance from experienced professionals",
                      },
                      {
                        title: "Career Support",
                        description:
                          "Resume building, interview prep, and job placement",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <div className="mr-4">
                          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="aspect-video bg-gray-100 rounded-xl w-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <FaGraduationCap className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Learn more about our programs and how they can help you
                        achieve your career goals
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Have Questions?
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Our advisors are ready to help you choose the right
                      program.
                    </p>
                    <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Apply for {selectedProgram.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Step {currentStep} of 2
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
                    {renderStep()}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}