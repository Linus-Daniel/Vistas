"use client"
import {motion} from "framer-motion";
export default function PageHero({ title, description, bgColor = "from-primary-50 to-primary-100", icon }:{
  title:string,
  description:string;
  bgColor?: string;
  icon: React.ReactNode;
}) {
    return (
      <div className={`relative pt-28 pb-20 overflow-hidden bg-gradient-to-br ${bgColor}`}>
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full rounded-bl-[200px] overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary-200 opacity-50 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block bg-white text-primary-800 px-4 py-1.5 rounded-full mb-6">
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{description}</h1>
          </motion.div>
        </div>
      </div>
    );
  }
  