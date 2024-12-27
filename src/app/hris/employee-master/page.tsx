"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { NotFoundPage } from "@/components/NotFoundPage/page";
import React, { useEffect, useState } from "react";
import { EmployeeList, DeleteEmployee } from "@/app/api/Allapi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

const EmployeeTable = () => {
  const router = useRouter();
  const { userDetails, setUserDetails }: any = useUserDetailsContext();
  if (userDetails?.user_role == "employee") return <NotFoundPage />;

  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<any>([]);
  const rowsPerPage = 10;

  const employeelist = async () => {
    try {
      const response = await EmployeeList();
      toast.success("Employee List! 🎉");
      setEmployeeData(response.data);
      // toast.success("Employee list loaded successfully!", {
      //     position: "top-right",
      //     autoClose: 3000, // 3 seconds
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      // });
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

  const handleDeleteSelected = async () => {
    if (selectedEmployeeIds.length === 0) {
      alert("No employees selected!");
      return;
    }
    console.log("Selected IDs:", selectedEmployeeIds);
    try {
      const data = { _id: selectedEmployeeIds };
      const response = await DeleteEmployee(data);
      toast.success("Deleted successfully!"); // Correct toast usage
      console.log("Deleted IDs:", selectedEmployeeIds);
      employeelist();
      setSelectedEmployeeIds([]);
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting employees:", error);
      toast.error("Failed to delete selected employees."); // Show error notification
    }
  };

  const handleUserNameClick = (employeeName: any, esslId: any, _id: any) => {
    console.log("yeeh", employeeName, esslId, _id, currentRows);
    router.push(
      `/hris/employee-master/add-employee/${employeeName}/${esslId}/${_id}`,
    );
  };

  return (
    <DefaultLayout>
      <div className="max-w-10xl mx-auto px-4 md:px-6 ">
        <Breadcrumb pageName="Employee List" />
        <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            {/* <div className="flex justify-between items-center mb-4">
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
                        </div> */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-lg font-bold sm:text-xl">Employee List</h1>
              <div className="flex flex-wrap space-x-2">
                <button
                  className="rounded bg-indigo-600 px-3 py-1   text-xs text-white  transition-all hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-sm md:text-base"
                  onClick={() =>
                    router.push("/hris/employee-master/add-employee")
                  }
                >
                  Add Employee
                </button>
                <button
                  className="rounded bg-red-600 px-3 py-1  text-xs text-white transition-all hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm md:text-base"
                  onClick={handleDeleteSelected}
                >
                  Delete
                </button>
              </div>
            </div>
            {/* Table */}
            {/* <div className="overflow-x-auto">
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
                                            <tr key={employee._id} className="hover:bg-gray-50">
                                                <td className="border text-center">
                                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(employee._id)}
                                                    />
                                                </td>

                                                <td className="border px-4 py-2 underline text-blue-500 hover:text-blue-700" onClick={() => handleUserNameClick(employee.firstName, employee.esslId, employee._id)} value={employee.firstName}>
                                                    {employee.firstName}
                                                </td>
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
                        </div> */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-xs sm:text-sm">Sno</th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Select
                    </th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Name
                    </th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Position
                    </th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Email
                    </th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Probation
                    </th>
                    <th className="border px-4 py-2 text-xs sm:text-sm">
                      Mobile Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="border py-4 text-center text-gray-500"
                      >
                        No data available! Please check back later.
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((employee: any, index: number) => (
                      <tr key={employee._id} className="hover:bg-gray-50">
                        <td className="border text-center text-xs sm:text-sm">
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>
                        <td className="border px-4 py-2 text-center text-xs sm:text-sm">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(employee._id)}
                          />
                        </td>
                        <td
                          className="border px-4 py-2 text-xs text-blue-500 underline hover:text-blue-700 sm:text-sm cursor-pointer"
                          onClick={() =>
                            handleUserNameClick(
                              employee.firstName,
                              employee.esslId,
                              employee._id,
                            )
                          }
                          value={employee.firstName}
                        >
                          {employee.firstName}
                        </td>
                        <td className="border px-4 py-2 text-xs sm:text-sm">
                          {employee.user_role}
                        </td>
                        <td className="border px-4 py-2 text-xs sm:text-sm">
                          {employee.email}
                        </td>
                        <td className="border px-4 py-2 text-xs sm:text-sm">
                          {employee.probationMonths}
                        </td>
                        <td className="border px-4 py-2 text-xs sm:text-sm">
                          {employee.mobileNumber}
                        </td>
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded bg-gray-300 px-3 py-1 text-xs transition-all hover:bg-gray-400 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm md:text-base"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded bg-gray-300 px-3 py-1 text-xs transition-all hover:bg-gray-400 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm md:text-base"
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
