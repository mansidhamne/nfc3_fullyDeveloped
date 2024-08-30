// "use client"
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Sidebar from '@/components/Sidebar';
// import CalendarComponent from '@/components/Calendar';
// import { MdOutlineFileUpload } from "react-icons/md";

// interface Assignment {
//   _id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   grade: number;
// }

// interface Course {
//   _id: string;
//   name: string;
//   code: string;
//   faculty: string;
//   year: number;
//   branch: string;
//   assignments: string[];  // Store assignment IDs initially
// }

// const CoursePage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [course, setCourse] = useState<Course | null>(null);
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const params = useParams();
//   const id = params.id; // Access the 'id' parameter from the URL

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/courses/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch course');
//         }
//         const data = await response.json();
//         setCourse(data);
//         // Fetch assignments based on assignment IDs from course
//         await fetchAssignments(data.assignments);
//       } catch (err) {
//         setError('Error fetching course data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchAssignments = async (assignmentIds: string[]) => {
//       try {
//         const responses = await Promise.all(
//           assignmentIds.map(id => fetch(`http://localhost:3000/assignments/${id}`))
//         );
//         const assignmentsData = await Promise.all(responses.map(res => res.json()));
//         setAssignments(assignmentsData);
//       } catch (err) {
//         setError('Error fetching assignments');
//         console.error(err);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!course) {
//     return <p>Course not found</p>;
//   }

//   return (
//     <div className="flex flex-row bg-white w-full h-full">
//       <Sidebar />
//       <div className="p-8 min-w-[900px]">
//         <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
//         <div className="bg-indigo-100 shadow-md rounded-lg p-6">
//           <p className="mb-2 text-lg font-medium"><span className="font-semibold">Course Code:</span> {course.code}</p>
//           <p className="mb-2 text-lg font-medium"><span className="font-semibold">Faculty:</span> {course.faculty}</p>
//           <p className="mb-2 text-lg font-medium"><span className="font-semibold">Year:</span> {course.year}</p>
//           <p className="mb-2 text-lg font-medium"><span className="font-semibold">Branch:</span> {course.branch}</p>
//         </div>
//         <h2 className="text-2xl font-semibold mt-6 mb-2">Assignments</h2>
//         {assignments.length > 0 ? (
//           <div className="flex flex-row justify-between items-center border-2 border-gray-100 rounded-md shadow-md p-4">
//             <ul className="divide-y divide-gray-200 ">
//               {assignments.map((assignment) => (
//                 <li key={assignment._id} className="gap-8">
//                   <p className="font-medium text-xl text-gray-500">Title: <span className="text-gray-900 underline">{assignment.title}</span></p>
//                   <p className="font-medium text-lg text-gray-500">Description: <span className="text-gray-900">{assignment.description}</span></p>
//                   <p className="font-medium text-lg text-gray-500">Due Date: <span className="text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span></p>
//                   <p className="font-medium text-lg text-gray-500">Grade Marked: <span className="text-gray-900">{assignment.grade ? `${assignment.grade}` : "Yet to be marked"}</span></p>
//                 </li>
//               ))}
//             </ul>
//             <button
//                 className="flex flex-row items-center bg-indigo-500 text-white rounded-md px-3 py-2"
//               >
//                 <MdOutlineFileUpload className="text-xl text-white mr-2" />Upload
//               </button>
//           </div>
//         ) : (
//           <p>No assignments available.</p>
//         )}
//       </div>
//       <CalendarComponent />
//     </div>
//   );
// };

// export default CoursePage;

"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CalendarComponent from '@/components/Calendar';
import { MdOutlineFileUpload } from "react-icons/md";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
}

interface Course {
  _id: string;
  name: string;
  code: string;
  faculty: string;
  year: number;
  branch: string;
  assignments: string[];
}

const CoursePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
        await fetchAssignments(data.assignments);
      } catch (err) {
        setError('Error fetching course data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAssignments = async (assignmentIds: string[]) => {
      try {
        const responses = await Promise.all(
          assignmentIds.map(id => fetch(`http://localhost:3000/assignments/${id}`))
        );
        const assignmentsData = await Promise.all(responses.map(res => res.json()));
        setAssignments(assignmentsData);
      } catch (err) {
        setError('Error fetching assignments');
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", id);

    try {
      const response = await fetch('http://localhost:3000/assignments/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="flex flex-row bg-white w-full h-full">
      <Sidebar />
      <div className="p-8 min-w-[900px]">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <div className="bg-indigo-100 shadow-md rounded-lg p-6">
          <p className="mb-2 text-lg font-medium"><span className="font-semibold">Course Code:</span> {course.code}</p>
          <p className="mb-2 text-lg font-medium"><span className="font-semibold">Faculty:</span> {course.faculty}</p>
          <p className="mb-2 text-lg font-medium"><span className="font-semibold">Year:</span> {course.year}</p>
          <p className="mb-2 text-lg font-medium"><span className="font-semibold">Branch:</span> {course.branch}</p>
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Assignments</h2>
        {assignments.length > 0 ? (
          <div className="flex flex-row justify-between items-center border-2 border-gray-100 rounded-md shadow-md p-4">
            <ul className="divide-y divide-gray-200 ">
              {assignments.map((assignment) => (
                <li key={assignment._id} className="gap-8">
                  <p className="font-medium text-xl text-gray-500">Title: <span className="text-gray-900 underline">{assignment.title}</span></p>
                  <p className="font-medium text-lg text-gray-500">Description: <span className="text-gray-900">{assignment.description}</span></p>
                  <p className="font-medium text-lg text-gray-500">Due Date: <span className="text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span></p>
                  <p className="font-medium text-lg text-gray-500">Grade Marked: <span className="text-gray-900">{assignment.grade ? `${assignment.grade}` : "Yet to be marked"}</span></p>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-12">
              <button 
                className="flex flex-row items-center bg-indigo-500 text-white rounded-md px-3 py-2 w-[115px]"
                onClick={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
              </button>
              <button 
                className="flex flex-row items-center bg-indigo-500 text-white rounded-md px-3 py-2 w-[115px]"
                onClick={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
              </button>
            </div>
            
            
            {/* <button
              onClick={handleFileUpload}
              className="flex flex-row items-center bg-indigo-500 text-white rounded-md px-3 py-2"
            >
              <MdOutlineFileUpload className="text-xl text-white mr-2" />Upload
            </button> */}
          </div>
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
      <CalendarComponent />
    </div>
  );
};

export default CoursePage;
