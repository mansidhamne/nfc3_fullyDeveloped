// "use client"

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// const schedule = [
//   {
//     title: "Software Engineering",
//     room: "Room 1",
//     time: "9:00 AM - 10:00 AM",
//     color: "bg-blue-100",
//     borderColor: "border-blue-500",
//   },
//   {
//     title: "FOSIP",
//     room: "Room 2",
//     time: "10:00 AM - 11:00 AM",
//     color: "bg-green-100",
//     borderColor: "border-green-500",
//   },
//   {
//     title: "DBMS",
//     room: "Room 3",
//     time: "11:00 AM - 12:00 PM",
//     color: "bg-yellow-100",
//     borderColor: "border-yellow-500",
//   },
//   {
//     title: "Statistics",
//     room: "Room 1",
//     time: "12:00 PM - 1:00 PM",
//     color: "bg-red-100",
//     borderColor: "border-red-500",
//   },
// ];

// const CalendarComponent = () => {
//   const [value, onChange] = useState<Value>(new Date());
//   const [date, setDate] = useState<Date | null>(new Date());

//   const handleDateChange = (newValue: Value) => {
//     onChange(newValue);
//     setDate(newValue as Date);
//   };

//   return (
//     <div className="bg-indigo-500 right-0 w-[350px] sticky top-0 min-h-full p-4">
//       <h2 className="text-2xl font-semibold text-white mb-4">Calendar</h2>
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <Calendar
//           onChange={handleDateChange}
//           value={value}
//         />
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg text-white font-semibold mb-1">Schedule for {date ? date.toLocaleDateString() : "No date selected"}</h3>
//         {/* <h3 className="text-white">
//           {date ? date.toLocaleDateString() : "No date selected"}
//         </h3> */}
        
//         {schedule.map((item) => renderCard(item.title, item.room, item.time, item.color, item.borderColor))}
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;

// const renderCard = (title: string, room: string, time: string, color:any, borderColor:any) => {
//   return (
//     <div className={`${color} rounded-lg shadow-md py-2 px-2 mb-2 border-l-8 ${borderColor}`}>
//       <h3 className="text-md font-semibold">{title}</h3>
//       <p className="text-sm">{room}</p>
//       <p className="text-sm">{time}</p>
//     </div>
//   );
// }

"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ScheduleItem {
  title: string;
  room: string;
  time: string;
  color: string;
  borderColor: string;
}

const todaySchedule: ScheduleItem[] = [
  {
    title: "Software Engineering",
    room: "Room 1",
    time: "9:00 AM - 10:00 AM",
    color: "bg-blue-100",
    borderColor: "border-blue-500",
  },
  {
    title: "FOSIP",
    room: "Room 2",
    time: "10:00 AM - 11:00 AM",
    color: "bg-green-100",
    borderColor: "border-green-500",
  },
  {
    title: "DBMS",
    room: "Room 3",
    time: "11:00 AM - 12:00 PM",
    color: "bg-yellow-100",
    borderColor: "border-yellow-500",
  },
  {
    title: "Statistics",
    room: "Room 1",
    time: "12:00 PM - 1:00 PM",
    color: "bg-red-100",
    borderColor: "border-red-500",
  },
];

const otherDaySchedule: ScheduleItem[] = [
  {
    title: "Machine Learning",
    room: "Room 4",
    time: "9:00 AM - 10:00 AM",
    color: "bg-purple-100",
    borderColor: "border-purple-500",
  },
  {
    title: "Operating Systems",
    room: "Room 5",
    time: "10:00 AM - 11:00 AM",
    color: "bg-teal-100",
    borderColor: "border-teal-500",
  },
  {
    title: "Algorithms",
    room: "Room 6",
    time: "11:00 AM - 12:00 PM",
    color: "bg-orange-100",
    borderColor: "border-orange-500",
  },
  {
    title: "Computer Networks",
    room: "Room 4",
    time: "12:00 PM - 1:00 PM",
    color: "bg-pink-100",
    borderColor: "border-pink-500",
  },
];

const CalendarComponent = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [date, setDate] = useState<Date | null>(new Date());

  const handleDateChange = (newValue: Value) => {
    onChange(newValue);
    setDate(newValue as Date);
  };

  const renderCard = (title: string, room: string, time: string, color: string, borderColor: string) => (
    <div className={`p-2.5 rounded-lg mb-2 border-l-4 ${color} ${borderColor}`} key={title}>
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-sm">{room}</p>
      <p className="text-sm">{time}</p>
    </div>
  );

  const isToday = (date: Date | null) => {
    const today = new Date();
    return date?.toDateString() === today.toDateString();
  };

  const currentSchedule = isToday(date) ? todaySchedule : otherDaySchedule;

  return (
    <div className="bg-indigo-500 right-0 w-[350px] sticky top-0 min-h-full p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Calendar</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Calendar
          onChange={handleDateChange}
          value={value}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg text-white font-semibold mb-1">
          Schedule for {date ? date.toLocaleDateString() : "No date selected"}
        </h3>
        {currentSchedule.map((item) =>
          renderCard(item.title, item.room, item.time, item.color, item.borderColor)
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
