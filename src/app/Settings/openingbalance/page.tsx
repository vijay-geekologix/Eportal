'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import SettingBoxes from "@/components/SettingBoxes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EmployeeList, getLeaveBalanceRecords, getAllLeaveBalanceRecords, putLeaveBalanceRecords, postLeaveBalanceRecords } from "@/app/api/Allapi";
import { NotFoundPage } from "@/components/NotFoundPage/page";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

// export const metadata: Metadata = {
//   title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
//   description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
// };

const Settings = () => {
  const { userDetails, setUserDetails }: any = useUserDetailsContext();

  if (userDetails?.user_role == "employee") return <NotFoundPage />;
  const [employeeData, setEmployeeData] = useState<any>([])
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [closingBalance, setClosingBalance] = useState("");
  const [openingBalancestatus, setOpeningBalancestatus] = useState(false);
  const [balanceRecord, setbalanceRecord] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);
  const [selectedData, setSelectedData] = useState<any>([]);
  const [tableData, setTableData] = useState([]);
  const [inputData, setinputData] = useState([])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    if (selectedEmployee && year) {
      setOpeningBalancestatus(true)
    }
  };

  const employeelist = async () => {
    try {
      const employeeResponse = await EmployeeList();
      const balanceResponse = await getAllLeaveBalanceRecords();

      const employees = employeeResponse.data;
      const balances = balanceResponse.data.data;
      setinputData(balanceResponse.data.data.map((item: any) => item.totalClosingBalance))
      // Merge logic
      const mergedData = employees.map((employee: any) => {
        const balanceRecord = balances.find(
          (balance: any) => balance.employeeId === employee._id
        );
        return {
          ...employee,
          totalClosingBalance: balanceRecord
            ? balanceRecord.totalClosingBalance
            : "00", // Default value if no matching record is found
        };
      });

      setEmployeeData(mergedData);
      setbalanceRecord(mergedData); // Updating balanceRecord for the table
      setTableData(mergedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const carryForward = () => {
    setOpeningBalancestatus(true)
    toast.success('Carry forward executed successfully!');
  }


  useEffect(() => {
    employeelist();
  }, [])



  // Handler for select all checkbox
  const handleSelectAll = (isChecked: boolean) => {
    setSelectedRows(new Array(balanceRecord.length).fill(isChecked));
    setSelectedData(isChecked ? balanceRecord.map((res: any) => (
      {
        id: res._id,
        openingBalance: res.totalClosingBalance
      }
    )) : [])

  };

  // Handler for individual checkbox
  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const updatedSelections = [...selectedRows];
    updatedSelections[index] = isChecked;
    setSelectedRows(updatedSelections);
    if (isChecked) {
      setSelectedData((prev: any) => [
        ...prev,
        {
          id: balanceRecord[index].id,
          openingBalance: balanceRecord[index].totalClosingBalance
        }
      ])
    } else {
      setSelectedData((prev: any) => prev.filter((data: any) => data.id !== balanceRecord[index].id))
    }
  };

  // Handle input value change
  const [updatedRecords, setUpdatedRecords] = useState<any[]>([]);
  const handleInputChange = (event: any, index: number, employeeId: string, employeeName: string, year: string) => {
    if (!selectedYear) {
      toast.error('Please select a year before editing the input!');
      return;
    }
    const adminOpeningBalance = event.target.value;

    // Update the input data array
    const updatedInputData: any = [...inputData];
    updatedInputData[index] = adminOpeningBalance;
    setinputData(updatedInputData);

    // Only track updates for selected rows
    if (selectedRows[index]) {
      setUpdatedRecords((prevRecords) => {
        const updated = [...prevRecords];
        const recordIndex = updated.findIndex(
          (record) =>
            record.employeeId === employeeId &&
            record.employeeName === employeeName &&
            record.year === year
        );

        if (recordIndex > -1) {
          // Update the existing record
          updated[recordIndex] = { employeeId, adminOpeningBalance, employeeName, year };
        } else {
          // Add a new record
          updated.push({ employeeId, adminOpeningBalance, employeeName, year });
        }

        return updated;
      });
    }
  };

  // const sendOpeningBalance = async () => {
  //   console.log("tester", updatedRecords)
  //   if (updatedRecords.length === 0) {
  //     toast.error('"No changes to save.');
  //     return;
  //   }

  //   try {
  //     const response = await postLeaveBalanceRecords(updatedRecords);
  //     console.log("API Response:", response);
  //     toast.success('Opening balance saved successfully!');
  //     // window.location.reload()
  //     toast.success('Opening balance saved successfully!');
  //     // Clear the updatedRecords state after successful API call
  //     setUpdatedRecords([]);
  //   } catch (error) {
  //     console.error("Error sending records to the API:", error);
  //     toast.error('Failed to update records. Please try again.');
  //   }
  // };
  const sendOpeningBalance = async () => {
    console.log("tester", updatedRecords);
    if (updatedRecords.length === 0) {
      toast.error("No changes to save.");
      return;
    }

    try {
      const response = await postLeaveBalanceRecords(updatedRecords);
      if (response.statusCode === 401) {
        toast.error("Repeated Year opening balance is not updated.");
        return;
      }
      toast.success("Opening balance saved successfully!");
      setUpdatedRecords([]);
    } catch (error) {
      console.error("Error sending records to the API:", error);
      toast.error("Failed to update records. Please try again.");
    }
  };

  return (
    // <DefaultLayout>
    //   <div className="mx-auto w-full max-w-[1080px]">
    //     <Breadcrumb pageName="Settings" />

    //     <SettingBoxes />
    //   </div>
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Settings/opening-balance" />
        <div className="max-w-10xl mx-auto px-4 md:px-6">
          <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mx-auto max-w-full space-y-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-500">
                    Opening Balance
                  </h2>
                  <div>
                    <button
                      onClick={sendOpeningBalance}
                      className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 mx-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={carryForward}
                      className="rounded-md bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
                    >
                      Carry Forward
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="yearSelect" className="block text-gray-700 mb-2">Select Year</label>
                  <select
                    id="yearSelect"
                    className="rounded-md border-gray-300 bg-white px-4 py-2 shadow focus:outline-none focus:ring focus:ring-indigo-300"
                    onChange={handleYearChange}
                    value={selectedYear}
                  >
                    <option value="" disabled>Select Year</option>
                    {Array.from({ length: 40 }, (_, i) => {
                      const year = new Date().getFullYear() - 25 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <div className=" overflow-y-auto h-100">
                    <table className="min-w-full mt-6 border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="border border-gray-300 px-6 py-3 text-center text-sm font-medium">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring focus:ring-indigo-400"
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              checked={
                                selectedRows.length > 0 &&
                                selectedRows.every((isChecked) => isChecked)
                              }
                            />
                          </th>
                          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium">
                            Employee Name
                          </th>
                          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium">
                            Closing Balance
                          </th>
                          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium">
                            Opening Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {balanceRecord && balanceRecord.length > 0 ? (
                          balanceRecord.map((res: any, index: any) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-6 py-3 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring focus:ring-indigo-400"
                                  checked={selectedRows[index] || false}
                                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                />
                              </td>
                              <td className="border border-gray-300 px-6 py-3 text-sm text-gray-700">
                                {res.firstName}
                              </td>
                              <td className="border border-gray-300 px-6 py-3">
                                <input
                                  type="text"
                                  value={res.totalClosingBalance}
                                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                  placeholder="Enter Closing Balance"
                                  disabled
                                />
                              </td>
                              <td className="border border-gray-300 px-6 py-3">
                                <input
                                  value={openingBalancestatus ? inputData[index] : '00'}
                                  onChange={(e) =>
                                    handleInputChange(e, index, res._id, res.firstName, selectedYear)
                                  }
                                  type="number"
                                  className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring ${selectedYear
                                    ? 'focus:ring-indigo-300'
                                    : 'bg-gray-100 cursor-not-allowed'
                                    }`}
                                  placeholder="Enter Opening Balance"
                                  disabled={!selectedYear || !selectedRows[index]}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4} // Adjust this value to match the number of columns in your table
                              className="text-center py-4 text-gray-500"
                            >
                              No data records found.
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
      </div>
    </DefaultLayout>
  );
};

export default Settings;



