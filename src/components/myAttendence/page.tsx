'use client'

import { useState } from "react"
import { ChevronRight, ChevronDown } from 'lucide-react'
import DataStatsOne from "@/components/DataStats/DataStatsOne"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

export default function AttendanceModule() {
  const [month, setMonth] = useState("November")
  const [year, setYear] = useState("2024")

  // const attendanceData = [
  //   {
  //     date: "01-Nov-24",
  //     day: "Fri",
  //     shiftCode: "HR",
  //     firstLogin: "",
  //     lastLogout: "",
  //     userType1: "PH",
  //     userType2: "---",
  //     portion: "1.00",
  //     totalHrs: "0.00",
  //     lateMark: "0.00",
  //     extraHours: "0.00",
  //     effExtra: "0.00",
  //   },
  //   {
  //     date: "02-Nov-24",
  //     day: "Sat",
  //     shiftCode: "HR",
  //     firstLogin: "",
  //     lastLogout: "",
  //     userType1: "WO",
  //     userType2: "---",
  //     portion: "1.00",
  //     totalHrs: "0.00",
  //     lateMark: "0.00",
  //     extraHours: "0.00",
  //     effExtra: "0.00",
  //   },
  //   {
  //     date: "03-Nov-24",
  //     day: "Sun",
  //     shiftCode: "HR",
  //     firstLogin: "",
  //     lastLogout: "",
  //     userType1: "WO",
  //     userType2: "---",
  //     portion: "1.00",
  //     totalHrs: "0.00",
  //     lateMark: "0.00",
  //     extraHours: "0.00",
  //     effExtra: "0.00",
  //   },
  //   {
  //     date: "04-Nov-24",
  //     day: "Mon",
  //     shiftCode: "HR",
  //     firstLogin: "2:58 PM",
  //     lastLogout: "6:00 PM",
  //     userType1: "DP",
  //     userType2: "---",
  //     portion: "1.00",
  //     totalHrs: "3.02",
  //     lateMark: "0.00",
  //     extraHours: "0.00",
  //     effExtra: "0.00",
  //   },
  //   {
  //     date: "05-Nov-24",
  //     day: "Tue",
  //     shiftCode: "HR",
  //     firstLogin: "3:04 PM",
  //     lastLogout: "6:05 PM",
  //     userType1: "DP",
  //     userType2: "---",
  //     portion: "1.00",
  //     totalHrs: "3.01",
  //     lateMark: "0.00",
  //     extraHours: "0.00",
  //     effExtra: "0.00",
  //   },
  // ]

  return (
    < >
      <DefaultLayout >
        <div className="mx-auto   max-w-10xl px-4 md:px-6">
          <Breadcrumb pageName="Attendance" />

          <div className=" w-full bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-full space-y-6">
              {/* Header */}
              <div className="flex items-center gap-2 text-xl text-gray-600">
                <span>Attendance</span>
                <ChevronRight className="h-5 w-5" />
                <span>My Attendance</span>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Notes Section */}
                {/* <div className="mb-6">
              <h2 className="mb-2 text-sm font-medium">Notes :</h2>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <span className="text-sm">Day Lock Entry</span>
              </div>
            </div> */}

                {/* Employee Details */}
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Employee : *</span>
                    <input
                      type="text"
                      value="Ruchika"
                      readOnly
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-md border px-3 py-1.5 bg-gray-100"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Employee Code :</span>
                    <span className="text-sm">123</span>
                  </div>
                </div>

                {/* Period Selection */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span className="text-sm">For The Period</span>
                  <div className="relative">
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="appearance-none bg-white border rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="appearance-none bg-white border rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="bg-indigo-400 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors">
                    Refresh
                  </button>
                  {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="archive"
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="archive" className="text-sm">
                  Get Report From Archive Data
                </label>
              </div> */}
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
                        {["Date", "Day", "Shift Code", "First Login", "Last Logout", "Attendence Type",  "Tot. Hrs.", "LateMark_Calc"].map((header) => (
                          <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendanceData.map((row) => (
                        <tr key={row.date}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.day}</td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Select Shift
                              </option>
                              <option value="shift1">Shift 1</option>
                              <option value="shift2">Shift 2</option>
                              <option value="shift3">Shift 3</option>
                            </select>
                          </td> */}

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.shiftCode}</td>  
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.firstLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastLogout}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.userType1 === "PH" && (
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
                            {row.userType1 === "DP" && <span>DP</span>}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.userType2}</td> */}
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.portion}</td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.totalHrs}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lateMark}</td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.extraHours}</td> */}
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.effExtra}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>

  )
}