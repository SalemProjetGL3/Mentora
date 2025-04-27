export interface Course {
    id: string;
    title: string;
    description: string;
    tags: string[];
    duration: string;
    level: string;
    students?: number;
    rating: number;
    price: string;
    image: string;
    longDescription: string;
    instructor: string;
    syllabus: { week: number; topic: string; content: string[] }[];
    prerequisites?: string[];
  }
  
  export const courses: Course[] = [
    {
      id: "1",
      title: "Full-Stack Web Development",
      description: "Master MERN stack with hands-on projects and real-world applications",
      tags: ["FullStack", "JavaScript"],
      duration: "12 weeks",
      level: "Intermediate",
      students: 1245,
      rating: 4.9,
      price: "$199",
      image: "/public/courses/course.jpg",
      longDescription: "Learn full-stack development with a focus on the MERN stack, including MongoDB, Express, React, and Node.js.",
      instructor: "John Doe",
      syllabus: [
        { week: 1, topic: "Introduction to MERN", content: ["Overview of MERN stack"] },
        { week: 2, topic: "Frontend Development", content: ["React basics", "Component design"] },
        { week: 3, topic: "Backend Development", content: ["Node.js", "Express"] },
        { week: 4, topic: "Project Deployment", content: ["Deployment strategies"] },
      ],
      prerequisites: ["Basic programming knowledge"]
    },
    {
      id: "2",
      title: "React Native Mobile Development",
      description: "Learn to build mobile apps using React Native and Firebase integration.",
      tags: ["Mobile", "ReactNative"],
      syllabus: [
        { week: 1, topic: "React Native Basics", content: ["Introduction to React Native"] },
        { week: 2, topic: "UI Components", content: ["Building reusable components"] },
        { week: 3, topic: "State Management", content: ["Using Redux or Context API"] },
        { week: 4, topic: "Firebase Integration", content: ["Authentication", "Database"] },
      ],
      duration: "8 weeks",
      image: "/public/courses/course.jpg",
      longDescription: "Build mobile apps using React Native and integrate them with Firebase for backend services.",
      instructor: "Jane Smith",
      rating: 4.8,
      price: "$149",
      level: "Beginner",
    },
    {
      id: "3",
      title: "Advanced JavaScript Techniques",
      image: "/public/courses/course.jpg",
      longDescription: "Explore advanced JavaScript patterns and techniques to optimize performance and scalability.",
      tags: ["JavaScript", "Advanced"],
      instructor: "Alice Johnson",
      syllabus: [
        { week: 1, topic: "JavaScript ES6+", content: ["Arrow functions", "Promises"] },
        { week: 2, topic: "Asynchronous Programming", content: ["Async/Await", "Generators"] },
        { week: 3, topic: "Performance Optimization", content: ["Memory management", "Profiling"] },
        { week: 4, topic: "Design Patterns", content: ["Module pattern", "Observer pattern"] },
      ],
      prerequisites: ["Intermediate JavaScript knowledge"],
      description: "Deep dive into modern JavaScript patterns and performance optimization",
      duration: "6 weeks",
      level: "Advanced",
      students: 567,
      rating: 4.7,
      price: "$129",
    },
    {
        id: "4",
        title: "Full-Stack Web Development",
        description: "Master MERN stack with hands-on projects and real-world applications",
        tags: ["FullStack", "JavaScript"],
        duration: "12 weeks",
        level: "Intermediate",
        students: 1245,
        rating: 4.9,
        price: "$199",
        image: "/public/courses/course.jpg",
        longDescription: "Learn full-stack development with a focus on the MERN stack, including MongoDB, Express, React, and Node.js.",
        instructor: "John Doe",
        syllabus: [
          { week: 1, topic: "Introduction to MERN", content: ["Overview of MERN stack"] },
          { week: 2, topic: "Frontend Development", content: ["React basics", "Component design"] },
          { week: 3, topic: "Backend Development", content: ["Node.js", "Express"] },
          { week: 4, topic: "Project Deployment", content: ["Deployment strategies"] },
        ],
        prerequisites: ["Basic programming knowledge"]
    },
    {
        id: "5",
        title: "Full-Stack Web Development",
        description: "Master MERN stack with hands-on projects and real-world applications",
        tags: ["FullStack", "JavaScript"],
        duration: "12 weeks",
        level: "Intermediate",
        students: 1245,
        rating: 4.9,
        price: "$199",
        image: "/public/courses/course.jpg",
        longDescription: "Learn full-stack development with a focus on the MERN stack, including MongoDB, Express, React, and Node.js.",
        instructor: "John Doe",
        syllabus: [
          { week: 1, topic: "Introduction to MERN", content: ["Overview of MERN stack"] },
          { week: 2, topic: "Frontend Development", content: ["React basics", "Component design"] },
          { week: 3, topic: "Backend Development", content: ["Node.js", "Express"] },
          { week: 4, topic: "Project Deployment", content: ["Deployment strategies"] },
        ],
        prerequisites: ["Basic programming knowledge"]
      },
  ];