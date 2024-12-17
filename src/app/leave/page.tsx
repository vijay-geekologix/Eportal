  'use client'

  import React, { useEffect, useState } from 'react';
  import {getAllrequestLeave} from '@/app/api/Allapi';
  import DefaultLayout from "@/components/Layouts/DefaultLaout"
  import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
  import { useRouter} from 'next/navigation';
  import { Link } from 'react-router-dom';
  const Table = () => {
    const router = useRouter();
    const [data, setData] = useState([]);

    // Fetch data from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getAllrequestLeave();
          console.log('luuuuuuu',result.data.data);
          
          setData(result.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);


    const handleApply = () => {
      router.push('/leave/applyleave');
    };

    // useEffect(()=>{
    //   alert(data);
    //   console.log('dataaa',data);
    // },[data])

    return (
    <DefaultLayout>
    <Breadcrumb pageName="leaves"/>
    
  <div className="mx-auto max-w-10xl px-4 md:px-6">
  <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
  {/* Records Table */}
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="mx-auto max-w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-500">Records Table</h2>
        <button
          onClick={handleApply}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
        >
          <a href="/leave/applyleave">Apply</a>
        </button>
      </div>

      {/* Table Wrapper with Vertical Scrolling */}
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-100 overflow-y-auto"> {/* Add Y-axis scrolling */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Apply Date",
                  "For Period",
                  "From Date",
                  "To Date",
                  "Total Days",
                  "Reason",
                  "Request Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((item: any, index: any) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.applyDate || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.forPeriod || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.fromDate || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.toDate.split("T")[0] || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.totalDays || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.reason || "N/A"}
                    </td>
                    <td className="border px-7 py-4 text-gray-50 w-30">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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

    



    {/* PL Records Table */}
    <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="mx-auto max-w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-500">Balance Records</h2>
      </div>

      {/* Table with Vertical Scrolling */}
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-100 overflow-y-auto"> {/* Vertical scroll wrapper */}
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
                    className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((item: any, index: any) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.month || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.openingBalance || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.plBalance || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.consume || "N/A"}
                    </td>
                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
    );
  };

  export default Table;
