'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaChevronDown } from 'react-icons/fa6';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Courses', href: '/courses' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Team', href: '/team' },
  { label: 'Store', href: '/store' },
  { label: 'Contact Us', href: '/contact' },
];

const PROGRAMS = [
  { label: 'Industrial Training', href: '/programs/industrial-training' },
  { label: 'Internship', href: '/programs/internship' },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50 cursor-default">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600 cursor-pointer">
            Nascomsoft
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link key={link.label} href={link.href} className="font-medium hover:text-primary-600">
                {link.label}
              </Link>
            ))}

            {/* Programs Dropdown */}
            <div className="relative group">
              <button className="flex items-center font-medium">
                Programs <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 hidden group-hover:block">
                {PROGRAMS.map((prog) => (
                  <Link
                    key={prog.label}
                    href={prog.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {prog.label}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.slice(3).map((link) => (
              <Link key={link.label} href={link.href} className="font-medium hover:text-primary-600">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/get-started"
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.slice(0, 3).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-medium hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Programs Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className="flex justify-between w-full font-medium"
                >
                  Programs
                  <FaChevronDown className="text-xs" />
                </button>
                {programsDropdownOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    {PROGRAMS.map((prog) => (
                      <Link
                        key={prog.label}
                        href={prog.href}
                        className="block py-1 hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
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
                  className="font-medium hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/get-started"
                className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-center hover:bg-opacity-90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
