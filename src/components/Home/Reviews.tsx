import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";
import React, { JSX } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  quote: string;
  rating: number;
  delay: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Johnson",
    title: "CEO, TechVision Inc.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    quote:
      "Nascomsoft delivered an exceptional software solution that has transformed our business operations. Their team was professional, responsive, and truly understood our needs.",
    rating: 5,
    delay: 100,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    title: "Web Developer, CreativeDesign",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    quote:
      "The web development course exceeded my expectations. The instructors were knowledgeable, the content was comprehensive, and I gained practical skills that helped me land my dream job.",
    rating: 5,
    delay: 200,
  },
  {
    id: 3,
    name: "David Chen",
    title: "Former Intern, Now Software Engineer",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    quote:
      "The internship program at Nascomsoft provided me with invaluable industry experience. The mentorship I received has been instrumental in shaping my career path in tech.",
    rating: 4.5,
    delay: 300,
  },
];

const renderStars = (rating: number): JSX.Element => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-full-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="star-half" className="text-yellow-400" />);
  }

  return <div className="flex">{stars}</div>;
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the businesses and individuals we have helped
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={testimonial.delay}
            >
              <div className="flex items-center mb-6">
                <div className="text-primary-600 text-2xl mr-2">
                  <FaQuoteLeft />
                </div>
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 mb-6 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <Image
                width={500}
                height={500}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
