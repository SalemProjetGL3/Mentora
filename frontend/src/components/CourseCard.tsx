import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course }: { course: any }) {
  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden border border-[#334155] hover:border-[#5b00b3] transition-all duration-300 h-full flex flex-col">
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-[#5b00b3]/20 text-[#5b00b3] text-xs font-medium px-2 py-0.5 rounded">
            {course.level}
          </span>
          <div className="flex items-center">
            <span className="text-white text-sm">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="mt-auto">
          <div className="text-gray-400 text-xs mb-2">
            {course.instructor}
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{course.duration}</span>
            <span className="text-white font-bold">{course.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}