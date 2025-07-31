import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const blogData = [
  {
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3a529dfb6d-6fdcfe91b0db14b07d9e.png',
    date: 'June 15, 2023',
    category: 'AI & ML',
    title: 'The Future of AI in Software Development',
    description:
      'Explore how artificial intelligence is revolutionizing the way we develop software and what it means for the future.',
  },
  {
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/190c3c48d5-5826d07e8e2e61e53995.png',
    date: 'May 28, 2023',
    category: 'Cybersecurity',
    title: 'Essential Cybersecurity Practices for Businesses',
    description:
      'Learn about the critical cybersecurity measures every business should implement to protect sensitive data.',
  },
  {
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/84576e422b-1009792e2a054feb5658.png',
    date: 'April 10, 2023',
    category: 'Cloud Computing',
    title: 'Optimizing Cloud Infrastructure for Scale',
    description:
      'Discover strategies for scaling your cloud infrastructure efficiently to meet growing business demands.',
  },
];

const Blogs = () => {
  return (
    <section id="blogs" className="py-20 bg-white cursor-default-must">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Blogs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest tech trends and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-primary-600">{blog.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <span className="text-primary-600 font-medium hover:underline cursor-pointer">
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <span className="inline-flex items-center text-primary-600 font-medium hover:underline cursor-pointer">
            View All Blogs <FaArrowRight className="ml-2" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
