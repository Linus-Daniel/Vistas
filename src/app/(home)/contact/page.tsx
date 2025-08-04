import PageHero from "@/components/Home/PageHero";
import { FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
    return (
      <div className="min-h-screen bg-white">
        <main>
          <PageHero 
            title="Contact Us" 
            description="Get in touch with our team"
            bgColor="from-teal-50 to-cyan-100"
            icon={<FaEnvelope />}
          />
          
          <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {"Let's"} <span className="text-primary-600">Connect</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Have questions about our programs or services? Reach out to our team and we will get back to you as soon as possible.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Our Campus</h3>
                        <p className="text-gray-600">123 Tech Boulevard, Innovation District</p>
                        <p className="text-gray-600">San Francisco, CA 94107</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Information</h3>
                        <p className="text-gray-600">hello@nascomsoft.com</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Office Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 9am - 6pm PST</p>
                        <p className="text-gray-600">Saturday: 10am - 4pm PST</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      {['twitter', 'linkedin', 'github', 'instagram', 'youtube'].map((social) => (
                        <div key={social} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary-100 transition-colors cursor-pointer">
                          <span className="sr-only">{social}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select 
                        id="subject" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="programs">Program Inquiry</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="careers">Careers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white py-4 rounded-xl font-medium hover:opacity-90 transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }