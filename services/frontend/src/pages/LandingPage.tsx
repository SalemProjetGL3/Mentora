// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import { teamMembers } from "@/data/team";
import TestimonialsSection from "@/components/TestimonialsSection";
import { PopularCourses } from "@/components/PopularCourses";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-[#5b00b3]">
        <div className="flex items-center">
          <img src="/LOGO WEB FIN-01.png" alt="Mentora Logo" className="h-10 w-auto mr-2" />
          <span className="text-2xl font-bold text-white">Mentora</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-white 
                border-white 
                bg-transparent 
                hover:text-[#3B82F6] 
                hover:border-[#3B82F6] 
                px-8 
                transition-colors" asChild>
            <Link to="/auth?tab=signin">Login</Link>
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" asChild>
            <Link to="/auth?tab=signup">Sign Up</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b00b3] via-[#060562] to-[#0f172a]/30 z-0" />
        <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] bg-[length:20px_20px]" />

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 14,
              delay: 0.2,
            }}
            className="text-center"
          >
            {/* Logo/Tagline */}
            <div className="flex flex-col items-center mb-8">
                <p className="text-lg text-white/50 font-medium">Learn. Grow. Code.</p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
                Master Modern <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#F59E0B]">
                Web Frameworks
                </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
                Interactive courses with hands-on projects and real-world examples to 
                accelerate your development career.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4">
                <Button 
                size="lg" 
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 shadow-lg"
                >
                Start Learning
                </Button>
                <Button size="lg" variant="outline" 
                className="text-white 
                border-white 
                bg-transparent 
                hover:text-[#10B981] 
                hover:border-[#10B981] 
                hover:bg-[#1E293B] 
                px-8 
                transition-colors"
                onClick={() => {
                  const element = document.getElementById('popular-courses');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                >
                Explore Courses
                </Button>
            </div>
        </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
        >
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
        Why Learn With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-[#1E293B] border-[#3B82F6] w-full max-w-sm mx-auto">
                <CardHeader>
                <CardTitle className="text-[#3B82F6] text-2xl">Learn</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-300 text-xl">
                    Build real applications as you learn with our project-based curriculum.
                </CardDescription>
                </CardContent>
            </Card>
            
            <Card className="bg-[#1E293B] border-[#F59E0B] w-full max-w-sm mx-auto">
                <CardHeader>
                <CardTitle className="text-[#F59E0B] text-2xl">Grow</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-300 text-xl">
                    Learn from industry professionals with years of experience in web development.
                </CardDescription>
                </CardContent>
            </Card>
            
            <Card className="bg-[#1E293B] border-[#10B981] w-full max-w-sm mx-auto">
                <CardHeader>
                <CardTitle className="text-[#10B981] text-2xl">Code</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-300 text-xl">
                    Join a vibrant community of learners and get help when you need it.
                </CardDescription>
                </CardContent>
            </Card>
        </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          What Our Students Say
        </h2>
        <div className="bg-[#0F172A] rounded-lg p-6 border border-[#5b00b3]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Success Rate */}
            <div className="flex-1">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#10B981] mb-2">Trusted by Genius People</h3>
                <p className="text-gray-400">Join thousands of ambitious learners who've elevated their skills through our hands-on curriculum. With expert mentors 
                  and real-world projects, we empower you to excel every step of the way.</p>
              </div>
              <div className="flex flex-row items-center justify-start">
                <p className="text-6xl font-bold text-[#3B82F6] mb-2">99%</p>
                <div className="flex-column-reverse items-center justify-start ml-3"> 
                  <p className="text-white text-2xl font-medium">Student's Complete Course</p>
                  <p className="text-white text-2xl font-medium">Successfully</p>
                </div>
              </div>
            </div>
            {/* Testimonial */}           
            <TestimonialsSection />
          </div>
        </div>
      </section>

        <PopularCourses />
      

      <section className="py-16 bg-[#0f172a] overflow-hidden">
        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Mentora Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The brilliant minds behind your learning experience
            </p>
            </motion.div>

            {/* Animated Carousel */}
            <div className="relative h-96">
                {/* Team Members - Infinite Scroll Animation */}
                <div className="absolute inset-0 flex items-center">
                    <div className="animate-infinite-scroll flex space-x-8">
                    {[...teamMembers, ...teamMembers].map((member, index) => (
                        <motion.div
                        key={`${member.id}-${index}`}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 w-64 bg-[#1E293B] rounded-xl overflow-hidden shadow-lg border border-[#5b00b3]"
                        >
                        <div className="h-48 bg-gradient-to-br from-[#3B82F6] to-[#F59E0B] relative">
                            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-[#10B981]">{member.role}</p>
                            <p className="text-gray-400 mt-2 text-sm">{member.bio}</p>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <Card className="max-w-2xl mx-auto bg-[#1E293B] border-[#5b00b3]">
            <CardHeader>
                <CardTitle className="text-white">Stay Updated</CardTitle>
                <CardDescription className="text-gray-400">
                    Subscribe to our newsletter for course updates and web development tips.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input 
                      placeholder="Your email address" 
                      className="bg-[#0F172A] border-[#334155] text-white focus:border-[#3B82F6]"
                    />
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">Subscribe</Button>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-t from-[#1E293B] via-[#060562] to-[#0f172a]/30 z-0 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've accelerated their careers with our courses.
          </p>
          <Button size="lg" className="bg-white text-[#4400a3] hover:bg-gray-200">
            <Link to="/auth?tab=signup">Enroll Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img src="/LOGO WEB FIN-01.png" alt="Mentora Logo" className="h-10 w-auto mr-2" />
                <span className="text-2xl font-bold">Mentora</span>
              </div>
              <p className="text-gray-400 mt-2">Learn. Grow. Code</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Courses</h3>
                <ul className="space-y-2">
                  <li className="hover:text-[#3B82F6] cursor-pointer">React</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Angular</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Vue</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li className="hover:text-[#3B82F6] cursor-pointer">About</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Contact</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li className="hover:text-[#3B82F6] cursor-pointer">Privacy</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Terms</li>
                  <li className="hover:text-[#3B82F6] cursor-pointer">Cookies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}