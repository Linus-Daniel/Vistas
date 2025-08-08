"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Blogs", href: "/blogs" },
  { label: "Team", href: "/team" },
  { label: "Store", href: "/store" },
  { label: "Contact Us", href: "/contact" },
];

const PROGRAMS = [
  { label: "Industrial Training", href: "/programs/industrial-training" },
  { label: "Internship", href: "/programs/internship" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      // Wait for the animation to complete before closing
      setTimeout(() => setMobileMenuOpen(false), 300);
    }
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50 cursor-default">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary-600 cursor-pointer"
          >
            Nascomsoft
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Programs Dropdown */}
            <div className="relative group">
              <button className="flex items-center font-medium hover:text-primary-600 transition-colors">
                Programs <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 hidden group-hover:block transition-all duration-200 origin-top">
                {PROGRAMS.map((prog) => (
                  <Link
                    key={prog.label}
                    href={prog.href}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {prog.label}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/get-started"
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          >
            <div
              className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ${
                isAnimating ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-6">
                  <Link
                    href="/"
                    className="text-2xl font-bold text-primary-600 cursor-pointer"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAnimating(false);
                    }}
                  >
                    Nascomsoft
                  </Link>
                  <button
                    onClick={toggleMobileMenu}
                    className="text-gray-600 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {NAV_LINKS.slice(0, 3).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-medium hover:text-primary-600 py-2 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsAnimating(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Programs Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setProgramsDropdownOpen(!programsDropdownOpen)
                      }
                      className="flex justify-between w-full font-medium py-2 hover:text-primary-600 transition-colors"
                    >
                      Programs
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          programsDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {programsDropdownOpen && (
                      <div className="mt-2 pl-4 space-y-2">
                        {PROGRAMS.map((prog) => (
                          <Link
                            key={prog.label}
                            href={prog.href}
                            className="block py-2 hover:text-primary-600 transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setIsAnimating(false);
                            }}
                          >
                            {prog.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {NAV_LINKS.slice(3).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-medium hover:text-primary-600 py-2 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsAnimating(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link
                    href="/get-started"
                    className="bg-primary-600 text-white px-4 py-3 rounded-md font-medium text-center hover:bg-opacity-90 transition-colors mt-4"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAnimating(false);
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
