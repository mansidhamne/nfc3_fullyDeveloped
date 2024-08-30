"use client";

import CourseCard from '@/components/CourseCard';
import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';

interface Assignment {
  name: string;
  dueDate: Date;
  grade: number;
}

interface Course {
  _id: string;
  name: string;
  code: string;
  faculty: string;
  year: number;
  branch: string;
  assignments: Assignment[];
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="flex flex-col w-full min-h-full bg-white py-8 pl-4 pr-2">
        <div className="w-full">
          <h1 className="text-3xl font-bold mt-2">Courses</h1>
        </div>
        <div className="flex flex-col mt-4">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className="flex flex-row flex-wrap gap-6">
            {courses.map((course) => (
              <CourseCard course={course} key={course.code} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-6">Suggested Reading</h1>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row gap-6">
              <div className="bg-indigo-100 shadow-lg rounded-lg p-4 w-[230px]">
                <img src="https://rukminim2.flixcart.com/image/850/1000/jl5h3m80/book/0/7/7/introduction-to-algorithms-original-imaf8cfwr7edgndb.jpeg?q=90&crop=false" alt="" className="w-[200px]"/>
                <h2 className="text-xl font-bold mt-2">Introduction to Algorithms</h2>
                <p className="text-normal text-gray-600">By Thomas H. Cormen, Charles E. Leiserson</p>
              </div>
              <div className="bg-indigo-100 shadow-lg rounded-lg p-4 w-[230px]">
                <img src="https://m.media-amazon.com/images/I/9100xK2c1eL._AC_UF1000,1000_QL80_.jpg" alt="" className="w-[200px]"/>
                <h2 className="text-xl font-bold mt-2">Data Communication and Networking</h2>
                <p className="text-normal text-gray-600">By McGraw and Forouzan</p>
              </div>
              <div className="bg-indigo-100 shadow-lg rounded-lg p-4 w-[230px]">
                <img src="https://m.media-amazon.com/images/I/81SwKCia7VL._AC_UF1000,1000_QL80_.jpg" alt="" className="w-[200px]"/>
                <h2 className="text-xl font-bold mt-2">Operating System Concepts</h2>
                <p className="text-normal text-gray-600">By Abraham Silberschatz</p>
              </div>
              <div className="bg-indigo-100 shadow-lg rounded-lg p-4 w-[230px]">
                <img src="https://rukminim2.flixcart.com/image/850/1000/jk1grrk0/book/0/2/8/fundamentals-of-software-engineering-5th-ed-original-imaf7hezxazcetgh.jpeg?q=20&crop=false" alt="" className="w-[200px]"/>
                <h2 className="text-xl font-bold mt-2">Fundamental of Software Engineering</h2>
                <p className="text-normal text-gray-600">By Rajib Mall</p>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
