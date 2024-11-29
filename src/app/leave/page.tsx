// 'use client'

// import React, { useEffect } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLaout"
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {CreateLeave} from '@/app/api/user'

// function LeaveForm(){
//   const router = useRouter();
//   const date = new Date;
//   const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
//   const [formData, setFormData] = useState({
//     applyDate:currentDate,
//     forPeriod:'',
//     fromDate: "",
//     toDate: "",
//     startDay:'',
//     lastDay:'',
//     reason: "",
//     totalDays:'',
//     attachDocument: '',
//   });
//   const [totalDays,setTotalDays] = useState(0);
   
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     // const { name, value } = e.target;
//     setFormData({ ...formData, attachDocument: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     router.push('/dashboard');
//     const response = await CreateLeave(formData);
//     console.log('helllllllo',formData , "naaa" , response);
//   };

//   const handleTotalDays = (e) =>{
//     const { name, value } = e.target;
//     setFormData({...formData,[name]:value});
//     setTotalDays(e.target.value); 
//   }

//   return (
//   <>
//     <DefaultLayout >
//      <Breadcrumb pageName="leaves" />
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md" method="post">
//       <div className="flex justify-between">
//         <div className="text-xl font-bold mb-4">Leave Application</div>
//         <div className="">Opening Balance : {`10`} </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

//         <div>
//           <label className="block font-medium mb-1">App. Date</label>
//           <input
            
//             type="text"
//             value={currentDate}
//             readOnly
//             name="applyDate"
//             className="w-full p-1 border rounded bg-gray-200"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">For Period</label>
//           <input
//             type="text"
//             value="April, 2024 - March, 2025"
//             readOnly
//             name="forPeriod"
//             className="w-full p-1 border rounded bg-gray-200"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block font-medium mb-1">From Date *</label>
//           <input
//             type="date"
//             name="fromDate"
//             value={formData.fromDate}
//             onChange={handleInputChange}
//             required
//             className="w-full p-1 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">To Date *</label>
//           <input
//             type="date"
//             name="toDate"
//             value={formData.toDate}
//             onChange={handleInputChange}
//             required
//             className="w-full p-1 border rounded"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block font-medium mb-1">Start Day</label>
//           <input
//             type="text"
//             value="Full"
//             readOnly
//             name="startDay"
//             className="w-full p-1 border rounded bg-gray-200"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Last Day</label>
//           <input
//             type="text"
//             value="Full"
//             readOnly
//             name="lastDay"
//             className="w-full p-1 border rounded bg-gray-200"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div className="">
//          <label className="block font-medium mb-1">Total Days</label>
//          <input
//            type="number"
//            value={totalDays}
//            required
//            onChange={handleTotalDays}
//            name="totalDays"
//            className="w-full p-1 border rounded"
//          />
//         </div>
//          <div className="">
//          <label className="block font-medium mb-1">Attach Document</label>
//          <input
//           type="file"
//           name="attachDocument"
//           onChange={handleFileChange}
//           className="w-full p-1 border rounded"
//         />
//       </div>
//       </div>

//       <div className="mb-4">
//         <label className="block font-medium mb-1">Reason *</label>
//         <textarea
//           name="reason"
//           value={formData.reason}
//           onChange={handleInputChange}
//           required
//           className="w-full p-1 border rounded"
//         ></textarea>
//       </div>

//       <div className="mb-4">
//           CO Balance As On Date 27-Nov-2024 :  
//           <span>10</span>
//       </div>

//       <div className="">

//         <button onClick={()=>router.push('/dashboard')}
//           type="button"
//           className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 mr-4"
//           >
//           Cancel
//         </button>
//         <button
//           // onClick={()=>handleSubmit}
//           type="submit"
//           className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//           >
//           Submit
//         </button>
//       </div>
//     </form>
//     </DefaultLayout >
//   </>
//   );
// };

// export default LeaveForm;

'use client'
import React, { useEffect, useState } from 'react';
import {getLeaveData} from '@/app/api/user';
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
        const result = await getLeaveData();
        setData(result.data);
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          <a href='/leave/applyleave'>Apply</a>
        </button>
        <h2 className="text-lg font-semibold">Records Table</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Apply Date</th>
              <th className="border border-gray-300 px-4 py-2">For Period</th>
              <th className="border border-gray-300 px-4 py-2">From Date</th>
              <th className="border border-gray-300 px-4 py-2">To Date</th>
              <th className="border border-gray-300 px-4 py-2">Start Day</th>
              <th className="border border-gray-300 px-4 py-2">Last Day</th>
              <th className="border border-gray-300 px-4 py-2">Reason</th>
              <th className="border border-gray-300 px-4 py-2">Total Days</th>
              <th className="border border-gray-300 px-4 py-2">Attach Document</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.applyDate || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.forPeriod || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.fromDate || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.toDate || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.startDay || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.lastDay || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.reason || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.totalDays || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.attachDocument ? (
                      <a
                        href={item.attachDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout> 
  );
};

export default Table;
