import React from "react";
import { FaArrowRight } from "react-icons/fa";

const courses = [
  {
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/c34e014de6-4e7997ca1a448b6f45aa.png",
    level: "Beginner",
    duration: "8 Weeks",
    title: "Web Development Fundamentals",
    description:
      "Learn the core technologies of web development including HTML, CSS, and JavaScript.",
    price: "$299",
  },
  {
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/56b66f4575-3572957c681fc4623e98.png",
    level: "Intermediate",
    duration: "10 Weeks",
    title: "Mobile App Development",
    description:
      "Master the art of creating responsive and user-friendly mobile applications.",
    price: "$399",
  },
  {
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/66ce42195f-c9446d59577cc3758783.png",
    level: "Advanced",
    duration: "12 Weeks",
    title: "Data Science & Analytics",
    description:
      "Dive into the world of data analysis, visualization, and machine learning.",
    price: "$499",
  },
  {
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/66ce42195f-c9446d59577cc3758783.png",
    level: "Advanced",
    duration: "12 Weeks",
    title: "Cloud Computing Essentials",
    description:
      "Get started with AWS, Azure, and Google Cloud — deploy real-world services.",
    price: "$449",
  },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Explore Our Courses
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Build real-world skills through our expertly designed tech courses.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl h-fit shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="h-44 sm:h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
                </div>

                <div className=" flex items-center mt-5 justify-between">
                  <span className="text-primary font-bold text-lg">
                    {course.price}
                  </span>
                  <button className="bg-primary-500 text-white px-4 py-2 text-sm rounded-md hover:bg-opacity-90 transition">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
            View All Courses
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
