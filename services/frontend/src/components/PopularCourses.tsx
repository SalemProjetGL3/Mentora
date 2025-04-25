import { CourseCard } from "@/components/CourseCard"; // You'll need to create this component
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PopularCourses() {
  const courses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master MERN stack with hands-on projects and real-world applications",
      duration: "12 weeks",
      level: "Intermediate",
      students: 1245,
      rating: 4.9,
      price: "$199",
      image: "/public/courses/course.jpg"   
    },
    {
      id: 2,
      title: "React Native Mobile Development",
      description: "Build cross-platform mobile apps with React Native and Firebase",
      duration: "8 weeks",
      level: "Beginner",
      students: 892,
      rating: 4.8,
      price: "$149",
      image: "/public/courses/course.jpg"
      },
    {
      id: 3,
      title: "Advanced JavaScript Patterns",
      description: "Deep dive into modern JavaScript patterns and performance optimization",
      duration: "6 weeks",
      level: "Advanced",
      students: 567,
      rating: 4.7,
      price: "$129",
      image: "/public/courses/course.jpg"   
     }
  ];

  return (
    <section 
      id="popular-courses"
      className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-[#0F172A]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Most Popular Courses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of students learning in-demand tech skills with our project-based courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            className="bg-[#F59E0B] hover:bg-[#d58a0c] text-white px-8 py-4 text-lg"
          >
            <Link to="/auth?tab=signin">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}