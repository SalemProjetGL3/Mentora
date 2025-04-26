import { StarIcon } from "lucide-react";


export function CourseCard({ course }: { course: any }) {
  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden border border-[#334155] hover:border-[#5b00b3] transition-all duration-300">
      <div className="relative h-48">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-[#5b00b3]/20 text-[#5b00b3] text-xs font-medium px-2.5 py-0.5 rounded">
            {course.level}
          </span>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-[#FFD700] mr-1" />
            <span className="text-white text-sm">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-400">
            <span className="block">{course.duration}</span>
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <span className="text-white font-bold">{course.price}</span>
        </div>
      </div>
    </div>
  );
}

