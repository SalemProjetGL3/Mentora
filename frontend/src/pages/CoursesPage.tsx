import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react"; // or your preferred icon library

export default function CoursesPage() {
  const categories = [
    { name: "All", count: courses.length },
    { name: "FullStack", count: courses.filter(c => c.tags?.includes("FullStack")).length },
    { name: "Mobile", count: courses.filter(c => c.tags?.includes("Mobile")).length },
    { name: "Javascript", count: courses.filter(c => c.tags?.includes("Javascript")).length },
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#334155]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Courses</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            It's time to roll up your sleeves—we learn best by doing. All of our courses are interactive, combining short videos with hands-on exercises.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1E293B] border-b border-[#334155] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Categories */}
            <div className="flex-1 w-full">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="border-[#334155] text-white hover:bg-[#5b00b3]/20 hover:border-[#5b00b3] h-8 px-3"
                  >
                    {category.name} 
                    <span className="ml-1 text-xs bg-[#334155] rounded-full px-1.5 py-0.5">
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div className="w-full sm:w-auto">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Level</h3>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    className="border-[#334155] text-white hover:bg-[#5b00b3]/20 hover:border-[#5b00b3] h-8 px-3"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* More Filters Button */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                className="border-[#334155] text-white hover:bg-[#5b00b3]/20 hover:border-[#5b00b3] h-8 px-3"
              >
                <FilterIcon className="w-4 h-4 mr-2" />
                More filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {courses.length} Courses
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-[#1E293B] border border-[#334155] text-white rounded px-3 py-1 focus:border-[#5b00b3]">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}