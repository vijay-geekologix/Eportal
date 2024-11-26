"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;

// export default function ECommerce() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="flex items-center justify-between bg-orange-500 p-4">
//         <h1 className="text-white text-lg font-bold">ReliableSoft Technologies Pvt. Ltd.</h1>
//         <div className="flex items-center space-x-4">
//           <span className="text-white">19:56</span>
//           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//             {/* Profile icon */}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Today's Thought */}
//         <div className="bg-white shadow-md p-4 rounded-md">
//           <h2 className="text-orange-500 font-bold">Today's Thought</h2>
//           <p className="mt-2 text-gray-700">
//             Never be ashamed to own that you have been in the wrong, which is
//             but saying that you are wiser than yesterday.
//           </p>
//         </div>

//         {/* Clock */}
//         <div className="bg-white shadow-md p-4 rounded-md flex justify-center items-center">
//           <div className="relative w-32 h-32 border-4 border-orange-400 rounded-full flex items-center justify-center">
//             <span className="absolute text-gray-700">22 / 11</span>
//           </div>
//         </div>

//         {/* Notifications */}
//         <div className="bg-white shadow-md p-4 rounded-md">
//           <h2 className="text-orange-500 font-bold">Notifications</h2>
//           <ul className="mt-2 space-y-2">
//             {[
//               "Vaibhav Yadav added in your team...",
//               "Kamal Kishore added in your team...",
//               "Yash Verma added in your team...",
//               "Priyanka Sodha added in your team...",
//             ].map((notification, index) => (
//               <li
//                 key={index}
//                 className="text-sm bg-gray-100 p-2 rounded-md border"
//               >
//                 {notification}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Calendar */}
//         <div className="bg-white shadow-md p-4 rounded-md col-span-1 lg:col-span-3">
//           <h2 className="text-orange-500 font-bold">November 2024</h2>
//           <div className="grid grid-cols-7 gap-2 mt-4">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//               <div key={day} className="text-center text-gray-600 font-bold">
//                 {day}
//               </div>
//             ))}
//             {Array.from({ length: 30 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="text-center text-gray-700 bg-gray-100 rounded-md p-2"
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

