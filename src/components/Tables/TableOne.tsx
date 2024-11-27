import Image from "next/image";

const employeeData = [
  {
    name: "John Doe",
    jobTitle: "Software Engineer",
    workingHours: 40,
    status: "Active",
    avatar: "/images/user/user-01.png",
  },
  {
    name: "Jane Smith",
    jobTitle: "Product Manager",
    workingHours: 38,
    status: "On Leave",
    avatar: "/images/user/user-02.png",
  },
  {
    name: "Alice Brown",
    jobTitle: "Designer",
    workingHours: 42,
    status: "Active",
    avatar: "/images/user/user-03.png",
  },
  {
    name: "Bob Johnson",
    jobTitle: "Developer",
    workingHours: 35,
    status: "Active",
    avatar: "/images/user/user-05.png",
  },
  {
    name: "Charlie White",
    jobTitle: "HR Manager",
    workingHours: 40,
    status: "Inactive",
    avatar: "/images/user/user-06.png",
  },
];

const EmployeeTable = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark dark:shadow-xl">
      <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Employee Directory
      </h4>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Avatar</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Job Title</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Working Hours</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 dark:border-gray-600 ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"
                }`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={employee.avatar}
                      alt={employee.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-800 dark:text-white">{employee.name}</td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{employee.jobTitle}</td>
                <td className="px-4 py-4 text-sm text-gray-800 dark:text-white">{employee.workingHours} hrs</td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : employee.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
