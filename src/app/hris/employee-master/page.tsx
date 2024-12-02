'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useEffect, useState } from "react";
import { EmployeeList, DeleteEmployee } from "@/app/api/Allapi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EmployeeTable = () => {
    const router = useRouter();
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<any>([]);
    const rowsPerPage = 10;

    const employeelist = async () => {
        try {
            const response = await EmployeeList();
            setEmployeeData(response.data);
            toast.success("Employee list loaded successfully!", {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log("res", response.data);
        } catch (error) {
            console.error("Error loading employee list:", error);
            toast.error("Failed to load employee list. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
    useEffect(() => {
        console.log("Selected Employee IDs:", selectedEmployeeIds);
    }, [selectedEmployeeIds]);

    const handleDeleteSelected = async () => {
        if (selectedEmployeeIds.length === 0) {
            alert("No employees selected!");
            return;
        }
        console.log("eele", selectedEmployeeIds)
        try {
            const data = { "_id": selectedEmployeeIds }
            const response = await DeleteEmployee(data);
            console.log("Deleted IDs:", selectedEmployeeIds);
            employeelist();
            setSelectedEmployeeIds([]);
            alert("Selected employees deleted successfully!");
        } catch (error) {
            console.error("Error deleting employees:", error);
            alert("Failed to delete selected employees.");
        }
    };

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-10xl px-4 md:px-6 ">
                <Breadcrumb pageName="Employee List" />
                <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">Employee List</h1>
                            <div className="space-x-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => router.push('/hris/employee-master/add-employee')}
                                >
                                    Add Employee
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
                                    onClick={handleDeleteSelected}
                                >
                                    Delete Selected
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">Sno</th>
                                        <th className="border px-4 py-2">Select</th>
                                        <th className="border px-4 py-2">Name</th>
                                        <th className="border px-4 py-2">Position</th>
                                        <th className="border px-4 py-2">Email</th>
                                        <th className="border px-4 py-2">Probation</th>
                                        <th className="border px-4 py-2">Mobile Number</th>
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
                                        currentRows.map((employee: any, index: number) => (
                                            <tr key={employee.id} className="hover:bg-gray-50">
                                                <td className="border text-center">
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(employee._id)}
                                                    />
                                                </td>

                                                <td className="border px-4 py-2">{employee.firstName}</td>
                                                <td className="border px-4 py-2">{employee.user_role}</td>
                                                <td className="border px-4 py-2">{employee.email}</td>
                                                <td className="border px-4 py-2">{employee.probationMonths}</td>
                                                <td className="border px-4 py-2">{employee.mobileNumber}</td>
                                            </tr>
                                        ))
                                    )
                                    }



                                </tbody>
                            </table>
                        </div>

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