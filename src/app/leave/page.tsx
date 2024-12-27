"use client";

import React, { useEffect, useState } from "react";
import { getAllrequestLeave } from "@/app/api/Allapi";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";
import { useUserDetailsContext } from "@/context/UserDetailsContext";
// const {userDetails, setUserDetails}:any = useUserDetailsContext(); 

const leaveTable = () => {
  const router = useRouter();
const {userDetails, setUserDetails}:any = useUserDetailsContext(); 
  const [data, setData] = useState([]);
  const [esslId, setEsslId] = useState<any>(userDetails?.esslId);

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllrequestLeave(
          undefined,
          undefined,
          undefined,
          undefined,
          esslId,
        );

        setData(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleApply = () => {
    router.push("/leave/applyleave");
  };

  // useEffect(()=>{
  //   alert(data);
  //   console.log('dataaa',data);
  // },[data])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="leaves" />

      <div className="max-w-10xl mx-auto px-4 md:px-6">
        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          {/* Records Table */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mx-auto max-w-full space-y-6">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-500">
                  Records Table
                </h2>
                <button
                  onClick={handleApply}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
                >
                  <a href="/leave/applyleave">Apply</a>
                </button>
              </div>

              {/* Table Wrapper with Vertical Scrolling */}
              <div className="max-w-full overflow-x-auto">
                <div className="max-h-100 overflow-y-auto">
                  {" "}
                  {/* Add Y-axis scrolling */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Apply Date",
                          "From Date",
                          "To Date",
                          "Total Days",
                          "Reason",
                          "Request Status",
                        ].map((header) => (
                          <th
                            key={header}
                            className="border px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.length > 0 ? (
                        data.map((item: any, index: any) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.applyDate || "N/A"}
                            </td>
                            {/* <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.forPeriod || "N/A"}
                    </td> */}
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.fromDate || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.toDate.split("T")[0] || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.totalDays || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.reason || "N/A"}
                            </td>
                            <td className="w-30 border px-7 py-4 text-gray-50">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  item.requestStatus === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.requestStatus === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-600"
                                }`}
                              >
                                {item.requestStatus || "N/A"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No records found.
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

        {/*Balance Recorde table*/}
        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mx-auto max-w-full space-y-6">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-500">
                  Balance Records
                </h2>
              </div>

              {/* Table with Vertical Scrolling */}
              <div className="max-w-full overflow-x-auto">
                <div className="max-h-100 overflow-y-auto">
                  {" "}
                  {/* Vertical scroll wrapper */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Month",
                          "Opening Balance",
                          "PL Balance",
                          "Consume",
                          "Closing Balance",
                        ].map((header) => (
                          <th
                            key={header}
                            className="border px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.length > 0 ? (
                        data.map((item: any, index: any) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.month || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.openingBalance || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.plBalance || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.consume || "N/A"}
                            </td>
                            <td className="whitespace-nowrap border px-6 py-4 text-sm text-gray-500">
                              {item.closingBalance || "N/A"}
                            </td>
                          </tr>
                          ))
                         ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No records found.
                          </td>
                        </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default leaveTable;
