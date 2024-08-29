import React from 'react';

const AssignmentCard = () => {
  // Sample assignment data
  const assignments = [
    {
      subject: 'Software Engineering',
      assignmentName: 'Experiment 2',
      submissionDate: '30th August, 2024',
      status: 'Submitted',
      marks: '8.5/10',
    },
    {
      subject: 'FOSIP',
      assignmentName: 'Lab 3',
      submissionDate: '31st August, 2024',
      status: 'Not Submitted',
      marks: '-',
    },
    {
      subject: 'Operating Systems',
      assignmentName: 'Lab 1',
      submissionDate: '20th August, 2024',
      status: 'Pending',
      marks: '-',
    },
    {
      subject: 'DBMS',
      assignmentName: 'Experiment 3',
      submissionDate: '28th August, 2024',
      status: 'Submitted',
      marks: '9/10',
    },
  ];

  return (
    <div className="bg-indigo-50 w-full shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-3">Upcoming Assignments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Assignment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Submission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Marks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.assignmentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.submissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderStatus(assignment.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentCard;

const renderStatus = (status: string) => {
    switch (status) {
        case 'Submitted':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Submitted</span>;
        case 'Not Submitted':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Not Submitted</span>;
        default:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
};

