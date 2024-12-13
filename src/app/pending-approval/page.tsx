'use client'
import { useEffect, useState } from 'react'
import { CalendarIcon, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { getAllrequestsEditAttendenceType , getAllrequestLeave , putAllrequestsEditAttendenceType , putAllrequestsLeave } from '../api/Allapi'

export default function PendingApprovalList() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState<any>((localStorage.getItem('esslId')));
  const [requestAttendanceTypeData,setRequestAttendanceTypeData] = useState([]);
  const [requestLeaveApplyData,setRequestLeaveApplyData] = useState([]);
  const [requestType , setRequestType] = useState('all');
  const [requestStatus , setRequestStatus] = useState('pending');
  // const [selectedRequests, setSelectedRequests] = useState(new Set());
  const [attendenceRequestSelectedRows, setAttendenceRequestSelectedRows] = useState<string[]>([]);
  const [leaveRequestSelectedRows, setLeaveRequestSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    fetchAttendenceTypeRequestData();
  }, []);

  const fetchAttendenceTypeRequestData = async () => {
    // setIsLoading(true);
    // setError(null);
    try {

      const date = new Date();
      const startDate2 = startDate != '' ? startDate : '2024-11-20';
      const endDate2 = endDate != '' ? endDate : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      
      if(requestType == 'attendenceType'){
        setRequestLeaveApplyData([]);
        const response = await getAllrequestsEditAttendenceType(startDate2, endDate2, requestType , requestStatus);
        setRequestAttendanceTypeData(response.data.data);
        console.log('sgsgdgs', response.data.data);

      }else if(requestType == 'leaveApply'){
        
        setRequestAttendanceTypeData([]);
        const response = await getAllrequestLeave(startDate2, endDate2, requestType , requestStatus);
        setRequestLeaveApplyData(response.data.data);
        console.log('sgsgdgs', response.data.data);
      
      }else{
        
        const response2 = await getAllrequestLeave(startDate2, endDate2, requestType , requestStatus);
        setRequestLeaveApplyData(response2.data.data);

        const response1 = await getAllrequestsEditAttendenceType(startDate2, endDate2, requestType , requestStatus);
        setRequestAttendanceTypeData(response1.data.data);
      
      }
      // if (response.data.result.length === 0) {
      //   // setError("No data found");
      // }
      
    } catch (error) {
      console.log("Error fetching attendance data:", error);
      // setError("No data found");
      // toast.error("Failed to fetch attendance data. Please try again.");
    } finally {
      // setIsLoading(false);
    }
  };


  const handleLeaveRequestsCheckboxChange = (id:any) => {
    if (leaveRequestSelectedRows.includes(id)) {
      setLeaveRequestSelectedRows(leaveRequestSelectedRows.filter((rowId) => rowId !== id));
    } else {
      setLeaveRequestSelectedRows([...leaveRequestSelectedRows, id]);
    }
  };

  const handleLeaveRequestsBtnClick = async (action:"approved" | "rejected") => {
    if (leaveRequestSelectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      const response = await putAllrequestsLeave(leaveRequestSelectedRows,action);
      setLeaveRequestSelectedRows([]);
      fetchAttendenceTypeRequestData();
    }
  };


  const handleAttendenceTypeCheckboxChange = (id: string) => {
    if (attendenceRequestSelectedRows.includes(id)) {
      setAttendenceRequestSelectedRows(attendenceRequestSelectedRows.filter((rowId) => rowId !== id));
    } else {
      setAttendenceRequestSelectedRows([...attendenceRequestSelectedRows, id]);
    }
  };

  const handleAttendenceRequestBtnClick = async (action: "approved" | "rejected") => {
    if (attendenceRequestSelectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      const response = await putAllrequestsEditAttendenceType(attendenceRequestSelectedRows,action);
      setRequestAttendanceTypeData([]);
      fetchAttendenceTypeRequestData();
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-10xl px-4 md:px-6">
        <Breadcrumb pageName="Pending Approval List" />
        <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
          <div className="flex items-center justify-center p-4">
            <div className="container mx-auto space-y-8">
              {/* Filter Section */}
              <div className="bg-white shadow rounded-lg p-4 md:p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
                  <button onClick={fetchAttendenceTypeRequestData} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <Search className="inline-block mr-2 h-5 w-5" />
                    Apply
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="start_date">
                      Start Date
                    </label>
                    <div className="relative">
                      <input 
                        type="date" 
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  
                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="end_date">
                      End Date
                    </label>
                    <div className="relative">
                      <input 
                        type="date" 
                        id="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Department Select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="requesttype">
                      Request Type
                    </label>
                    <select 
                      id="requesttype"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={requestType}
                      onChange={(e)=>setRequestType(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="leaveApply">Leave</option>
                      <option value="attendenceType">Attendence Type</option>
                    </select>
                  </div>

                  {/* Status Select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
                      Status
                    </label>
                    <select 
                      id="status" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={requestStatus}
                      onChange={(e)=>setRequestStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
{/* Leave Apply Request */}
    <div className="bg-white shadow rounded-lg overflow-hidden px-6 pb-6">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Leave Requests</h2>
        <div>
          <button
            onClick={() => handleLeaveRequestsBtnClick("approved")}
            className="mr-2 px-3 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleLeaveRequestsBtnClick('rejected')}
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <input type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setLeaveRequestSelectedRows(requestLeaveApplyData.map((item:any) => item._id));
                                    } else {
                                      setLeaveRequestSelectedRows([]);
                                    }
                                  }}
                                  checked={leaveRequestSelectedRows.length === requestLeaveApplyData.length}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Request Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Total Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestLeaveApplyData.length > 0 ? (
              requestLeaveApplyData.map((request:any) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                    <input
                      type="checkbox"
                      checked={leaveRequestSelectedRows.includes(request._id)}
                      onChange={() => handleLeaveRequestsCheckboxChange(request._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{request.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.requestType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.fromDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.toDate.split('T')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.totalDays}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.requestStatus === 'approved'
                          ? 'bg-green-100 text-green-800'
                          :  request.requestStatus === "pending" ?  "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-600"  
                      }`}
                    >
                      {request.requestStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No leave requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

{/* Attendence type Request */}
<div className="bg-white shadow rounded-lg overflow-hidden mt-8 px-6 pb-6">
   <div className="flex justify-between items-center p-6 border-b">
     <h2 className="text-xl font-bold text-gray-800">Attendence Requests</h2>
      <div className="">
        <button
          className="mr-2 px-3 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          onClick={() => handleAttendenceRequestBtnClick("approved")}
        >
          Approve
        </button>
        <button
          className=" px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
          onClick={() => handleAttendenceRequestBtnClick("rejected")}
        >
          Reject
        </button>
      </div>
    </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAttendenceRequestSelectedRows(requestAttendanceTypeData.map((item:any) => item._id));
                    } else {
                      setAttendenceRequestSelectedRows([]);
                    }
                  }}
                  checked={attendenceRequestSelectedRows.length === requestAttendanceTypeData.length}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Attendance Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestAttendanceTypeData.length > 0 ? (
              requestAttendanceTypeData.map((item: any) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm border border-gray-300">
                    <input
                      type="checkbox"
                      checked={attendenceRequestSelectedRows.includes(item._id)}
                      onChange={() => handleAttendenceTypeCheckboxChange(item._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                    {item.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {item.attendenceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {item.attendenceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.requestStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.requestStatus === "approved" ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-600"  
                      }`}
                    >
                      {item.requestStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     </div>

     {/* Employee Details Requests */}

     
    </div>
   </div>
  </div>
 </div>
</DefaultLayout>
  )
}