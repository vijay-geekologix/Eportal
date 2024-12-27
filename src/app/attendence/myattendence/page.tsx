"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  X,
  Search,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  AttendenceList,
  WeekHolday,
  requestEditAttendenceType,
  postRegulariseRequest,
} from "@/app/api/Allapi";
import { toast } from "react-toastify";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserDetailsContext } from "@/context/UserDetailsContext";



export default function AttendanceModule() {
  const router = useRouter();
  const {userDetails, setUserDetails}:any = useUserDetailsContext(); 
  const [userName, setUserName] = useState(userDetails?.firstName + " " + userDetails?.lastName);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [userId, setUserId] = useState<any>(userDetails?.esslId);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("November");
  const [year, setYear] = useState("2024");
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [showAttendencetypeEditModel, setShowAttendencetypeEditModel] = useState(false);   
  const [attendenceTypeDate, setAttendanceTypeDate] = useState("");
  const [attendenceType, setAttendanceType] = useState("Present");
  const [attendanceTypeFieldId, setAttendanceTypeFieldId] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [AbsentCount, setAbsentCount] = useState<any>("");
  const [HalfDayCount, setHalfDayCount] = useState<any>("");
  const [PresentCount, setPresentCount] = useState<any>("");
  const [WorkingHours, setWorkingHours] = useState<any>("");
  const [oldSessionInfo, setOldSessionInfo] = useState<any>({});
  const [regularizeForm, setRegularizeForm] = useState({
    date: "",
    esslId: "",
    checkInId: "",
    checkOutId: "",
    checkInTime: "",
    checkOutTime: "",
    type: "both",
    reason: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [weekoOff, setWeekOff] = useState<any>();

  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  useEffect(() => {
    fetchAttendanceData();
    fetchWeekHolidaData();
  }, []);
  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Define default dates
      const date = new Date();
      const startDate2 = startDate !== "" ? startDate : "2024-11-20";
      const endDate2 =
        endDate !== ""
          ? endDate
          : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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

      // Process for missing dates (Fridays and Mondays logic)
      const dateMap = attendanceData.reduce((acc, record) => {
        acc[record.date] = record.day; // Assuming `record.date` and `record.day` exist
        return acc;
      }, {});

      const missingDateCount: any = Object.entries(dateMap).reduce(
        (count, [date, day]: any) => {
          if (day.toLowerCase() === "friday") {
            const fridayDate = new Date(date);
            const mondayDate = new Date(fridayDate);
            mondayDate.setDate(mondayDate.getDate() + 3); // Add 3 days to get Monday

            // Get all dates between Friday and Monday
            let currentDate = new Date(fridayDate);
            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < mondayDate) {
              const formattedDate = currentDate.toISOString().split("T")[0];
              if (!dateMap[formattedDate]) count++;
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
          return count;
        },
        0,
      );

      console.log("Missing Dates Count:", missingDateCount);
      setWeekOff(missingDateCount);
      // Initialize attendance counts and total working hours
      let absentCount = 0;
      let halfDayCount = 0;
      let presentCount = 0;
      let totalWorkingSeconds = 0; // To store total working seconds

      if (Array.isArray(attendanceData1)) {
        attendanceData1.forEach((record) => {
          if (Array.isArray(record.records)) {
            record.records.forEach((subRecord: any) => {
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
      // console.log("Absent Count:", absentCount);
      // console.log("Half Day Count:", halfDayCount);
      // console.log("Present Count:", presentCount);
      // console.log("Total Working Hours:", totalWorkingHours);
      // console.log("Remaining Seconds:", remainingSeconds);

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
      console.log("totalWorkingHours", totalWorkingHours);
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
      let totalCounts = {
        attendance: 0,
        isHoliday: 0,
        isWeekend: 0,
        isAbsent: 0,
      };
      response.data.weeklySummary.forEach((res: any) => {
        if (res.attendance) totalCounts.attendance++;
        if (res.isHoliday) totalCounts.isHoliday++;
        if (res.isWeekend) totalCounts.isWeekend++;
        if (res.isAbsent) totalCounts.isAbsent++;
      });
      setTotalCounts(totalCounts);
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

  const handleRequestRegularize = (
    date: string,
    checkIn: any,
    checkOut: any,
  ) => {

    setOldSessionInfo({
      date: date,
      esslId: checkIn.esslId,
      checkInId: checkIn._id,
      checkOutId: checkOut._id,
      checkInTime: checkIn.time,
      checkOutTime: checkOut.time,
      type: "both",
    });

    setRegularizeForm({
      date: date,
      esslId: checkIn.esslId,
      checkInId: checkIn._id,
      checkOutId: checkOut._id,
      checkInTime: checkIn.time,
      checkOutTime: checkOut.time,
      type: "both",
      reason: "",
    });
    setShowRegularizeModal(true);
  };

  const handleRequestRegularizeSubmit = async (event:any) => {
    // Here you would typically send this data to your backend
    try {
      const data = {
        userName: userName,
        applyDate: currentDate,
        oldSessionInfo:oldSessionInfo,
        newSessionInfo: regularizeForm,
      };
      const response = await postRegulariseRequest(data);
      if (response.statusCode === 200) {
        router.push("/attendence/myattendence");
        toast.success("Regularise Request sent successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during Request sent:", error);
      toast.error("An error occurred while Regularise Request sent, Please try again.", {
        position: "top-right",
      });
    } 
    setShowRegularizeModal(false);
  };

  const handleAttendenceTypeEdit = async (e: any) => {
    e.preventDefault();
    const response = await requestEditAttendenceType(
      userId,
      userName,
      attendenceTypeDate,
      attendenceType,
      attendanceTypeFieldId,
      requestReason,
    );
    setShowAttendencetypeEditModel((prev) => !prev);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //convert regularise Time into 24 hours format
  function convertTo24HourFormat(time: any) {
    const [hour, minute, seconds] = time.split(":");
    return `${hour}:${minute}:${seconds}`;
  }

  return (
    <DefaultLayout>
      <div className="max-w-10xl mx-auto px-4 md:px-6">
        <Breadcrumb pageName="Attendance" />

        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          <div className="mx-auto max-w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <span>Attendance</span>
              <ChevronRight className="h-5 w-5" />
              <span>My Attendance</span>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              {/* Filter Section */}
              <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    End Date
                  </label>
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
                    className="flex items-center rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-200" />
                  <span className="text-sm">ABS</span>
                  <span className="rounded border px-2 py-0.5 text-sm">
                    {AbsentCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-sm">PRE</span>
                  <span className="rounded border px-2 py-0.5 text-sm">
                    {PresentCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="text-sm">HF</span>
                  <span className="rounded border px-2 py-0.5 text-sm">
                    {HalfDayCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-sm">PH</span>
                  <span className="rounded border px-2 py-0.5 text-sm">
                    {totalCounts.isHoliday}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="text-sm">WO</span>
                  <span className="rounded border px-2 py-0.5 text-sm">
                    {weekoOff}
                  </span>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="max-w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Date",
                        "Day",
                        "First Login",
                        "Last Logout",
                        "Attendance Type",
                        "Tot. Hrs.",
                        "LateMark_Calc",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-4 text-center text-red-500"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((row: any) => (
                        <React.Fragment key={row._id}>
                          <tr className="hover:bg-gray-50">
                            <td
                              className="cursor-pointer whitespace-nowrap px-6 py-4 text-sm text-blue-600"
                              onClick={() => toggleSessionDetails(row.date)}
                            >
                              {row.date}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {row.day}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {row.records[0].time}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {row.records[row.records.length - 1].time}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                {(() => {
                                  const workingHour =
                                    row.records[row.records.length - 1]
                                      ?.workingHour;
                                  if (!workingHour) return "No Data";

                                  return row.records[row.records.length - 1]
                                    .attendenceType == "Present" ? (
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                      Present
                                    </span>
                                  ) : row.records[row.records.length - 1]
                                      .attendenceType == "Half Day" ? (
                                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                      Half Day
                                    </span>
                                  ) : (
                                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                      Absent
                                    </span>
                                  );
                                })()}
                                <button
                                  onClick={(e) => {
                                    setAttendanceTypeDate(row.date);
                                    setAttendanceTypeFieldId(row._id);
                                    setShowAttendencetypeEditModel(
                                      (prev) => !prev,
                                    );
                                  }}
                                  className="ml-2 rounded-full bg-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-300"
                                  title="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-3 w-3"
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
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {row.records[row.records.length - 1].workingHour}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {row.lateMark}
                            </td>
                          </tr>
                          {expandedDate === row.date && (
                            <tr>
                              <td colSpan={7}>
                                <div className="bg-gray-50 px-6 py-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <h4 className="font-semibold">
                                      Session Details
                                    </h4>
                                  </div>
                                  <div className="space-y-2">
                                    {row.records?.map(
                                      (_res: any, index: any) => {
                                        if (index % 2 !== 0) return null;
                                        const session1 = row.records[index];
                                        const session2 = row.records[index + 1];
                                        return (
                                          <div
                                            key={index}
                                            className="grid grid-cols-1 gap-4 rounded-md bg-white p-3 shadow-sm sm:grid-cols-2 md:grid-cols-4"
                                          >
                                            <div>
                                              <p className="text-sm font-medium">
                                                Check In:
                                              </p>
                                              <p className="text-sm">
                                                {session1?.time || "N/A"}
                                              </p>
                                            </div>
                                            {session2 && (
                                              <div>
                                                <p className="text-sm font-medium">
                                                  Check Out:
                                                </p>
                                                <p className="text-sm">
                                                  {session2?.time || "N/A"}
                                                </p>
                                              </div>
                                            )}
                                            {session2 && (
                                              <div>
                                                <p className="text-sm font-medium">
                                                  Total Work:
                                                </p>
                                                <p className="text-sm">
                                                  {session2?.workingHour ||
                                                    "N/A"}
                                                </p>
                                              </div>
                                            )}
                                            {session2 && (
                                              <div>
                                                <button
                                                  onClick={() =>
                                                    handleRequestRegularize(
                                                      row.date,
                                                      session1,
                                                      session2,
                                                    )
                                                  }
                                                  className="rounded-md bg-indigo-500 px-3 py-1 text-xs text-white transition-colors hover:bg-indigo-600"
                                                >
                                                  Regularize
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      },
                                    )}
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
              {/* Pagination */}
              {/* <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, attendanceData.length)}</span> of{' '}
                    <span className="font-medium">{attendanceData.length}</span> results
                  </span>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: Math.ceil(attendanceData.length / itemsPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(attendanceData.length / itemsPerPage)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div> */}

              <div className="mt-4 flex flex-col items-center justify-between sm:flex-row">
                {/* Previous Button */}
                <div className="mb-2 flex w-full justify-start sm:mb-0 sm:w-auto">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-all duration-200 sm:w-auto 
        ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
                  >
                    Previous
                  </button>
                </div>

                {/* Next Button */}
                <div className="flex w-full justify-end sm:w-auto">
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(attendanceData.length / itemsPerPage)
                    }
                    className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-all duration-200 sm:w-auto 
        ${
          currentPage === Math.ceil(attendanceData.length / itemsPerPage)
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regularize Modal */}
      {showRegularizeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Regularize Attendance</h3>
              <button
                onClick={() => setShowRegularizeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestRegularizeSubmit(e);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={regularizeForm.date}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      date: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={regularizeForm.type}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      type: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="both">Both</option>
                  <option value="checkIn">Check In</option>
                  <option value="checkOut">Check Out</option>
                </select>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check In
                </label>
                <input
                  type="time"
                  value={regularizeForm.checkInTime}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      checkInTime: e.target.value,
                    })
                  }
                  disabled={regularizeForm.type === "checkOut"}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check Out
                </label>
                <input
                  type="time"
                  value={regularizeForm.checkOutTime}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      checkOutTime: e.target.value,
                    })
                  }
                  disabled={regularizeForm.type === "checkIn"}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check In
                </label>
                <input
                  type="time"
                  value={regularizeForm.checkInTime}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      checkInTime: convertTo24HourFormat(e.target.value),
                    })
                  }
                  disabled={regularizeForm.type === "checkOut"}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check Out
                </label>
                <input
                  type="time"
                  value={regularizeForm.checkOutTime}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      checkOutTime: convertTo24HourFormat(e.target.value),
                    })
                  }
                  disabled={regularizeForm.type === "checkIn"}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Reason *
                </label>
                <textarea
                  name="reason"
                  value={regularizeForm.reason}
                  onChange={(e) =>
                    setRegularizeForm({
                      ...regularizeForm,
                      reason: e.target.value,
                    })
                  }
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Attendence Type Form */}
      {showAttendencetypeEditModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Attendence Type</h3>
              <button
                onClick={() => setShowAttendencetypeEditModel((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => handleAttendenceTypeEdit(e)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={attendenceTypeDate}
                  // onChange={(e) => setAttendanceTypeDate({ ...regularizeForm, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="mt-3 block text-sm font-medium text-gray-700">
                  Request For
                </label>
                <select
                  value={attendenceType}
                  onChange={(e) => setAttendanceType(e.target.value)}
                  className="mb-5 mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Present">Present</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Reason *
                </label>
                <textarea
                  name="reason"
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
