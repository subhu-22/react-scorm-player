import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Users, Star } from "lucide-react";

const COURSE_CATALOG = {
  moduleA: {
    id: "module-a",
    title: "Intro to Product Management",
    path: "/dummy_scorm/index.html",
    description:
      "Foundational concepts and roles in modern product management.",
    duration: "2h 30m",
    progress: 65,
    rating: 4.8,
    students: 1234,
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center",
  },
  moduleB: {
    id: "module-b",
    title: "Vite/SCORMZIP Example",
    path: "/scormzip/res/index.html",
    description: "Advanced example of SCORM packaging and asset loading.",
    duration: "1h 45m",
    progress: 20,
    rating: 4.9,
    students: 856,
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&crop=center",
  },
  moduleC: {
    id: "module-c",
    title: "Sales Strategy & Tools",
    path: "/dummy_scorm/index.html",
    description: "Tactics for improving pipeline conversion and closing deals.",
    duration: "3h 15m",
    progress: 100,
    rating: 4.7,
    students: 2156,
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
  },
};

const MyCoursesPage = ({ setCurrentCourseKey }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(COURSE_CATALOG).map(([key, course]) => (
            <Link
              key={key}
              to={`/player?courseId=${
                course.id
              }&coursePath=${encodeURIComponent(course.path)}`}
              onClick={() => setCurrentCourseKey && setCurrentCourseKey(key)}
              className="group relative bg-slate-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="">
                <div className="flex items-center justify-between mb-4 absolute w-xs top-5 z-20 mx-auto pl-6">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.progress === 100
                        ? "bg-green-100 text-green-800"
                        : course.progress > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.progress === 100
                      ? "Completed"
                      : course.progress > 0
                      ? "In Progress"
                      : "Not Started"}
                  </span>
                </div>

                <div className="mb-4 bg-black">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 opacity-80 group-hover:opacity-40 transition-opacity duration-300 object-cover object-top"
                  />
                  <div className="bg-gray-300">
                    <div
                      className="bg-purple-400 h-2.5 group-hover:bg-purple-500 flex z-50 transition-all duration-300 shadow-lg shadow-purple-200"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 px-4 group-hover:text-purple-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 px-4">
                  {course.description}
                </p>

                {/* {course.progress > 0 && (
                  <div className="mb-4 px-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )} */}

                <div className="flex items-center justify-between text-sm text-gray-500 px-4 mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-2 px-4 py-2 ">
                <button className="bg-purple-400 group-hover:bg-purple-500 text-white border-none text-xl py-1.5 w-full items-center justify-center flex rounded-[0.7rem] font-semibold font-sans tracking-wide">
                  <span>View Now</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
