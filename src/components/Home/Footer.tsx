import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaLocationDot, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8 cursor-default-must">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Socials */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Nascomsoft</h3>
            <p className="text-gray-400 mb-6">
              Empowering businesses and individuals through innovative technology solutions and education.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                <span key={idx} className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">
                  <Icon />
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Services", "Courses", "Programs", "Store", "Blogs"].map((item, idx) => (
                <li key={idx}>
                  <span className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaLocationDot className="text-primary mt-1 mr-3" />
                <span className="text-gray-400">
                  123 Tech Park, Innovation Street, Silicon Valley, CA 94043
                </span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-primary mt-1 mr-3" />
                <span className="text-gray-400">info@nascomsoft.com</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-primary mt-1 mr-3" />
                <span className="text-gray-400">+1 (800) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2023 Nascomsoft. All rights reserved.</p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, idx) => (
                <span
                  key={idx}
                  className="text-gray-400 hover:text-primary transition duration-300 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
