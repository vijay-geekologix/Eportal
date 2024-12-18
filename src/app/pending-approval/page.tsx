"use client";
import { useEffect, useState } from "react";
import { CalendarIcon, Search, ChevronLeft, ChevronRight } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  getAllrequestsEditAttendenceType,
  getAllrequestLeave,
  getAllEmployeeDetailsRequest,
  putAllrequestsEditAttendenceType,
  putAllrequestsLeave,
  putAllEmployeeDetailsRequest,
} from "../api/Allapi";

export default function PendingApprovalList() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState<any>(localStorage.getItem("esslId"));
  const [requestAttendanceTypeData, setRequestAttendanceTypeData] = useState(
    [],
  );
  const [requestLeaveApplyData, setRequestLeaveApplyData] = useState([]);
  const [requestEmployeeDetailsData, setRequestEmployeeDetailsData] = useState(
    [],
  );
  const [requestType, setRequestType] = useState("all");
  const [requestStatus, setRequestStatus] = useState("pending");
  const [attendenceRequestSelectedRows, setAttendenceRequestSelectedRows] =
    useState<string[]>([]);
  const [leaveRequestSelectedRows, setLeaveRequestSelectedRows] = useState<
    string[]
  >([]);
  const [
    employeeDetailsRequestSelectedRows,
    setEmployeeDetailsRequestSelectedRows,
  ] = useState<{ rowId: string; informationType: string }[]>([]);

  useEffect(() => {
    fetchAttendenceTypeRequestData();
  }, []);

  const fetchAttendenceTypeRequestData = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      const date = new Date();
      const startDate2 = startDate != "" ? startDate : "2024-11-20";
      const endDate2 =
        endDate != ""
          ? endDate
          : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      if (requestType == "attendenceType") {
        setRequestEmployeeDetailsData([]);
        setRequestLeaveApplyData([]);
        const response = await getAllrequestsEditAttendenceType(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestAttendanceTypeData(response.data.data);
        console.log("sgsgdgs", response.data.data);
      } else if (requestType == "leaveApply") {
        setRequestEmployeeDetailsData([]);
        setRequestAttendanceTypeData([]);
        const response = await getAllrequestLeave(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestLeaveApplyData(response.data.data);
        console.log("sgsgdgs", response.data.data);
      } else if (requestType == "employeeDetails") {
        setRequestAttendanceTypeData([]);
        setRequestLeaveApplyData([]);
        const response = await getAllEmployeeDetailsRequest(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestEmployeeDetailsData(response.data.data);
        console.log("sgsgdgs", response.data.data);
      } else if (requestType == "regularize") {
        setRequestAttendanceTypeData([]);
        setRequestLeaveApplyData([]);
        setRequestEmployeeDetailsData([]);

        const response = await getAllrequestLeave(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestLeaveApplyData(response.data.data);
        console.log("sgsgdgs", response.data.data);
      } else {
        const response1 = await getAllrequestsEditAttendenceType(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestAttendanceTypeData(response1.data.data);

        const response2 = await getAllrequestLeave(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestLeaveApplyData(response2.data.data);

        const response3 = await getAllEmployeeDetailsRequest(
          startDate2,
          endDate2,
          requestType,
          requestStatus,
        );
        setRequestEmployeeDetailsData(response3.data.data);
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

  const handleLeaveRequestsCheckboxChange = (id: any) => {
    if (leaveRequestSelectedRows.includes(id)) {
      setLeaveRequestSelectedRows(
        leaveRequestSelectedRows.filter((rowId) => rowId !== id),
      );
    } else {
      setLeaveRequestSelectedRows([...leaveRequestSelectedRows, id]);
    }
  };

  const handleLeaveRequestsBtnClick = async (
    action: "approved" | "rejected",
  ) => {
    if (leaveRequestSelectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      const response = await putAllrequestsLeave(
        leaveRequestSelectedRows,
        action,
      );
      setLeaveRequestSelectedRows([]);
      fetchAttendenceTypeRequestData();
    }
  };

  const handleAttendenceTypeCheckboxChange = (id: string) => {
    if (attendenceRequestSelectedRows.includes(id)) {
      setAttendenceRequestSelectedRows(
        attendenceRequestSelectedRows.filter((rowId) => rowId !== id),
      );
    } else {
      setAttendenceRequestSelectedRows([...attendenceRequestSelectedRows, id]);
    }
  };

  const handleAttendenceRequestBtnClick = async (
    action: "approved" | "rejected",
  ) => {
    if (attendenceRequestSelectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      const response = await putAllrequestsEditAttendenceType(
        attendenceRequestSelectedRows,
        action,
      );
      setRequestAttendanceTypeData([]);
      fetchAttendenceTypeRequestData();
    }
  };

  const handleEmployeeDetailsCheckboxChange = (
    userId: string,
    esslId: string,
    rowId: string,
    type: string,
    newInfo: any,
  ) => {
    setEmployeeDetailsRequestSelectedRows((prev) => {
      // Check if the rowId and type already exist
      const exists = prev.some(
        (row) => row.rowId === rowId && row.informationType === type,
      );

      if (exists) {
        // Remove from selection if it already exists
        return prev.filter(
          (row) => !(row.rowId === rowId && row.informationType === type),
        );
      } else {
        // Add new selection
        return [
          ...prev,
          {
            userId,
            esslId,
            rowId,
            informationType: type,
            information: newInfo,
          },
        ];
      }
    });
  };

  const handleEmployeeDetailsRequestBtnClick = async (
    action: "approved" | "rejected",
  ) => {
    if (employeeDetailsRequestSelectedRows.length === 0) {
      alert("Please select at least one application.");
    } else {
      const response = await putAllEmployeeDetailsRequest(
        employeeDetailsRequestSelectedRows,
        action,
      );
      setRequestAttendanceTypeData([]);
      fetchAttendenceTypeRequestData();
    }
  };

  useEffect(() => {
    console.log("gjgjg", employeeDetailsRequestSelectedRows);
  }, [employeeDetailsRequestSelectedRows]);

  return (
    <DefaultLayout>
      <div className="max-w-10xl mx-auto px-4 md:px-6">
        <Breadcrumb pageName="Pending Approval List" />
        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          <div className="flex items-center justify-center p-4">
            <div className="container mx-auto space-y-8">
              {/* Filter Section */}
              <div className="space-y-4 rounded-lg bg-white p-4 shadow md:p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Filter
                  </h2>
                  <button
                    onClick={fetchAttendenceTypeRequestData}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Search className="mr-2 inline-block h-5 w-5" />
                    Apply
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Start Date */}
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700"
                      htmlFor="start_date"
                    >
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <CalendarIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700"
                      htmlFor="end_date"
                    >
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <CalendarIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>

                  {/* Department Select */}
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700"
                      htmlFor="requesttype"
                    >
                      Request Type
                    </label>
                    <select
                      id="requesttype"
                      className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="leaveApply">Leave</option>
                      <option value="attendenceType">Attendence Type</option>
                      employeeDetails
                      <option value="employeeDetails">Employee Details</option>
                      <option value="regularize">Regularize</option>
                    </select>
                  </div>

                  {/* Status Select */}
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium text-gray-700"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={requestStatus}
                      onChange={(e) => setRequestStatus(e.target.value)}
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
              <div className="overflow-hidden rounded-lg bg-white px-6 pb-6 shadow">
                <div className="flex items-center justify-between border-b p-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Leave Requests
                  </h2>
                  <div>
                    <button
                      onClick={() => handleLeaveRequestsBtnClick("approved")}
                      className="mr-2 rounded bg-indigo-600 px-3 py-1 font-semibold text-white hover:bg-indigo-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleLeaveRequestsBtnClick("rejected")}
                      className="rounded bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setLeaveRequestSelectedRows(
                                  requestLeaveApplyData.map(
                                    (item: any) => item._id,
                                  ),
                                );
                              } else {
                                setLeaveRequestSelectedRows([]);
                              }
                            }}
                            checked={
                              leaveRequestSelectedRows.length ===
                              requestLeaveApplyData.length
                            }
                          />
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Employee
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Request Type
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Start Date
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          End Date
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Total Days
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {requestLeaveApplyData.length > 0 ? (
                        requestLeaveApplyData.map((request: any) => (
                          <tr key={request._id}>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm font-medium text-gray-900">
                              <input
                                type="checkbox"
                                checked={leaveRequestSelectedRows.includes(
                                  request._id,
                                )}
                                onChange={() =>
                                  handleLeaveRequestsCheckboxChange(request._id)
                                }
                              />
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm font-medium text-gray-900">
                              {request.userName}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {request.requestType}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {request.fromDate}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {request.toDate.split("T")[0]}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {request.totalDays}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  request.requestStatus === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : request.requestStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
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
                          <td
                            colSpan={7}
                            className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No leave requests available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Attendence type Request */}
              <div className="mt-8 overflow-hidden rounded-lg bg-white px-6 pb-6 shadow">
                <div className="flex items-center justify-between border-b p-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Attendence Requests
                  </h2>
                  <div className="">
                    <button
                      className="mr-2 rounded bg-indigo-600 px-3 py-1 font-semibold text-white hover:bg-indigo-700"
                      onClick={() =>
                        handleAttendenceRequestBtnClick("approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className=" rounded bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-700"
                      onClick={() =>
                        handleAttendenceRequestBtnClick("rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAttendenceRequestSelectedRows(
                                  requestAttendanceTypeData.map(
                                    (item: any) => item._id,
                                  ),
                                );
                              } else {
                                setAttendenceRequestSelectedRows([]);
                              }
                            }}
                            checked={
                              attendenceRequestSelectedRows.length ===
                              requestAttendanceTypeData.length
                            }
                          />
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Employee
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Attendance Type
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Date
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Reason
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {requestAttendanceTypeData.length > 0 ? (
                        requestAttendanceTypeData.map((item: any) => (
                          <tr key={item._id}>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm">
                              <input
                                type="checkbox"
                                checked={attendenceRequestSelectedRows.includes(
                                  item._id,
                                )}
                                onChange={() =>
                                  handleAttendenceTypeCheckboxChange(item._id)
                                }
                              />
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm font-medium text-gray-900">
                              {item.userName}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {item.attendenceType}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {item.attendenceDate}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm text-gray-500">
                              {item.reason}
                            </td>
                            <td className="whitespace-nowrap border border-gray-300 px-6 py-4">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  item.requestStatus === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.requestStatus === "approved"
                                      ? "bg-green-100 text-green-800"
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
                          <td
                            colSpan={6}
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Employee Details Requests */}
              <div className="mt-8 overflow-hidden rounded-lg bg-white px-6 pb-6 shadow">
                <div className="flex items-center justify-between border-b p-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Change Requests
                  </h2>
                  <div>
                    <button
                      className="mr-2 rounded bg-indigo-600 px-3 py-1 font-semibold text-white hover:bg-indigo-700"
                      onClick={() =>
                        handleEmployeeDetailsRequestBtnClick("approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="rounded bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-700"
                      onClick={() =>
                        handleEmployeeDetailsRequestBtnClick("rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              e.target.checked
                                ? setEmployeeDetailsRequestSelectedRows(
                                    requestEmployeeDetailsData.flatMap(
                                      (request: any) =>
                                        request.information
                                          .filter((info: any) => info.newInfo)
                                          .map((info: any) => ({
                                            informationType: info.type,
                                            userId: request.userId,
                                            esslId: request.esslId,
                                            rowId: info._id,
                                            information: info.newInfo,
                                          })),
                                    ),
                                  )
                                : setEmployeeDetailsRequestSelectedRows([])
                            }
                          />
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          Name
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          Changes Type
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          Field Names
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          Old Changes
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          New Changes
                        </th>
                        <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {requestEmployeeDetailsData &&
                      requestEmployeeDetailsData.length > 0 ? (
                        requestEmployeeDetailsData.flatMap((request: any) =>
                          request.information
                            .filter(
                              (info: any) =>
                                info.oldInfo &&
                                Object.keys(info.oldInfo).length > 0 &&
                                info.newInfo &&
                                Object.keys(info.newInfo).length > 0,
                            )
                            .map((info: any, infoIndex: any) => (
                              <tr key={`${info._id}-${info.type}-${infoIndex}`}>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-4 text-sm">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleEmployeeDetailsCheckboxChange(
                                        request.userId,
                                        request.esslId,
                                        info._id,
                                        info.type,
                                        info.newInfo,
                                      )
                                    }
                                    checked={employeeDetailsRequestSelectedRows.some(
                                      (row) =>
                                        row.rowId === info._id &&
                                        row.informationType === info.type,
                                    )}
                                  />
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-900">
                                  {request.userName}
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-500">
                                  {info.type}
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-500">
                                  {Object.keys(info.newInfo).map(
                                    (key, index) => (
                                      <div key={index}>
                                        <span className="font-semibold">
                                          {key}:
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-500">
                                  {Object.keys(info.oldInfo).map(
                                    (key, index) => (
                                      <div key={index}>
                                        {info.oldInfo?.[key] || "-"}
                                      </div>
                                    ),
                                  )}
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-500">
                                  {Object.keys(info.newInfo).map(
                                    (key, index) => (
                                      <div key={index}>
                                        {info.newInfo?.[key] || "-"}
                                      </div>
                                    ),
                                  )}
                                </td>
                                <td className="whitespace-nowrap border border-gray-300 px-6 py-4">
                                  <span
                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                      info.requestStatus === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : info.requestStatus === "pending"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-600"
                                    }`}
                                  >
                                    {info.requestStatus}
                                  </span>
                                </td>
                              </tr>
                            )),
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
