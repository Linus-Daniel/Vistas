"use client";
import { useState } from "react";
import {
  FaBook,
  FaClock,
  FaChalkboardTeacher,
  FaFlask,
  FaTimes,
  FaUserGraduate,
  FaCreditCard,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/Home/PageHero";

type Course = {
  title: string;
  duration: string;
  level: string;
  price: string;
  highlight?: string;
  schedule?: string[];
};

type CourseCategory = {
  category: string;
  description: string;
  items: Course[];
};

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "credit",
    agreeTerms: false,
  });

  const courses: CourseCategory[] = [
    {
      category: "Web Development",
      description:
        "Build modern web applications with cutting-edge technologies",
      items: [
        {
          title: "React Mastery",
          duration: "8 weeks",
          level: "Intermediate",
          price: "$499",
          highlight: "Learn hooks, context, and advanced patterns",
          schedule: ["Mon & Wed 6-8pm", "Starting Jan 15"],
        },
        {
          title: "Node.js Backend",
          duration: "10 weeks",
          level: "Intermediate",
          price: "$549",
          highlight: "Build RESTful APIs with Express",
          schedule: ["Tue & Thu 7-9pm", "Starting Feb 1"],
        },
        {
          title: "Full-Stack JavaScript",
          duration: "12 weeks",
          level: "Advanced",
          price: "$699",
          highlight: "MERN stack with authentication",
          schedule: ["Sat 10am-2pm", "Starting Jan 20"],
        },
      ],
    },
    {
      category: "Data Science",
      description: "Extract insights and build intelligent systems with data",
      items: [
        {
          title: "Python for Data Analysis",
          duration: "6 weeks",
          level: "Beginner",
          price: "$399",
          highlight: "Pandas, NumPy, and data visualization",
          schedule: ["Mon & Wed 5-7pm", "Starting Feb 5"],
        },
        {
          title: "Machine Learning Fundamentals",
          duration: "10 weeks",
          level: "Intermediate",
          price: "$599",
          highlight: "Scikit-learn and model evaluation",
          schedule: ["Tue & Thu 6-8pm", "Starting Jan 30"],
        },
        {
          title: "Deep Learning Specialization",
          duration: "14 weeks",
          level: "Advanced",
          price: "$799",
          highlight: "TensorFlow and neural networks",
          schedule: ["Sat 9am-1pm", "Starting Feb 10"],
        },
      ],
    },
    {
      category: "Cloud & DevOps",
      description: "Deploy and scale applications in cloud environments",
      items: [
        {
          title: "AWS Certified Solutions Architect",
          duration: "8 weeks",
          level: "Intermediate",
          price: "$599",
          highlight: "Design cloud infrastructure",
          schedule: ["Mon & Wed 7-9pm", "Starting Jan 25"],
        },
        {
          title: "Docker & Kubernetes",
          duration: "6 weeks",
          level: "Intermediate",
          price: "$449",
          highlight: "Containerization and orchestration",
          schedule: ["Thu 6-9pm", "Starting Feb 15"],
        },
        {
          title: "DevOps Engineering",
          duration: "12 weeks",
          level: "Advanced",
          price: "$749",
          highlight: "CI/CD pipelines and automation",
          schedule: ["Sat 1-5pm", "Starting Jan 27"],
        },
      ],
    },
  ];

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      paymentMethod: "credit",
      agreeTerms: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enrollment submitted:", {
      course: selectedCourse,
      ...formData,
    });
    // Here you would typically send the data to your backend
    handleCloseModal();
    // Show success message
    alert(
      `Thank you for enrolling in ${selectedCourse?.title}! We'll contact you shortly.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <PageHero
          title="Our Courses"
          description="Structured learning paths for tech mastery"
          bgColor="from-primary-50 to-primary-100"
          icon={<FaBook className="text-primary-500" />}
        />

        <div className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Explore Our{" "}
                <span className="text-primary-600">Learning Programs</span>
              </h2>
              <p className="text-lg text-gray-600">
                Choose from our carefully designed courses to build in-demand
                tech skills through various learning formats.
              </p>
            </div>

            {/* Learning Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "Self-Paced Learning",
                  description:
                    "Learn at your own schedule with recorded lectures and resources",
                  icon: <FaClock className="text-3xl text-primary-500" />,
                  bg: "bg-primary-50",
                },
                {
                  title: "Instructor-Led",
                  description:
                    "Live sessions with expert instructors and peer collaboration",
                  icon: (
                    <FaChalkboardTeacher className="text-3xl text-purple-500" />
                  ),
                  bg: "bg-purple-50",
                },
                {
                  title: "Project-Based",
                  description: "Hands-on learning through real-world projects",
                  icon: <FaFlask className="text-3xl text-green-500" />,
                  bg: "bg-green-50",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`${item.bg} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all`}
                >
                  <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Course Categories */}
            <div className="space-y-16">
              {courses.map((category, catIndex) => (
                <motion.section
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="mb-8">
                    <div className="flex items-center mb-3">
                      <div className="w-4 h-4 bg-primary-500 rounded-full mr-3"></div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {category.category}
                      </h3>
                    </div>
                    <p className="text-gray-600 max-w-3xl">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.items.map((course, courseIndex) => (
                      <motion.div
                        key={courseIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: courseIndex * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {course.title}
                          </h4>
                          {course.highlight && (
                            <p className="text-sm text-gray-500 mb-4">
                              {course.highlight}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mb-5">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.level === "Beginner"
                                  ? "bg-green-100 text-green-800"
                                  : course.level === "Intermediate"
                                  ? "bg-primary-100 text-primary-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {course.level}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {course.duration}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="text-xl font-bold text-gray-900">
                              {course.price}
                            </div>
                            <button
                              onClick={() => handleOpenModal(course)}
                              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all"
                            >
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
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
                      Enroll in {selectedCourse.title}
                    </h3>
                    <p className="text-primary-600 font-medium">
                      {selectedCourse.price}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Course Details
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {selectedCourse.duration}
                    </p>
                    <p>
                      <span className="font-medium">Level:</span>{" "}
                      {selectedCourse.level}
                    </p>
                    {selectedCourse.schedule && (
                      <p>
                        <span className="font-medium">Schedule:</span>{" "}
                        {selectedCourse.schedule.join(" | ")}
                      </p>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
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
                        value={formData.name}
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
                        value={formData.email}
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={formData.paymentMethod === "credit"}
                            onChange={handleInputChange}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span>
                            Credit Card <FaCreditCard className="inline ml-1" />
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="transfer"
                            checked={formData.paymentMethod === "transfer"}
                            onChange={handleInputChange}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span>Bank Transfer</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleInputChange}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="agreeTerms"
                          className="font-medium text-gray-700"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-gray-500">
                          By enrolling, you agree to our cancellation and refund
                          policies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center"
                  >
                    <FaUserGraduate className="mr-2" /> Complete Enrollment
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
