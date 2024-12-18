'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useEffect, useState } from "react";
import { AttritionList, DeleteAttrition } from "@/app/api/Allapi";
import { useRouter } from "next/navigation";

const EmployeeTable = () => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<any>([]);
    const router = useRouter()
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const employeelist = async () => {
        const response = await AttritionList();
        console.log("res1", response);
        const activeEmployees = response.data.filter((employee: any) => employee.isActive === true);
        setEmployeeData(activeEmployees);
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
    // Handle Checkbox Change
    const handleCheckboxChange = (id: number) => {
        setSelectedEmployeeIds((prevSelected: any) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((selectedId: any) => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };
    const handleDeleteSelected = async () => {
        if (selectedEmployeeIds.length === 0) {
            alert("No employees selected!");
            return;
        }
        console.log("eele", selectedEmployeeIds)
        try {
            const data = { "_id": selectedEmployeeIds }
            console.log('dfafaf',data)
            const response = await DeleteAttrition(data);
            console.log("Deleted IDs:", selectedEmployeeIds);
            employeelist();
            setSelectedEmployeeIds([]);
            alert("Selected employees deleted successfully!");
        } catch (error) {
            console.error("Error deleting employees:", error);
            alert("Failed to delete selected employees.");
        }
    };

    // dynamic routing
    const handleUserNameClick = (employeeId: any, employeeName: any) => {
        router.push(`/hris/attrition/add-attrition/${employeeId}/${employeeName}`)
    }
    useEffect(() => {
        console.log('employeedate', employeeData)
    }, [employeeData])
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-10xl px-4 md:px-6">
                <Breadcrumb pageName="Attrition List" />
                <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {/* <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">Attrition List</h1>
                            <div className="space-x-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => router.push('/hris/attrition/add-attrition')}>
                                    Add Attrition
                                </button>
                                <button className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"  onClick={handleDeleteSelected}>
                                    Delete
                                </button>
                            </div>
                        </div> */}
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                            <h1 className="text-lg sm:text-xl font-bold">Employee List</h1>
                            <div className="flex flex-wrap space-x-2">
                                <button
                                    className="px-3 py-1 sm:px-4 sm:py-2  bg-indigo-600 text-white text-xs sm:text-sm md:text-base rounded hover:bg-blue-600 transition-all"
                                    onClick={() => router.push('/hris/attrition/add-attrition')}
                                >
                                    Add Attrition
                                </button>

                                <button
                                    className="px-3 py-1 sm:px-4 sm:py-2  bg-red-600 text-white  text-xs sm:text-sm md:text-base rounded hover:bg-red-600 transition-all"
                                    onClick={handleDeleteSelected}
                                >
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                        {/* <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">Sno</th>
                                        <th className="border px-4 py-2">Select</th>
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
                                            <td colSpan={7} className="border text-center py-4 text-gray-500">
                                                No data available! Please check back later.
                                            </td>

                                        </tr>
                                    ) : (

                                        employeeData.map((employee: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border text-center">
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(employee._id)}
                                                    />
                                                </td>
                                                {console.log('heyeyeeyyee',employee._id)}
                                                <td className="border px-4 py-2 underline text-blue-500 hover:text-blue-700" onClick={()=>handleUserNameClick(employee._id ,employee.employee_name)}>{employee.employee_name}</td>
                                                <td className="border px-4 py-2">{employee.joining_date}</td>
                                                <td className="border px-4 py-2">{employee.email}</td>
                                                <td className="border px-4 py-2">{employee.resign_offer_date}</td>
                                                <td className="border px-4 py-2">{employee.reason_of_leaving}</td>
                                            </tr>
                                        ))
                                    )}

                                </tbody>
                            </table>
                        </div> */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Sno</th>
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Select</th>
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Employee Name</th>
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Joining Date</th>
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Resign Offer Date</th>
                                        <th className="border px-2 py-1 text-xs sm:text-sm">Reason of Leaving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRows.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="border text-center py-4 text-gray-500 text-xs sm:text-sm">
                                                No data available! Please check back later.
                                            </td>
                                        </tr>
                                    ) : (
                                        employeeData.map((employee: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border text-center text-xs sm:text-sm">
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(employee._id)}
                                                    />
                                                </td>
                                                <td className="border px-4 py-2 underline text-xs sm:text-sm text-blue-500 hover:text-blue-700" onClick={() => handleUserNameClick(employee._id, employee.employee_name)}>
                                                    {employee.employee_name}
                                                </td>
                                                <td className="border px-2 py-1 text-xs sm:text-sm">{new Date(employee.joining_date).toLocaleDateString('en-CA')}
                                                </td>
                                                <td className="border px-2 py-1 text-xs sm:text-sm">{new Date(employee.resign_offer_date).toLocaleDateString('en-CA')}</td>
                                                <td className="border px-2 py-1 text-xs sm:text-sm">{employee.reason_of_leaving}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {/* <div className="flex justify-between items-center mt-4">
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
                        </div> */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-xs sm:px-4 sm:py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-xs sm:px-4 sm:py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
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
