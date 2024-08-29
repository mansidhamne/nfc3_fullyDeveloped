// /pages/admin-dashboard/[teacherID].tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface TeacherDashboardProps {
  teacherData: any; // Replace `any` with the appropriate type for your teacher data
  error?: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacherData, error }) => {
  const router = useRouter();
  const { teacherID } = router.query;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Teacher ID: {teacherID}</p>
      <h2>Teacher Details</h2>
      <pre>{JSON.stringify(teacherData, null, 2)}</pre>
      {/* Render teacher data here */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TeacherDashboardProps> = async (context) => {
  const { teacherID } = context.query;

  try {
    if (typeof teacherID !== 'string') {
      throw new Error('Invalid teacher ID');
    }

    // Fetch teacher data based on teacherID
    const res = await fetch(`https://your-api-endpoint/teachers/${teacherID}`);
    if (!res.ok) {
      throw new Error('Failed to fetch teacher data');
    }
    const teacherData = await res.json();

    return {
      props: {
        teacherData,
      },
    };
  } catch (error) {
    // Ensure `error` is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return {
      props: {
        teacherData: null,
        error: errorMessage,
      },
    };
  }
};

export default TeacherDashboard;
