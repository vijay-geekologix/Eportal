"use client";

import React, { useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLeaveBalanceRecords, postRequestLeave } from "@/app/api/Allapi";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

function LeaveForm() {
  const router = useRouter();
  const { userDetails, setUserDetails }: any = useUserDetailsContext();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const monthsArr =  [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];
  const month = monthsArr[date.getMonth()+1];
  const [formData, setFormData] = useState({
    userId: userDetails?._id,
    userName: userDetails?.firstName + " " + userDetails?.lastName,
    esslId: userDetails?.esslId,
    applyDate: currentDate,
    forPeriod: "",
    fromDate: "",
    toDate: "",
    startDay: "",
    lastDay: "",
    reason: "",
    totalDays: "",
    attachDocument: "",
  });
  const [totalDays, setTotalDays] = useState();
  const [leaveBalanceRecordsData,setLeaveBalanceRecordsData] = useState([]);
 const [currentOpeningBalance ,setcurrentOpeningBalance] = useState('');
 const [currentClosingBalance ,setcurrentClosingBalance] = useState('');

  useEffect(()=>{
   (async()=>{
    const response = await getLeaveBalanceRecords(userDetails._id,date.getFullYear());
    setLeaveBalanceRecordsData(response.data.data.monthlyRecords);
    setcurrentOpeningBalance(response.data.data.monthlyRecords[monthsArr[date.getMonth()]].openingBalance);
    setcurrentClosingBalance(response.data.data.monthlyRecords[monthsArr[date.getMonth()]].closingBalance);
   })()
  },[])



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, attachDocument: e.target.files[0] });
  };
  // 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
    const response = await postRequestLeave(formData);
  };

  const handleTotalDays = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTotalDays(e.target.value);
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="leaves > apply" />

        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          {/* Leave Application Form */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mx-auto max-w-full space-y-6">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-500">
                  Leave Application
                </h2>
                <div className="text-gray-500">
                  Opening Balance: <span className="font-semibold">{currentOpeningBalance}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" method="post">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-medium">App. Date</label>
                    <input
                      type="text"
                      value={currentDate}
                      readOnly
                      name="applyDate"
                      className="w-full rounded border bg-gray-200 p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">For Period</label>
                    <input
                      type="text"
                      value="April, 2024 - March, 2025"
                      readOnly
                      name="forPeriod"
                      className="w-full rounded border bg-gray-200 p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-medium">
                      From Date *
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">To Date *</label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-medium">Start Day</label>
                    <input
                      type="text"
                      value="Full"
                      readOnly
                      name="startDay"
                      className="w-full rounded border bg-gray-200 p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">Last Day</label>
                    <input
                      type="text"
                      value="Full"
                      readOnly
                      name="lastDay"
                      className="w-full rounded border bg-gray-200 p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-medium">Total Days</label>
                    <input
                      type="number"
                      value={totalDays}
                      required
                      onChange={handleTotalDays}
                      name="totalDays"
                      className="w-full rounded border p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">
                      Attach Document
                    </label>
                    <input
                      type="file"
                      name="attachDocument"
                      onChange={handleFileChange}
                      className="w-full rounded border p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block font-medium">Reason *</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded border p-2"
                  ></textarea>
                </div>

                <div className="text-gray-500">
                  CO Balance As On Date {`${date.getDate()}-${monthsArr[date.getMonth()]}-${date.getFullYear()}`} :
                  <span className="font-semibold"> {currentClosingBalance}</span>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => router.push("/dashboard")}
                    type="button"
                    className="rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default LeaveForm;
