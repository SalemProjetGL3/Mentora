import { Testimonial } from '@/types/Testimonial';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // or your preferred icon library

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "This course transformed my career. The content was comprehensive and perfectly paced for learning.",
      author: "Jonas Doe",
      role: "MERN Developer",
      rating: 5
    },
    {
      id: 2,
      quote: "I've taken many courses but this one stands out. The practical projects were incredibly valuable.",
      author: "Sarah Smith",
      role: "Frontend Engineer",
      rating: 5
    },
    {
      id: 3,
      quote: "The instructors were knowledgeable and supportive. I landed my first developer job after completing this!",
      author: "Michael Chen",
      role: "Junior Developer",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Testimonial Carousel */}
        <div className="bg-[#1E293B] p-6 rounded-lg border border-[#334155] relative min-h-[250px] w-150">
            {/* Navigation Arrows */}
            <button 
                onClick={prevTestimonial}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#4400a3] transition-colors z-10"
            >
                <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button 
                onClick={nextTestimonial}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#4400a3] transition-colors z-10"
            >
                <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Testimonial Content */}
            <div className="transition-opacity duration-300">
                <div className="flex text-[#FFD700] mb-4 justify-center">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-current" />
                ))}
                </div>
                <p className="text-gray-300 mb-4 text-center italic">
                "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center">
                    <div className="bg-[#F59E0B] w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 mt-6">
                        {testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className='mt-6'>
                        <p className="text-white font-medium">{testimonials[currentTestimonial].author}</p>
                        <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</p>
                    </div>
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#5b00b3] w-4' : 'bg-[#334155]'
                    }`}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

// Star Icon Component
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default TestimonialsSection;