"use client"
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Post = {
    id:number;
    image:string;
    date:string;
    category:string;
    title:string;
    description:string;
    readTime:string;
    tags:string[]
}


const posts = [
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

function page() {
    const params = useParams();
    const id = params?.id as string;
    const [post, setPost] = useState<Post | undefined>(undefined);

    useEffect(() => {
      const postData = posts.find((p) => p.id === parseInt(id));
      setPost(postData);
    }, [id]);

    if (!post) return null;


  return (
    <div>
      {/* Single Post View */}
      <AnimatePresence>
        {post && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-12 max-w-4xl">
              <Link href={"/blogs"}
              
                
                className="mb-8 flex items-center text-gray-500 hover:text-gray-700"
              >
                <FaArrowRight className="rotate-180 mr-2" /> Back to all


                articles
              </Link>

              <article>
                <div className="mb-6">
                  <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {post.title}
                  </h1>
                  <div className="flex items-center text-gray-500">
                    <span className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-2" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <FaBookOpen className="mr-2" /> {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="h-96 w-full mb-8 rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                </div>

                <div className="prose max-w-none">
                  <p className="text-xl text-gray-700 mb-6">
                    {post.description}
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                    molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                    eleifend nibh porttitor.
                  </p>
                  <p className="mb-6">
                    Ut in nulla enim. Phasellus molestie magna non est bibendum
                    non venenatis nisl tempor. Suspendisse dictum feugiat nisl
                    ut dapibus. Mauris iaculis porttitor posuere.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
                  <p className="mb-4">
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <ul className="mb-6 pl-6 list-disc">
                    <li className="mb-2">
                      First important concept to understand
                    </li>
                    <li className="mb-2">
                      Second key principle that drives results
                    </li>
                    <li className="mb-2">
                      Third technique for maximum effectiveness
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Implementation</h2>
                  <p className="mb-4">
                    Cras mattis consectetur purus sit amet fermentum. Aenean
                    lacinia bibendum nulla sed consectetur. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        {`// Example code snippet
function example() {
  console.log('Hello World');
  return true;
}`}
                      </code>
                    </pre>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="mb-6">
                    Vestibulum id ligula porta felis euismod semper. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Nullam
                    quis risus eget urna mollis ornare vel eu leo.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              <div className="border-t border-gray-200 pt-8 mt-12">
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts
                    .filter(
                      (blog) =>
                        blog.category === post.category &&
                        blog.id !== post.id
                    )
                    .slice(0, 2)
                    .map((blog) => (
                      <div
                        key={blog.id}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-bold mb-2">{blog.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {blog.description}
                        </p>
                        <Link
                        href={`/blogs/${blog.id}`}
                          className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                        >
                          Read article <FaArrowRight className="ml-1" />
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default page
