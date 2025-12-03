import React from "react";
import { useSearchParams } from "react-router-dom";

const COURSE_CATALOG = {
  moduleA: {
    id: "module-a",
    title: "Intro to Product Management",
    path: "/dummy_scorm/index.html",
  },
  moduleB: {
    id: "module-b",
    title: "Vite/SCORMZIP Example",
    path: "/scormzip/res/index.html",
  },
  moduleC: {
    id: "module-c",
    title: "Sales Strategy & Tools",
    path: "/dummy_scorm/index.html",
  },
};

const ScormPlayer = ({ coursePath, courseId, title }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-3 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 truncate">
          {title}
        </h2>
        <span className="text-sm text-gray-500">SCORM 2004 Standard</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          key={courseId}
          src={coursePath}
          title={title}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

const PlayerPage = ({ setCurrentCourseKey }) => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || 'default';
  const coursePath = searchParams.get('coursePath') || '/dummy_scorm/index.html';
  
  const course = Object.values(COURSE_CATALOG).find(c => c.id === courseId);
  const courseKey = Object.keys(COURSE_CATALOG).find(key => COURSE_CATALOG[key].id === courseId);
  const title = course?.title || 'SCORM Course';

  React.useEffect(() => {
    if (courseKey && setCurrentCourseKey) {
      setCurrentCourseKey(courseKey);
    }
  }, [courseKey, setCurrentCourseKey]);

  return (
    <ScormPlayer
      coursePath={coursePath}
      courseId={courseId}
      title={title}
    />
  );
};

export default PlayerPage;