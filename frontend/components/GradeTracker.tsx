"use client"

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const subjects = ['Software Engineering', 'FOSIP', 'Operating Systems', 'DBMS', 'Statistics'];

const GradeTracker = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const gradesData = {
    'Software Engineering': { yourGrade: 85, averageGrade: 80 },
    'FOSIP': { yourGrade: 90, averageGrade: 85 },
    'Operating Systems': { yourGrade: 78, averageGrade: 82 },
    'DBMS': { yourGrade: 92, averageGrade: 88 },
    'Statistics': { yourGrade: 88, averageGrade: 90 },
  };

  const data = {
    labels: [selectedSubject],
    datasets: [
      {
        label: 'Your Grade',
        data: [gradesData[selectedSubject].yourGrade],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Average Class Grade',
        data: [gradesData[selectedSubject].averageGrade],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainaspectratio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-indigo-50 w-full shadow-md rounded-lg p-4 mt-4 max-w-[65%]">
      <h2 className="text-2xl font-bold mb-4">Grade Tracker</h2>
      <div className="flex space-x-2 mb-4">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`p-2 rounded-full text-white text-xs ${
              selectedSubject === subject ? 'bg-indigo-600' : 'bg-indigo-400'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className="relative" style={{ width: '100%', height: '250px'}}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GradeTracker;

