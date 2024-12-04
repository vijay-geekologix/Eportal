'use client'
import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, X, Search } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { AttendenceList, EmployeeList } from "@/app/api/Allapi"
import { toast } from "react-toastify"
export default function AttendanceModule() {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [employeeData , setEmployeeData] = useState([]);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("November")
  const [year, setYear] = useState("2024")
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [regularizeForm, setRegularizeForm] = useState({
    date: "",
    checkIn: "",
    checkOut: "",
    type: "both"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(()=>{
    const fetchEmployeeData = async()=>{
     try{
       const response = await EmployeeList();
       console.log('dggd',response);
       setEmployeeData(response.data);
     }catch(err){
      console.error("Error Employee Data data:", err);
      setError("No data found");
      toast.error("Failed to fetch Employee Name and ID. Please try again.");
     } 
    }
    fetchEmployeeData();
  },[]);

  
  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AttendenceList(userId, startDate, endDate);
      setAttendanceData(response.data.result);
      console.log('attendance ',response.data.result);
      if (response.data.result.length === 0) {
        setError("No data found");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("No data found");
      toast.error("Failed to fetch attendance data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('employeeData',employeeData);
    fetchAttendanceData();
  }, [employeeData]);

  const handleFilter = () => {
    fetchAttendanceData();
  };

  const toggleSessionDetails = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const handleRegularize = (date: string) => {
    setRegularizeForm({
      date,
      checkIn: "09:00",
      checkOut: "18:00",
      type: "both"
    });
    setShowRegularizeModal(true);
  };

  const handleRegularizeSubmit = () => {
    // Here you would typically send this data to your backend
    console.log("Regularize form submitted:", regularizeForm);
    setShowRegularizeModal(false);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-10xl px-4 md:px-6">
        <Breadcrumb pageName="Attendance" />

        <div className="w-full bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 text-xl text-gray-600">
              <span>Attendance</span>
              <ChevronRight className="h-5 w-5" />
              <span>View Attendance</span>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Filter Section */}
              <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                  <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select Employee</option>
                    {employeeData.map((user) => (
                      <option key={user._id} value={user.esslId}>
                       {user.firstName}
                      </option>
                    ))}
                  </select>

                </div>
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
                  <span className="rounded border px-2 py-0.5 text-sm">8</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">DP</span>
                  <span className="rounded border px-2 py-0.5 text-sm">9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-sm">PH</span>
                  <span className="rounded border px-2 py-0.5 text-sm">1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="text-sm">WO</span>
                  <span className="rounded border px-2 py-0.5 text-sm">7</span>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto max-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Date", "Day", "First Login", "Last Logout", "Attendance Type", "Tot. Hrs.", "LateMark_Calc", "Regularize"].map((header) => (
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
                      attendanceData.map((row) => (
                        <>
                          <tr key={row.date}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer" onClick={() => toggleSessionDetails(row.date)}>
                              {row.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.day}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[0].time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[row.records.length-1].time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {/* {row.userType1 === "PH" && (
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                                  <span>PH</span>
                                </div>
                              )}
                              {row.userType1 === "WO" && (
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                                  <span>WO</span>
                                </div>
                              )}
                              {row.userType1 === "DP" && <span>DP</span>} */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records[row.records.length-1].time - row.records[0].time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lateMark}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => handleRegularize(row.date)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition-colors text-xs"
                              >
                                Regularize
                              </button>
                            </td>
                          </tr>
                          {expandedDate === attendanceData[0].date && (
                            <tr>
                              <td colSpan={8}>
                                <div className="px-6 py-4 bg-gray-50">
                                  <h4 className="font-semibold mb-2">Session Details</h4>
                                  <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {attendanceData.map((row: any, index: number) => (
                                      <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                                        <p className="font-medium">Session{index + 1}</p>
                                        <p>Check In: {row.records[0].time || 'N/A'}</p>
                                        <p>Check Out: {row.records[row.records.length-1].time || 'N/A'}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
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
                  onChange={(e) => setRegularizeForm({...regularizeForm, date: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={regularizeForm.type}
                  onChange={(e) => setRegularizeForm({...regularizeForm, type: e.target.value})}
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
                  onChange={(e) => setRegularizeForm({...regularizeForm, checkIn: e.target.value})}
                  disabled={regularizeForm.type === "checkOut"}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check Out</label>
                <input
                  type="time"
                  value={regularizeForm.checkOut}
                  onChange={(e) => setRegularizeForm({...regularizeForm, checkOut: e.target.value})}
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
    </DefaultLayout>
  )
}