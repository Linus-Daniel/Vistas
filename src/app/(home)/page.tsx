import Blogs from '@/components/Home/Blogs'
import ContactSection from '@/components/Home/ContactUs'
import CoursesSection from '@/components/Home/Cources'
import Hero from '@/components/Home/Hero'
import StoreSection from '@/components/Home/Products'
import Testimonials from '@/components/Home/Reviews'
import ServicesSection from '@/components/Home/Services'
import WhyChooseUs from '@/components/Home/Why-Us'
import ProgramsSection from '@/components/ProgramSection'
import React from 'react'

function page() {
  return (
    <div>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <CoursesSection />
      <ProgramsSection />
      <StoreSection />
      <Blogs />
      <Testimonials />
      <ContactSection />
      
    </div>
  )
}
export default page



