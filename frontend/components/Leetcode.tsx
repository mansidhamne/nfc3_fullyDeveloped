"use client";

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Leetcode = () => {
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetcodeData = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/tusharraja/solved');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLeetcodeData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetcodeData();
  }, []);

  useEffect(() => {
    const fetchContestRanking = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/userContestRankingInfo/tusharraja');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const userRating = data?.userContestRanking?.rating;
        console.log(userRating);
        setRating(userRating);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContestRanking();
  }, []);


  if (loading) {
    return <div className="bg-indigo-100 rounded-md p-2">Loading...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-500 rounded-md p-2">Error: {error}</div>;
  }

  if (!leetcodeData) {
    return <div className="bg-indigo-100 rounded-md p-2">No data available</div>;
  }

  if (rating === null) {
    return <div className="bg-indigo-100 rounded-md p-2">No ranking available</div>;
  }

  const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [leetcodeData.easySolved, leetcodeData.mediumSolved, leetcodeData.hardSolved],
        backgroundColor: ['#16a34a', '#fbbf24', '#dc2626'],
        hoverBackgroundColor: ['#66BB6A', '#FFD54F', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '50%', // To make it a semicircle
    rotation: -90, // Start angle for the semicircle
    circumference: 180, // Cover half of the circle
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-indigo-50 rounded-md p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">LeetCode Stats</h2>
      <div className="flex justify-center" style={{width: '250px', height: '200px'}}>
        <Doughnut data={data} options={options} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Solved</h3>
          <p>{leetcodeData.solvedProblem}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Contest Rating</h3>
          <p>1871</p>
        </div>
      </div>
    </div>
  );
};

export default Leetcode;
