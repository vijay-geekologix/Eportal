'use client'

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, X, Search } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { AttendenceList, WeekHolday, requestEditAttendenceType } from "@/app/api/Allapi"
import { toast } from "react-toastify"
import React from "react"

export default function AttendanceModule() {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [userId, setUserId] = useState<any>((localStorage.getItem('esslId')));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("November")
  const [year, setYear] = useState("2024")
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [showAttendencetypeEditModel, setShowAttendencetypeEditModel] = useState(false);
  const [attendenceTypeDate, setAttendanceTypeDate] = useState('');
  const [attendenceType, setAttendanceType] = useState('present');
  const [attendanceTypeFieldId, setAttendanceTypeFieldId] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [AbsentCount, setAbsentCount] = useState<any>('')
  const [HalfDayCount, setHalfDayCount] = useState<any>('')
  const [PresentCount, setPresentCount] = useState<any>('')
  const [WorkingHours,setWorkingHours] = useState<any>('')

  const [regularizeForm, setRegularizeForm] = useState({
    date: "",
    checkIn: "",
    checkOut: "",
    type: "both"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [weekoOff, setWeekOff] = useState<any>();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendanceData();
    fetchWeekHolidaData()
  }, []);

  // const fetchAttendanceData = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {

  //     const date = new Date();
  //     const startDate2 = startDate != '' ? startDate : '2024-11-20';
  //     const endDate2 = endDate != '' ? endDate : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  //     const response = await AttendenceList(userId, startDate2, endDate2);
  //     setAttendanceData(response.data.result);
  //     console.log('sgsgdgs', response.data.result);
  //     if (response.data.result.length === 0) {
  //       setError("No data found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching attendance data:", error);
  //     setError("No data found");
  //     toast.error("Failed to fetch attendance data. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const fetchAttendanceData = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const date = new Date();
  //     const startDate2 = startDate !== '' ? startDate : '2024-11-20';
  //     const endDate2 =
  //       endDate !== ''
  //         ? endDate
  //         : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  //     const response = await AttendenceList(userId, startDate2, endDate2);
  //     const attendance = response.data.result;

  //     if (attendance.length === 0) {
  //       setError("No data found");
  //       setAttendanceData([]);
  //       return;
  //     }

  //     // Step 1: Filter attendance data for "Friday"
  //     const fridayIndices = attendance
  //       .map((item:any, index:any) => ({ day: new Date(item.date).getDay(), index })) // Extract day and index
  //       .filter((item:any) => item.day === 5); // Friday's day index is 5

  //     if (fridayIndices.length === 0) {
  //       setError("No Friday found in the data");
  //       setAttendanceData([]);
  //       return;
  //     }

  //     // Step 2: Find the first Friday's index
  //     const firstFridayIndex = fridayIndices[0].index;

  //     // Step 3: Find the next occurrences of Saturday and Friday after the first Friday
  //     const saturdayIndex = attendance.findIndex(
  //       (item:any, index:any) =>
  //         index > firstFridayIndex && new Date(item.date).getDay() === 6 // Saturday's day index is 6
  //     );

  //     const nextFridayIndex = attendance.findIndex(
  //       (item:any, index:any) =>
  //         index > firstFridayIndex && new Date(item.date).getDay() === 5
  //     );

  //     // Step 4: Add the indices to the response
  //     const resultWithIndices:any = {
  //       attendance,
  //       indices: {
  //         firstFriday: firstFridayIndex,
  //         saturdayAfterFirstFriday: saturdayIndex,
  //         nextFridayAfterFirstFriday: nextFridayIndex,
  //       },
  //     };

  //     // Set the final data
  //     setAttendanceData(attendance);
  //     console.log("Filtered Data with Indices:", resultWithIndices);
  //   } catch (error) {
  //     console.error("Error fetching attendance data:", error);
  //     setError("Failed to fetch attendance data. Please try again.");
  //     toast.error("Failed to fetch attendance data. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Define default dates
      const date = new Date();
      const startDate2 = startDate !== '' ? startDate : '2024-11-20';
      const endDate2 = endDate !== '' ? endDate : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      // Fetch attendance data from API
      const response = await AttendenceList(userId, startDate2, endDate2);
      const attendanceData = response.data.result;
      const attendanceData1 = response.data.result;

      // Validate attendance data
      if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
        setError("No data found");
        toast.error("No attendance data available.");
        return;
      }

      // Set the main state for attendanceData
      setAttendanceData(attendanceData);
      console.log('Attendance Data:', attendanceData);

      // Process for missing dates (Fridays and Mondays logic)
      const dateMap = attendanceData.reduce((acc, record) => {
        acc[record.date] = record.day; // Assuming `record.date` and `record.day` exist
        return acc;
      }, {});

      const missingDateCount = Object.entries(dateMap).reduce((count, [date, day]) => {
        if (day.toLowerCase() === "friday") {
          const fridayDate = new Date(date);
          const mondayDate = new Date(fridayDate);
          mondayDate.setDate(mondayDate.getDate() + 3); // Add 3 days to get Monday

          // Get all dates between Friday and Monday
          let currentDate = new Date(fridayDate);
          currentDate.setDate(currentDate.getDate() + 1);

          while (currentDate < mondayDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            if (!dateMap[formattedDate]) count++;
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        return count;
      }, 0);

      console.log("Missing Dates Count:", missingDateCount);
      setWeekOff(missingDateCount);

      // // Count attendance types (Absent, Half Day, Present)
      // let absentCount = 0;
      // let halfDayCount = 0;
      // let presentCount = 0;

      // if (Array.isArray(attendanceData1)) {
      //   attendanceData1.forEach((record) => {
      //     if (Array.isArray(record.records)) {
      //       record.records.forEach((subRecord) => {
      //         console.log("Sub Record:", subRecord);
      //         if (subRecord.attendenceType === "Absent") {
      //           absentCount++;
      //         } else if (subRecord.attendenceType === "Half Day") {
      //           halfDayCount++;
      //         } else if (subRecord.attendenceType === "Present") {
      //           presentCount++;
      //         }
      //       });
      //     }
      //   });
      // }

      // console.log("Absent Count:", absentCount);
      // console.log("Half Day Count:", halfDayCount);
      // console.log("Present Count:", presentCount);
      // let absent = absentCount / 2
      // let halfday = halfDayCount / 2
      // let present = presentCount / 2
      // // Optional: Set counts in state
      // setAbsentCount(absent);
      // setHalfDayCount(halfday);
      // setPresentCount(present);
// Initialize attendance counts and total working hours
let absentCount = 0;
let halfDayCount = 0;
let presentCount = 0;
let totalWorkingSeconds = 0; // To store total working seconds

if (Array.isArray(attendanceData1)) {
  attendanceData1.forEach((record) => {
    if (Array.isArray(record.records)) {
      record.records.forEach((subRecord) => {
        console.log("Sub Record:", subRecord);

        // Count attendance types
        if (subRecord.attendenceType === "Absent") {
          absentCount++;
        } else if (subRecord.attendenceType === "Half Day") {
          halfDayCount++;
        } else if (subRecord.attendenceType === "Present") {
          presentCount++;
        }

        // Sum up working hours (assuming workingHour is in seconds)
        if (subRecord.workingHour) {
          
          totalWorkingSeconds += parseInt(subRecord.workingHour, 10); // Convert to number
        }
      });
    }
  });
}

// Calculate total working time in hours and seconds
const totalWorkingHours = Math.floor(totalWorkingSeconds / 3600); // Convert seconds to hours
const remainingSeconds = totalWorkingSeconds % 3600; // Remaining seconds after hours

// Log results
console.log("Absent Count:", absentCount);
console.log("Half Day Count:", halfDayCount);
console.log("Present Count:", presentCount);
console.log("Total Working Hours:", totalWorkingHours);
console.log("Remaining Seconds:", remainingSeconds);

// Optional: Scale attendance counts
let absent = absentCount / 2;
let halfday = halfDayCount / 2;
let present = presentCount / 2;

// Optional: Set counts in state
setAbsentCount(absent);
setHalfDayCount(halfday);
setPresentCount(present);

// Optional: Set working hours in state or a variable
setWorkingHours({ totalWorkingHours, remainingSeconds });
console.log("totalWorkingHours", totalWorkingHours)
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data. Please try again.");
      toast.error("Failed to fetch attendance data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const [totalCounts, setTotalCounts] = useState({
    attendance: 0,
    isHoliday: 0,
    isWeekend: 0,
    isAbsent: 0,
  });
  const fetchWeekHolidaData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await WeekHolday(startDate, endDate);
      let totalCounts = { attendance: 0, isHoliday: 0, isWeekend: 0, isAbsent: 0 };
      response.data.weeklySummary.forEach((res: any) => {
        if (res.attendance) totalCounts.attendance++;
        if (res.isHoliday) totalCounts.isHoliday++;
        if (res.isWeekend) totalCounts.isWeekend++;
        if (res.isAbsent) totalCounts.isAbsent++;
      });
      setTotalCounts(totalCounts)
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("No data found");
      toast.error("Failed to fetch attendance data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    fetchAttendanceData();
    fetchWeekHolidaData();
  };

  const toggleSessionDetails = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const handleRegularize = (date: string, checkIn: any, checkOut: any) => {
    setRegularizeForm({
      date,
      checkIn: checkIn.time,
      checkOut: checkOut.time,
      type: "both"
    });
    setShowRegularizeModal(true);
  };

  const handleRegularizeSubmit = () => {
    // Here you would typically send this data to your backend
    console.log("Regularize form submitted:", regularizeForm);
    setShowRegularizeModal(false);
  };


  const handleAttendenceTypeEdit = async (e: any) => {
    e.preventDefault()
    const response = await requestEditAttendenceType(userId, attendenceTypeDate, attendenceType, attendanceTypeFieldId, requestReason);
    setShowAttendencetypeEditModel(prev => !prev);
    console.log("attendence Type", e.target);
  }


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-10xl px-4 md:px-6">
        <Breadcrumb pageName="Attendance" />

        <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
          <div className="mx-auto max-w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <span>Attendance</span>
              <ChevronRight className="h-5 w-5" />
              <span>My Attendance</span>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Filter Section */}
              <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleFilter}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-200" />
                  <span className="text-sm">ABS</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{AbsentCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-sm">PRE</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{PresentCount}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <span className="text-sm">PRE</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{PresentCount}</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="text-sm">HF</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{HalfDayCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-sm">PH</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{totalCounts.isHoliday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="text-sm">WO</span>
                  <span className="rounded border px-2 py-0.5 text-sm">{weekoOff}</span>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto max-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Date", "Day", "First Login", "Last Logout", "Attendance Type", "Tot. Hrs.", "LateMark_Calc"].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-red-500">{error}</td>
                      </tr>
                    ) : (
                      attendanceData.map((row: any) => (
                        <React.Fragment key={row._id}>
                          <tr >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer" onClick={() => toggleSessionDetails(row.date)}>
                              {row.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.day}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[0].time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[row.records.length - 1].time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex-row gap-5 ">

                                {(() => {
                                  const workingHour = row.records[row.records.length - 1]?.workingHour;
                                  if (!workingHour) return "No Data";

                                  return row.records[row.records.length - 1].attendenceType == 'Present' ? (
                                    <span className="mr-2 text-green-500">Present</span>
                                  ) : (
                                    row.records[row.records.length - 1].attendenceType == "Half Day" ? (
                                      <span className="mr-1 text-orange-500">Half Day</span>
                                    ) : (
                                      <span className="mr-3 text-red-500">Absent</span>
                                    )
                                  );
                                })()
                                }
                                <button
                                  onClick={(e) => {
                                    console.log('hjhjhjh', e.target)
                                    setAttendanceTypeDate(row.date);
                                    setAttendanceTypeFieldId(row._id);
                                    setShowAttendencetypeEditModel(prev => !prev)
                                  }}
                                  className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-600 p-1 rounded-full transition-colors"
                                  title="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.125.688.688-4.125L16.862 3.487z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[row.records.length - 1].workingHour}</td>
                            {/* {console.log('working',row)}   */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lateMark}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => handleRegularize(row.date)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition-colors text-xs"
                              >
                                Regularize
                              </button>
                            </td> */}
                          </tr>
                          {expandedDate === row.date && (

                            <tr>
                              <td colSpan={8}>
                                <div className="px-6 py-4 bg-gray-50">
                                  <div className="d-flex justify-between">
                                    <h4 className="font-semibold mb-2">Session Details</h4>
                                  </div>

                                  <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {row.records?.map((_res: any, index: any) => {
                                      if (index % 2 !== 0) return null;
                                      const session1 = row.records[index];
                                      const session2 = row.records[index + 1];
                                      return (
                                        <div key={index} className="bg-white p-3 rounded-md shadow-sm space-y-2 md:space-y-0 md:grid md:grid-cols-4 gap-4">
                                          <div className="flex flex-col">
                                            {/* <p className="font-medium">Session {index + 1}</p> */}
                                            <p>Check In: {session1?.time || 'N/A'}</p>
                                            {/* <p>Check Out: {session1?.checkOut || 'N/A'}</p> */}
                                          </div>

                                          {session2 && (
                                            <div className="flex flex-col">
                                              {/* <p className="font-medium">Session {index + 2}</p> */}
                                              <p>Check Out: {session2?.time || 'N/A'}</p>
                                              {/* <p>Check Out: {session2?.checkOut || 'N/A'}</p> */}
                                            </div>
                                          )}
                                          {session2 && (
                                            <div className="flex flex-col">
                                              {/* <p className="font-medium">Session {index + 2}</p> */}
                                              <p>Total Work: {session2?.workingHour || 'N/A'}</p>
                                              {/* <p>Check Out: {session2?.checkOut || 'N/A'}</p> */}
                                            </div>
                                          )}
                                          {session2 && (
                                            <div className="flex flex-col">
                                              <div>
                                                <button
                                                  onClick={() => handleRegularize(row.date, session1, session2)}
                                                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition-colors text-xs"
                                                >
                                                  Regularize
                                                </button>
                                              </div>
                                            </div>
                                          )}


                                        </div>);
                                    })}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regularize Modal */}
      {showRegularizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Regularize Attendance</h3>
              <button onClick={() => setShowRegularizeModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleRegularizeSubmit(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={regularizeForm.date}
                  onChange={(e) => setRegularizeForm({ ...regularizeForm, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={regularizeForm.type}
                  onChange={(e) => setRegularizeForm({ ...regularizeForm, type: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="both">Both</option>
                  <option value="checkIn">Check In</option>
                  <option value="checkOut">Check Out</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check In</label>
                <input
                  type="time"
                  value={regularizeForm.checkIn}
                  onChange={(e) => setRegularizeForm({ ...regularizeForm, checkIn: e.target.value })}
                  disabled={regularizeForm.type === "checkOut"}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check Out</label>
                <input
                  type="time"
                  value={regularizeForm.checkOut}
                  onChange={(e) => setRegularizeForm({ ...regularizeForm, checkOut: e.target.value })}
                  disabled={regularizeForm.type === "checkIn"}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Attendence Type Form */}
      {
        showAttendencetypeEditModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Attendence Type</h3>
                <button onClick={() => setShowAttendencetypeEditModel(prev => !prev)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={(e) => handleAttendenceTypeEdit(e)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={attendenceTypeDate}
                    // onChange={(e) => setAttendanceTypeDate({ ...regularizeForm, date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="mt-3 block text-sm font-medium text-gray-700">Request For</label>
                  <select
                    value={attendenceType}
                    onChange={(e) => setAttendanceType(e.target.value)}
                    className="mt-1 mb-5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Present">Present</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Reason *</label>
                  <textarea
                    name="reason"
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                  </textarea>
                </div>
                <div>
                  <button
                    type='submit'
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </DefaultLayout>
  )
}