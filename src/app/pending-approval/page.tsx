'use client'
import { useEffect, useState } from 'react'
import { CalendarIcon, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { getAllrequestsEditAttendenceType , getAllrequestLeave } from '../api/Allapi'

export default function PendingApprovalList() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState<any>((localStorage.getItem('esslId')));
  const [requestAttendanceTypeData,setRequestAttendanceTypeData] = useState([]);
  const [requestLeaveApplyData,setRequestLeaveApplyData] = useState([]);
  const [requestType , setRequestType] = useState('all');
  const [requestStatus , setRequestStatus] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState(new Set());

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
      
        const response1 = await getAllrequestsEditAttendenceType(startDate2, endDate2, requestType , requestStatus);
        setRequestAttendanceTypeData(response1.data.data);

        const response2 = await getAllrequestLeave(startDate2, endDate2, requestType , requestStatus);
        setRequestLeaveApplyData(response2.data.data);
      
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


  const handleCheckboxChange = (id) => {
    setSelectedRequests((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleBulkAction = (action) => {
    if (selectedRequests.size === 0) {
      alert('No requests selected.');
      return;
    }
    alert(`${action} action performed on selected requests.`);
  };

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleAttendenceTypeCheckboxChange = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleActionClick = (action: "approve" | "reject") => {
    if (selectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      alert(`${action === "approve" ? "Approved" : "Rejected"} applications for selected rows.`);
      // Perform approve/reject logic here
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
                    Search
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

    {/* Leave Requests Table */}
    {/* <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Request Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Total Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestLeaveApplyData.length > 0 ? (
              requestLeaveApplyData.map((request:any) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{request.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.requestType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.fromDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.toDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.totalDays}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.requestStatus === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.requestStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-300">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
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
    </div> */}

<div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Leave Requests</h2>
        <div>
          <button
            onClick={() => handleBulkAction('Approve')}
            className="mr-2 px-3 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleBulkAction('Reject')}
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
                <input type="checkbox" disabled />
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
              requestLeaveApplyData.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedRequests.has(request._id)}
                      onChange={() => handleCheckboxChange(request._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{request.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.requestType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.fromDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.toDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{request.totalDays}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.requestStatus === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
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

    {/* Attendence Type  Request */}
    {/* <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
      <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">Attendance Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestAttendanceTypeData.length > 0 ? (
              requestAttendanceTypeData.map((item:any) => (
                <tr key={item._id}>
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
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.requestStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-300">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
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
    </div> */}


<div className="bg-white shadow rounded-lg overflow-hidden mt-8">
   <div className="flex justify-between items-center p-6 border-b">
     <h2 className="text-2xl font-bold text-gray-800">Attendence Requests</h2>
      <div className="">
        <button
          className="mr-2 px-3 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          onClick={() => handleActionClick("approve")}
        >
          Approve
        </button>
        <button
          className="mr-2 px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
          onClick={() => handleActionClick("reject")}
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
                      setSelectedRows(requestAttendanceTypeData.map((item) => item._id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === requestAttendanceTypeData.length}
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
                      checked={selectedRows.includes(item._id)}
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
                          : "bg-green-100 text-green-800"
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
    </div>
   </div>
  </div>
 </div>
</DefaultLayout>
  )
}