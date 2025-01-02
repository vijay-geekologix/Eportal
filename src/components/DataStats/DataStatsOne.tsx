import React from "react";
import Clock from "../Clock/clock";
// import Clock from "@/components/Clock"; // Ensure the correct path to the Clock component
import { dataStats } from "@/types/dataStats";
import { BombIcon as Balloon, PartyPopperIcon as Party, Gift, Cake } from 'lucide-react'
import { useEffect,useState } from "react";
import BiometricWorkingHour from '@/components/BiometricWorkingHour/BiometricWorkingHour'
import axios from "axios";
import { getBiometricWorkingHour } from "@/app/api/Allapi";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

const dataStatsList = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icon Path */}
      </svg>
    ),
    color: "#3FD97F",
    title: "Total Views",
    value: "3.456K",
    growthRate: 0.43,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icon Path */}
      </svg>
    ),
    color: "#FF9C55",
    title: "Total Profit",
    value: "$42.2K",
    growthRate: 4.35,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icon Path */}
      </svg>
    ),
    color: "#8155FF",
    title: "Total Product",
    value: "2.450",
    growthRate: 2.59,
  },
  // {
  //   icon: (
  //     <svg
  //       width="26"
  //       height="26"
  //       viewBox="0 0 26 26"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       {/* Icon Path */}
  //     </svg>
  //   ),
  //   color: "#18BFFF",
  //   title: "Total Users",
  //   value: "3.465",
  //   growthRate: -0.95,
  // },
];
const attendanceData = [
  // { day: "Yesterday", absents: 5, color: "red" },
  // { day: "Today", absents: 3, color: "yellow" },
  { day: "Tomorrow", absents: 2, color: "blue" },
];

const DataStatsOne: React.FC<dataStats> = () => {
    const {userDetails}:any = useUserDetailsContext();    
    // biometric ---------> 
    const [biometricData , setBiometricData] = useState([]);    
    useEffect(()=>{
      const fetch_Biometric_Data = async ()=>{
      try{
       let response  = await getBiometricWorkingHour();
       setBiometricData(response);
      }catch(err){
       console.log('ERROR OCCURE During Fetching Biometric Data',err);
      }
    }
    fetch_Biometric_Data();
    // const interval = setInterval(()=>{
    //    fetch_Biometric_Data();
    // },1000);
    // return () => clearInterval(interval);  
    },[]);

return (
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
       {/* Card 1 */}
   {userDetails?.user_role=='employee' ? (
  <div className="max-w-md w-full mx-auto rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
  <div className="px-6 py-5">
    <h1 className="font-bold text-2xl text-blue-800 mb-4">Important Notice</h1>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      Please note that the office will remain closed on <span className="font-semibold text-blue-600">Friday, 1st December</span>, due to scheduled maintenance. Regular operations will resume on <span className="font-semibold text-blue-600">Saturday, 2nd December</span>.
    </p>
    <div className="bg-blue-200 p-4 rounded-md border-l-4 border-blue-600">
      <p className="text-blue-700 font-medium">
        For urgent inquiries, contact us at <a href="mailto:support@example.com" className="underline">support@example.com</a>.
      </p>
    </div>
  </div>
  <div className="px-6 py-4 flex flex-wrap justify-between">
    <button className="bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
      View Details
    </button>
    <button className="bg-gray-200 text-gray-700 rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
      Dismiss
    </button>
  </div>
</div>
)

: (
  <div className="max-w-md w-full mx-auto bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
    <div className="max-w-4xl mx-auto my-1 p-6   rounded-lg">
      <div className="grid gap-6 md:grid-cols-1">
        {attendanceData.map(({ day, absents, color }) => (
          <div
            key={day}
            className={`bg-${color}-50 border-l-4 border-${color}-500 rounded-lg p-4`}
          >
            <h2 className={`text-xl font-semibold text-${color}-600`}>{'Employee Attendence'}</h2>
            <p className={`my-5 bg-${color}-50 border-l-4 border-${color}-500 rounded-lg p-4`}>
              Absent Yesterday : <span className="font-medium">{absents}</span>
            </p>
            <p className={`my-5 bg-${color}-50 border-l-4 border-${color}-500 rounded-lg p-4`}>
              Absent Today : <span className="font-medium">{absents}</span>
            </p>
            <p className={`my-5 bg-${color}-50 border-l-4 border-${color}-500 rounded-lg p-4`}>
              Absent Tomorrow : <span className="font-medium">{absents}</span>
            </p>
            <button
              className={`mt-4 bg-${color}-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-300`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
</div>
)

}
      {/* Card 2 */}
      <div className="max-w-sm w-full mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-yellow-50 to-yellow-100 border border-yellow-300">
  <div className="px-6 py-5">
    <h1 className="font-bold text-2xl text-yellow-800 mb-4">Fun Friday Event 🎉</h1>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      Join us this Friday for an exciting day filled with fun activities, games, and laughter! Don't miss out on the chance to unwind and connect with your colleagues.
    </p>
    <div className="bg-yellow-200 p-4 rounded-lg border-l-4 border-yellow-600">
      <p className="text-yellow-700 font-medium">
        📅 Date: Friday, December 1st <br />
        🕒 Time: 3:00 PM - 6:00 PM <br />
        📍 Venue: Office Lounge
      </p>
    </div>
  </div>
  <div className="px-6 py-4 flex flex-wrap justify-between">
    <button className="bg-yellow-600 text-white rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300">
      RSVP Now
    </button>
    <button className="bg-gray-200 text-gray-700 rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
      View Details
    </button>
  </div>
</div>


      {/* Clock Section */}
      {/* <div className="bg-white mx-auto max-w-sm w-full rounded overflow-hidden shadow-lg">
        <div className="col-span-1 mt-20 xl:col-span-1 flex-col align-center justify-center items-center">
          <Clock />
          <h1>helllo</h1>
        </div>
      </div> */}

    <div className="bg-white mx-auto max-w-sm w-full rounded shadow-lg p-6 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
         <Clock />
      </div>

      <div className="w-full bg-indigo-100 p-4 rounded-md text-center shadow-sm">
         <h2 className="text-lg font-semibold text-indigo-500">Working Hours</h2>
         {/* <p className="mt-2 text-gray-700">9:00 AM - 6:00 PM</p> */}
         <BiometricWorkingHour biometricApiData={biometricData || []}/>
      </div>
    </div>


    {/* Banner/Bunting Section */}
    <div className=" bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-2xl bg-white transform hover:scale-105 transition-transform duration-300">
        {/* Bunting Header */}
        <div className="relative h-12 bg-gradient-to-r from-indigo-400 to-indigo-600">
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="flex -mt-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 transform rotate-45 ${
                    i % 2 === 0 ? 'bg-indigo-600' : 'bg-white'
                  } -ml-2`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 bg-gradient-to-br from-indigo-50 to-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-indigo-600 font-serif">
              Happy Birthday
            </h1>
            <h2 className="text-2xl text-indigo-500 font-serif italic">
              To You
            </h2>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-around my-8">
            {/* <div className="animate-bounce delay-100">
              <Balloon className="w-10 h-10 text-indigo-400" />
            </div> */}
            <div className="animate-bounce delay-200">
              <Party className="w-10 h-10 text-indigo-500" />
            </div>
            <div className="animate-bounce delay-300">
              <Gift className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="animate-bounce delay-400">
              <Cake className="w-10 h-10 text-indigo-700" />
            </div>
          </div>

          {/* Party Hats */}
          {/* <div className="flex justify-end space-x-2 mb-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full transform -rotate-45">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-white to-indigo-100 rounded-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full m-1">
                        <div className="w-10 h-10 bg-white rounded-full m-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Balloons */}
          {/* <div className="flex justify-start space-x-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  i % 2 === 0 ? 'from-indigo-300 to-indigo-400' : 'from-indigo-500 to-indigo-600'
                } transform hover:scale-110 transition-transform duration-200`}
              />
            ))}
          </div> */}
        </div>

        {/* Bottom Section */}
        {/* <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white">
              #happybirthday
            </span>
            <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white">
              #celebration
            </span>
          </div>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default DataStatsOne;
