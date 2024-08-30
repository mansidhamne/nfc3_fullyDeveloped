import Link from 'next/link';
import React from 'react';
import { GrCloudComputer } from "react-icons/gr";

interface CourseCardProps {
  course: {
    _id: string;
    name: string;
    code: string;
    faculty: string;
    year: number;
    branch: string;
    assignments: {
        name: string;
        dueDate: Date;
        grade: number;
    }[];
  };
  
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {

  return (
    <Link href={`/courses/${course._id}`}>
        <div className="flex flex-col bg-indigo-100 shadow-lg rounded-lg p-4 w-[350px] hover:bg-indigo-200">
        <div className="flex flex-row gap-2.5 items-center mb-2">
            <GrCloudComputer className="text-lg"/>
            <h2 className="text-xl font-bold">{course.name}</h2>
        </div>
        <p className="text-normal text-gray-600">Course code: <span className="font-semibold">{course.code}</span></p>
        <p className="text-normal text-gray-600">Faculty: <span className="font-semibold">{course.faculty}</span></p>
        <p className="text-normal text-gray-600">Year: <span className="font-semibold">{course.year}</span></p>
        <p className="text-normal text-gray-600">Branch: <span className="font-semibold">{course.branch}</span></p>
        <p className="text-normal text-gray-600">Uploaded Assignments: <span className="font-semibold">{course.assignments.length}</span></p>
        </div>
    </Link>   
  );
};

export default CourseCard;
