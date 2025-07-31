"use client";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaSearch,
  FaCalendarAlt,
  FaTags,
  FaBookOpen,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";


type Post = {
  id: number;
  image: string;
  date: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  tags: string[];
};

const blogData:Post[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "June 15, 2023",
    category: "AI & ML",
    title: "The Future of AI in Software Development",
    description:
      "Explore how artificial intelligence is revolutionizing the way we develop software and what it means for the future.",
    readTime: "5 min read",
    tags: ["Artificial Intelligence", "Machine Learning", "Development"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "May 28, 2023",
    category: "Cybersecurity",
    title: "Essential Cybersecurity Practices for Businesses",
    description:
      "Learn about the critical cybersecurity measures every business should implement to protect sensitive data.",
    readTime: "7 min read",
    tags: ["Security", "Business", "Data Protection"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "April 10, 2023",
    category: "Cloud Computing",
    title: "Optimizing Cloud Infrastructure for Scale",
    description:
      "Discover strategies for scaling your cloud infrastructure efficiently to meet growing business demands.",
    readTime: "6 min read",
    tags: ["Cloud", "Scalability", "DevOps"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "March 22, 2023",
    category: "Web Development",
    title: "Modern JavaScript Frameworks Compared",
    description:
      "A comprehensive comparison of React, Vue, and Angular for your next project.",
    readTime: "8 min read",
    tags: ["JavaScript", "Frontend", "Frameworks"],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "February 14, 2023",
    category: "Data Science",
    title: "Data Visualization Techniques That Tell a Story",
    description:
      "Learn how to transform complex data into compelling visual narratives.",
    readTime: "6 min read",
    tags: ["Data", "Visualization", "Analytics"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "January 5, 2023",
    category: "Mobile Development",
    title: "Cross-Platform Mobile Development in 2023",
    description:
      "What to consider when choosing between Flutter, React Native, and native development.",
    readTime: "9 min read",
    tags: ["Mobile", "Cross-Platform", "App Development"],
  },
];

const categories = [
  "All",
  "AI & ML",
  "Cybersecurity",
  "Cloud Computing",
  "Web Development",
  "Data Science",
  "Mobile Development",
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openPost = (post:Post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Tech Insights & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl max-w-3xl mb-8"
          >
            Stay ahead with our latest articles on technology trends,
            development practices, and industry innovations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl"
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-4 px-6 pr-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70" />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Category Filters */}
        <motion.div
          className="mb-12 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md ${
                isGridView ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md ${
                !isGridView ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">
              No articles found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : isGridView ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={blog.image}
                    alt={blog.title}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {blog.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-blue-600 font-medium">
                      {blog.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                    href={`/blogs/${blog.id}`}
                      onClick={() => openPost(blog)}
                      className="text-blue-600 font-medium hover:underline flex items-center"
                    >
                      Read more <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                whileHover={{ x: 5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={blog.image}
                      alt={blog.title}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1" /> {blog.date}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600 font-medium">
                        {blog.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <FaBookOpen className="mr-1" /> {blog.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => openPost(blog)}
                      className="text-blue-600 font-medium hover:underline flex items-center"
                    >
                      Continue reading <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {filteredBlogs.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                1
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                2
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                3
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                Next
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
