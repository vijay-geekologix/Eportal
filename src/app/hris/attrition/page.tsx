'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useEffect, useState } from "react";
import { AttritionList } from "@/app/api/user";
import { useRouter } from "next/navigation";

const EmployeeTable = () => {
    const router= useRouter()
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const employeelist = async () => {
        const response = await AttritionList();
        console.log("res1", response)
        setEmployeeData(response.data)  
     
        
    };

    useEffect(() => {
        employeelist();
    }, []);

    // Pagination Logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = employeeData.slice(indexOfFirstRow, indexOfLastRow);

    // Total Pages
    const totalPages = Math.ceil(employeeData.length / rowsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <DefaultLayout>
        <div className="mx-auto max-w-10xl px-4 md:px-6">
            <Breadcrumb pageName="Attrition List" />
            <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">Attrition List</h1>
                        <div className="space-x-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => router.push('/hris/attrition/add-attrition')}>
                                Add Attrition
                            </button>
                            <button className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
    
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Sno</th>
                                    <th className="border px-4 py-2">Delete</th>
                                    <th className="border px-4 py-2">Employee Name</th>
                                    <th className="border px-4 py-2">Joining Date</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Resign Offer Date</th>
                                    <th className="border px-4 py-2">Reason of Leaving</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="border text-center py-4 text-gray-500">
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                               
                                    employeeData.map((employee: any, index: number) => (
                                        <tr key={employee.id} className="hover:bg-gray-50">
                                            <td className="border text-center">
                                                {(currentPage - 1) * rowsPerPage + index + 1}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <input type="checkbox" />
                                            </td>
                                            <td className="border px-4 py-2">{employee.employee_name}</td>
                                            <td className="border px-4 py-2">{employee.joining_date}</td>
                                            <td className="border px-4 py-2">{employee.email}</td>
                                            <td className="border px-4 py-2">{employee.resign_offer_date}</td>
                                            <td className="border px-4 py-2">{employee.reason_of_leaving}</td>
                                        </tr>
                                    ))
                                )}
                               
                            </tbody>
                        </table>
                    </div>
                    {     console.log("employeeData", employeeData)}
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
    
    );
};

export default EmployeeTable;
