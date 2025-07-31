import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white cursor-default">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Contact Info */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions or ready to start your next project? Reach out to us today.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Our Location',
                  desc: '123 Tech Park, Innovation Street, Silicon Valley, CA 94043',
                  icon: 'fa-location-dot',
                },
                {
                  title: 'Email Us',
                  desc: 'info@nascomsoft.com',
                  icon: 'fa-envelope',
                },
                {
                  title: 'Call Us',
                  desc: '+1 (800) 123-4567',
                  icon: 'fa-phone',
                },
                {
                  title: 'Working Hours',
                  desc: 'Monday - Friday: 9:00 AM - 6:00 PM',
                  icon: 'fa-clock',
                },
              ].map((item, idx) => (
                <div className="flex items-start" key={idx}>
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <i className={`text-primary fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((icon, idx) => (
                  <span
                    key={idx}
                    className="bg-primary bg-opacity-10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2" data-aos="fade-left">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-transparent"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-gray-500 transition-all duration-300"
                  >
                    Your Name
                  </label>
                </div>

                <div className="mb-6 relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-transparent"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-500 transition-all duration-300"
                  >
                    Your Email
                  </label>
                </div>

                <div className="mb-6">
                  <select className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-500">
                    <option value="" disabled >
                      Select Subject
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="services">Services</option>
                    <option value="courses">Courses</option>
                    <option value="programs">Programs</option>
                    <option value="store">Store</option>
                  </select>
                </div>

                <div className="mb-6 relative">
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your Message"
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-transparent"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3 text-gray-500 transition-all duration-300"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
