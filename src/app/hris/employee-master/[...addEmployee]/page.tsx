"use client";

import React, { useEffect, useState } from "react";
import { Camera, Upload, Plus, Minus } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { specificEmployee, CreateEmployee, updateEmployee } from "@/app/api/Allapi";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NotFoundPage } from "@/components/NotFoundPage/page";
import { useUserDetailsContext } from "@/context/UserDetailsContext";
import { Console } from "node:console";

interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  joiningDate: string;
  confirmationDate: string;
  mode:string;
  esslId: "";
  employeeCode: "";
  company: string;
  role: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyNumber: string;
  pincode: string;
}

interface WorkExperience {
  companyName: string;
  role: string;
  experience: string;
}

interface Education {
  qualification: string;
  year: string;
  marks: string;
}

interface StatutoryInfo {
  adharNumber: string;
  panNumber: string;
  bankAccountNumber: string;
  IFSCCode: string;
  branchName: string;
  probationPeriod: boolean;
  probationMonths: string;
}

const EmployeeProfile: React.FC = ({ params: initialParams }: any) => {
  const router = useRouter();
  const { userDetails, setUserDetails }: any = useUserDetailsContext();
  if (userDetails?.user_role == "employee") return <NotFoundPage />;
  // const {ref} = router.query;
  const [activeTab, setActiveTab] = useState<
    "personal" | "qualification" | "statutory"
  >("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [params, setParams] = useState<any | null>(null);
  const [specificEmployeeData, setSpecificEmployeeData] = useState<any>({});
  // const [paramsData , setParamsData] = useState(params.addEmployee);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    middleName: "",
    lastName: "",
    joiningDate: "",
    confirmationDate: "",
    esslId: "",
    mode:'onsite',
    employeeCode: "",
    company: "NowAwave",
    role: "employee",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "Male",
    address: "",
    emergencyNumber: "",
    pincode: "",
  });
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { companyName: "", role: "", experience: "" },
  ]);
  const [education, setEducation] = useState<Education>({
    qualification: "",
    year: "",
    marks: "",
  });
  const [statutoryInfo, setStatutoryInfo] = useState<StatutoryInfo>({
    adharNumber: "",
    panNumber: "",
    bankAccountNumber: "",
    IFSCCode: "",
    branchName: "",
    probationPeriod: false,
    probationMonths: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handlePersonalChange = (e: any) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setWorkExperience((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleEducationChange = (e:any) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const addWorkExperience = () => {
    setWorkExperience((prev) => [
      ...prev,
      { companyName: "", role: "", experience: "" },
    ]);
  };

  const removeWorkExperience = (index: any) => {
    setWorkExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStatutoryChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    setStatutoryInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const formData = {
      photo: profileImage,
      companyName: personalInfo.company,
      firstName: personalInfo.firstName,
      middleName: personalInfo.middleName,
      lastName: personalInfo.lastName,
      user_role:personalInfo.role,
      esslId: personalInfo.esslId,
      mode:personalInfo.mode,
      joiningDate: personalInfo.joiningDate,
      confirmationDate: personalInfo.confirmationDate,
      employeeCode: personalInfo.employeeCode,
      dateOfBirth: personalInfo.dateOfBirth,
      gender: personalInfo.gender,
      email: personalInfo.email,
      mobileNumber: personalInfo.mobileNumber,
      address: personalInfo.address,
      emergencyNumber: personalInfo.emergencyNumber,
      pincode: personalInfo.pincode,
      adharNumber: statutoryInfo.adharNumber,
      panNumber: statutoryInfo.panNumber,
      bankAccountNumber: statutoryInfo.bankAccountNumber,
      IFSCCode: statutoryInfo.IFSCCode,
      probationMonths: statutoryInfo.probationPeriod
        ? statutoryInfo.probationMonths
        : null,
      workExperience: workExperience.map((work) => ({
        companyName: work.companyName,
        role: work.role,
        experience: parseInt(work.experience),
      })),
      educationHistory: [
        {
          highestQualification: education.qualification,
          year: parseInt(education.year),
          marks: parseFloat(education.marks),
        },
      ],
    };
    try {
      if (
        formData.firstName == "" ||
        formData.dateOfBirth == "" ||
        formData.gender == "" ||
        formData.email == "" ||
        formData.mobileNumber == "" ||
        formData.address == ""
      ) {
        setActiveTab("personal");
        toast.error("Please Fill Personal Info", {
          position: "top-right",
        });
        return;
      } else if (formData.educationHistory[0].highestQualification == "") {
        setActiveTab("qualification");
        toast.error("Please Fill Qualification Info", {
          position: "top-right",
        });
      } else if (
        formData.adharNumber == "" ||
        formData.panNumber == "" ||
        formData.bankAccountNumber == "" ||
        formData.IFSCCode == ""
      ) {
        setActiveTab("statutory");
        toast.error("Please Fill Statutory Info", {
          position: "top-right",
        });
      } else {
        const response = await CreateEmployee(formData);
        if (response.statusCode === 201) {
          router.push("/hris/employee-master");
          toast.success("Employee created successfully!", {
            position: "top-right",
          });
        } else throw response;
      }
    } catch (error: any) {
      if (
        formData.esslId == "" ||
        formData.employeeCode == "" ||
        formData.joiningDate == "" ||
        formData.confirmationDate == ""
      ) {
        toast.error("Please Fill Company Info", {
          position: "top-right",
        });
      } else {
        toast.error("You filled Duplicate Info", {
          position: "top-right",
        });
      }
      console.error("Error submitting form:", error);
    }
  };

//   {
//     "_id": "676ab6bf7ffd6cdeaa80a1a6",
//     "photo": null,
//     "companyName": "NowAwave",
//     "firstName": "Jitesh ",
//     "middleName": "-",
//     "lastName": "Kanwariya",
//     "dateOfBirth": "1998-11-24T00:00:00.000Z",
//     "gender": "Male",
//     "email": "jitesh.kanwariya@v2rsolutions.com",
//     "mobileNumber": "08278648630",
//     "address": "Bhadhwasiya,jodhpur",
//     "emergencyNumber": "9024924899",
//     "pincode": "342007",
//     "adharNumber": "461938062966",
//     "panNumber": "HJXPK7438D",
//     "bankAccountNumber": "1",
//     "IFSCCode": "1",
//     "probationMonths": 3,
//     "workExperience": [
//         {
//             "companyName": "Geekologix",
//             "role": "Software Developer",
//             "experience": 4,
//             "_id": "676ab6bf7ffd6cdeaa80a1a7"
//         }
//     ],
//     "educationHistory": [
//         {
//             "highestQualification": "-",
//             "year": 2021,
//             "marks": null,
//             "_id": "676ab6bf7ffd6cdeaa80a1a8"
//         }
//     ],
//     "password": "$2a$10$BMgCxmp4KymwjdaQdPOd1emdvR39DjxRPllsxfar5DuOqcpf50qRS",
//     "isFirstLogin": true,
//     "user_role": "manager",
//     "esslId": 7,
//     "isActive": true,
//     "jobType": "onsite",
//     "__v": 0
// }


// details updation code
  const handleUpdate = async () => {
    try {
        const response = await updateEmployee(specificEmployeeData);
        if (response.statusCode === 200) {
          router.push("/hris/employee-master");
          toast.success("Employee updated successfully!", {
            position: "top-right",
          });
        } else throw response;
    } catch (error: any) {
      toast.error("Error during update employe data", {
        position: "top-right",
      });
    }
  };

  const handleUpdateChanges = async (event: any) => {
    const { name, value } = event.target;
      console.log('juyy',name);

    if (name.startsWith("workExperience") || name.startsWith("educationHistory")) {
        const match = name.match(/(\w+)\[(\d+)\]\.(\w+)/);
        if (match) {
            const arrayName = match[1];
            const index = parseInt(match[2], 10);
            const key = match[3];

            setSpecificEmployeeData((prev: any) => {
                const updatedArray = [...prev[arrayName]];
                updatedArray[index] = {
                    ...updatedArray[index],
                    [key]: value,
                };

                return {
                    ...prev,
                    [arrayName]: updatedArray,
                };
            });
        }
    } else {
        setSpecificEmployeeData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }
  };


  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    };

    resolveParams();
  }, [initialParams]);
    
  useEffect(()=>{
    (async () => {
    if (params || params?.addEmployee) {
      try {
        const response = await specificEmployee(
          params.addEmployee[2],
          params.addEmployee[3],
        );
        setSpecificEmployeeData(response?.data[0]);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
     }
    })();
  },[params])

  // for Database's date format
  const formatISODate = (isoString: any) => {
    return isoString ? new Date(isoString).toISOString().split("T")[0] : "";
  };

  useEffect(()=>{
   console.log('juh',specificEmployeeData);
   
  },[specificEmployeeData])

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-6xl px-4 md:px-6 ">
        <Breadcrumb pageName="Add Employee" />
        {params && params.addEmployee && params.addEmployee.length <= 1 ? (
          //  empty form
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              if (!form.checkValidity()) {
                alert("Please fill out all required fields.");
              } else {
                console.log("Form Submitted!");
              }
            }}
          >
            <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="p-6">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="relative">
                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-indigo-500">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200">
                              <Camera className="text-gray-400" size={48} />
                            </div>
                          )}
                        </div>
                        <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-500 p-2 text-white">
                          <Upload size={20} />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Company Name
                          </label>
                          <select
                            id="company"
                            name="company"
                            value={personalInfo?.company}
                            onChange={handlePersonalChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            {/* <option value="">Select Company</option> */}
                            <option value="NowAwave">NowAwave</option>
                            <option value="Geekologix">Geekologix</option>
                          </select>
                        </div>
                        <div className="flex justify-between"  >
                          <div className="w-full mr-2">
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Role
                            </label>
                            <select
                              id="role"
                              name="role"
                              value={personalInfo?.role}
                              onChange={handlePersonalChange}
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                              <option value="">Select Role</option>
                              <option value="manager">Manager</option>
                              <option value="superadmin">Superadmin</option>
                              <option value="admin">Admin</option>
                              <option value="employee">Employee</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Mode
                            </label>
                            <select
                              id="mode"
                              name="mode"
                              value={personalInfo?.mode}
                              onChange={handlePersonalChange}
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                              <option value="Onsite">Onsite</option>
                              <option value="Remote">Remote</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <label
                              htmlFor="esslId"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Essl Id *
                            </label>
                            <input
                              type="number"
                              id="esslId"
                              name="esslId"
                              value={personalInfo?.esslId}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-auto rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter Essl Id"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="employeeCode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Employee Code *
                            </label>
                            <input
                              type="text"
                              id="employeeCode"
                              name="employeeCode"
                              value={personalInfo?.employeeCode}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-auto rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter Essl Id"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="joiningDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Joining Date
                            </label>
                            <input
                              type="date"
                              id="joiningDate"
                              name="joiningDate"
                              min="2000-01-01"
                              max="2030-12-31"
                              value={personalInfo?.joiningDate}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-auto rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter middle name"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="confirmationDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirmation Date
                            </label>
                            <input
                              type="date"
                              id="confirmationDate"
                              name="confirmationDate"
                              min="2000-01-01"
                              max="2030-12-31"
                              value={personalInfo?.confirmationDate}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-auto rounded-md border-gray-300 bg-indigo-50 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter middle name"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center ">
                            <div className="mt-1 flex w-full items-center rounded-md border-gray-300 bg-indigo-50 px-2 py-2 shadow-sm">
                              <input
                                id="probationPeriod"
                                name="probationPeriod"
                                type="checkbox"
                                checked={statutoryInfo?.probationPeriod}
                                onChange={handleStatutoryChange}
                                className="mr-2 h-4 w-4 rounded bg-indigo-50 border-gray-300 px-2 py-1 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="probationPeriod"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Probation Months
                              </label>
                            </div>

                            {statutoryInfo?.probationPeriod && (
                              <div className="ml-2 mr-5 w-full">
                                <input
                                  type="number"
                                  id="probationMonths"
                                  name="probationMonths"
                                  value={statutoryInfo?.probationMonths}
                                  onChange={handleStatutoryChange}
                                  className="ml-5 mt-1 block w-full rounded-md border-gray-300 bg-indigo-50 px-2 py-1.5 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  placeholder="Enter probation period in months"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                      {["personal", "qualification", "statutory"].map(
                        (tab, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setActiveTab(
                                tab as
                                  | "personal"
                                  | "qualification"
                                  | "statutory",
                              )
                            }
                            className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium  ${
                              activeTab === tab
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
                            Information
                          </button>
                        ),
                      )}
                    </nav>
                  </div>

                  <div className="p-6">
                    {activeTab === "personal" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={personalInfo?.firstName}
                              onChange={handlePersonalChange}
                              required
                              className="mt-1 block w-full rounded-md px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="middleName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Middle Name
                            </label>
                            <input
                              type="text"
                              id="middleName"
                              name="middleName"
                              value={personalInfo?.middleName}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter middle name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={personalInfo?.lastName}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter last name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="dateOfBirth"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              min="1950-01-01"
                              max="2030-12-31"
                              value={personalInfo?.dateOfBirth}
                              onChange={handlePersonalChange}
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="gender"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Gender *
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={personalInfo?.gender}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-full bg-white rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                              {/* <option >Select gender</option> */}
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={personalInfo?.email}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter email address"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="mobileNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Mobile Number *
                            </label>
                            <input
                              type="text"
                              id="mobileNumber"
                              name="mobileNumber"
                              maxLength={10}
                              value={personalInfo?.mobileNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 10) {
                                  handlePersonalChange({
                                    target: { name: e.target.name, value },
                                  });
                                }
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter mobile number"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="emergencyNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Emergency No
                            </label>
                            <input
                              type="text"
                              id="emergencyNumber"
                              name="emergencyNumber"
                              maxLength={10}
                              value={personalInfo?.emergencyNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); 
                                if (value.length <= 10) {
                                  handlePersonalChange({
                                    target: { name: e.target.name, value },
                                  });
                                }
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter mobile number"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              pincode *
                            </label>
                            <input
                              type="number"
                              id="pincode"
                              name="pincode"
                              value={personalInfo?.pincode}
                              onChange={handlePersonalChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter pincode"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address *
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={personalInfo?.address}
                            onChange={handlePersonalChange}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter full address"
                            required
                          ></textarea>
                        </div>
                      </div>
                    )}

                    {activeTab === "qualification" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Work Experience
                        </h3>
                        {workExperience.map((work, index) => (
                          <div
                            key={index}
                            className="space-y-4 rounded-md bg-gray-50 p-4"
                          >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <div>
                                <label
                                  htmlFor={`companyName-${index}`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  id={`companyName-${index}`}
                                  name="companyName"
                                  value={work?.companyName}
                                  onChange={(e) => handleWorkChange(index, e)}
                                  className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  placeholder="Enter company name"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`role-${index}`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Role
                                </label>
                                <input
                                  type="text"
                                  id={`role-${index}`}
                                  name="role"
                                  value={work?.role}
                                  onChange={(e) => handleWorkChange(index, e)}
                                  className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  placeholder="Enter role"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`experience-${index}`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Experience (Years)
                                </label>
                                <input
                                  type="number"
                                  id={`experience-${index}`}
                                  name="experience"
                                  value={work?.experience}
                                  onChange={(e) => handleWorkChange(index, e)}
                                  className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  placeholder="Enter years of experience"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeWorkExperience(index)}
                                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                <Minus className="mr-2 h-4 w-4" />
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        <div>
                          <button
                            type="button"
                            onClick={addWorkExperience}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <Plus className="mr-2 h-5 w-5" />
                            Add Work Experience
                          </button>
                        </div>

                        <h3 className="mt-8 text-lg font-medium leading-6 text-gray-900">
                          Education History
                        </h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                          <div>
                            <label
                              htmlFor="qualification"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Highest Qualification *
                            </label>
                            <input
                              type="text"
                              id="qualification"
                              name="qualification"
                              value={education?.qualification}
                              onChange={handleEducationChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter highest qualification"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="year"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Year
                            </label>
                              <input
                              type="year"
                              id="year"
                              name="year"
                              maxLength={10}
                              value={education?.year}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 4) {
                                  handleEducationChange({
                                    target: { name: e.target.name, value },
                                  });
                                }
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter year"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="marks"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Marks
                            </label>
                            <input
                              type="text"
                              id="marks"
                              name="marks"
                              value={education?.marks}
                              onChange={handleEducationChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter marks obtained"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "statutory" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="adharNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Aadhar Number *
                            </label>
                            {/* <input
                              type="text"
                              id="adharNumber"
                              name="adharNumber"
                              value={statutoryInfo.adharNumber}
                              onChange={handleStatutoryChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter Aadhar number"
                              required
                            /> */}
                            <input
                              type="text"
                              id="adharNumber"
                              name="adharNumber"
                              maxLength={12}
                              value={statutoryInfo?.adharNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 12) {
                                  handleStatutoryChange({
                                    target: { name: e.target.name, value },
                                  });
                                }
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter mobile number"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="panNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              PAN Number *
                            </label>
                            <input
                              type="text"
                              id="panNumber"
                              name="panNumber"
                              maxLength={10}
                              value={statutoryInfo?.panNumber}
                              onChange={handleStatutoryChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter PAN number"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="bankAccountNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Bank Account Number *
                            </label>
                            {/* <input
                              type="text"
                              id="bankAccountNumber"
                              name="bankAccountNumber"
                              value={statutoryInfo.bankAccountNumber}
                              onChange={handleStatutoryChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter bank account number"
                              required
                            /> */}
                            <input
                              type="text"
                              id="bankAccountNumber"
                              name="bankAccountNumber"
                              maxLength={18}
                              value={statutoryInfo?.bankAccountNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 18) {
                                  handleStatutoryChange({
                                    target: { name: e.target.name, value },
                                  });
                                }
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter mobile number"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="IFSCCode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              IFSC Code *
                            </label>
                            <input
                              type="text"
                              id="IFSCCode"
                              name="IFSCCode"
                              value={statutoryInfo?.IFSCCode}
                              onChange={handleStatutoryChange}
                              className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="Enter IFSC code"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 px-6 py-3 text-right">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          // auto-fill data form
          <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
            <div className="container mx-auto px-4 py-8">
              <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
                <div className="p-6">
                  <div className="flex flex-col items-center gap-6 md:flex-row">
                    <div className="relative">
                      <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-indigo-500">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <Camera className="text-gray-400" size={48} />
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-500 p-2 text-white">
                        <Upload size={20} />
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <div className="flex-grow space-y-4">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company Name
                        </label>
                        <select
                          id="company"
                          name="companyName"
                          value={specificEmployeeData?.companyName}
                          onChange={handleUpdateChanges}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">
                            {specificEmployeeData?.companyName}
                          </option>
                          {/* <option value="NowAwave">NowAwave</option>
                          <option value="Geekologix">Geekologix</option> */}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="user_role"
                          value={specificEmployeeData?.user_role}
                          onChange={handleUpdateChanges}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">
                            {specificEmployeeData?.user_role}
                          </option>
                          <option value="manager">Manager</option>
                          <option value="superadmin">Superadmin</option>
                          <option value="admin">Admin</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <label
                            htmlFor="esslId"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Essl Id *
                          </label>
                          <input
                            type="number"
                            id="esslId"
                            name="esslId"
                            value={specificEmployeeData?.esslId}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-auto rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter Essl Id"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="employeeCode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Employee Code *
                          </label>
                          <input
                            type="number"
                            id="employeeCode"
                            name="employeeCode"
                            value={specificEmployeeData?.employeeCode}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-auto rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter Essl Id"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="joiningDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Joining Date
                          </label>
                          <input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            value={specificEmployeeData?.joiningDate}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-auto rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter middle name"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmationDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirmation Date
                          </label>
                          <input
                            type="date"
                            id="confirmationDate"
                            name="confirmationDate"
                            value={specificEmployeeData?.confirmationDate}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-auto rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter middle name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center ">
                          <div className="mt-1 flex w-full items-center rounded-md border-gray-300 bg-gray-2 px-2 py-2 shadow-sm">
                            <input
                              id="probationPeriod"
                              name="probationPeriod"
                              type="checkbox"
                              checked={specificEmployeeData?.probationMonths}
                              onChange={handleUpdateChanges}
                              className="mr-2 h-4 w-4 rounded border-gray-300 px-2 py-1 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="probationPeriod"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Probation Months
                            </label>
                          </div>

                          {statutoryInfo.probationPeriod && (
                            <div className="ml-2 mr-5 w-full">
                              <input
                                type="number"
                                id="probationMonths"
                                name="probationMonths"
                                value={specificEmployeeData?.probationMonths}
                                onChange={handleUpdateChanges}
                                className="ml-5 mt-1 block w-full rounded-md border-gray-300 bg-gray-2 px-2 py-1.5 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter probation period in months"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex">
                    {["personal", "qualification", "statutory"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setActiveTab(
                            tab as "personal" | "qualification" | "statutory",
                          )
                        }
                        className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium ${
                          activeTab === tab
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.firstName}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="middleName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Middle Name
                          </label>
                          <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.middleName}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter middle name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.lastName}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter last name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="dateOfBirth"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            onChange={handleUpdateChanges}
                            value={formatISODate(
                              specificEmployeeData?.dateOfBirth,
                            )}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.gender}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.email}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="mobileNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.mobileNumber}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter mobileNumber number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="emergencyNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Emergency No
                          </label>
                          <input
                            type="tel"
                            id="emergencyNumber"
                            name="emergencyNumber"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.emergencyNumber}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter emergency contact number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="pincode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pincode
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            onChange={handleUpdateChanges}
                            value={specificEmployeeData?.pincode}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter pincode"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          onChange={handleUpdateChanges}
                          value={specificEmployeeData?.address}
                          className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Enter full address"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {activeTab === "qualification" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Work Experience
                      </h3>
                      {workExperience.map((work, index) => (
                        <div
                          key={index}
                          className="space-y-4 rounded-md bg-gray-50 p-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                              <label
                                htmlFor={`companyName-${index}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                id={`companyName-${index}`}
                                name="workExperience[0].companyName"
                                value={specificEmployeeData?.workExperience[0].companyName}
                                onChange={(e) => handleUpdateChanges(e)}
                                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter company name"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor={`role-${index}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Role
                              </label>
                              <input
                                type="text"
                                id={`role-${index}`}
                                name="workExperience[0].role"
                                value={specificEmployeeData?.workExperience[0].role}
                                onChange={(e) => handleUpdateChanges(e)}
                                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter role"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor={`experience-${index}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Experience (Years)
                              </label>
                              <input
                                type="number"
                                id={`experience-${index}`}
                                name="workExperience[0].experience"
                                value={specificEmployeeData?.workExperience[0].experience}
                                onChange={(e) => handleUpdateChanges(e)}
                                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter years of experience"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeWorkExperience(index)}
                              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-2 px-3 py-1 py-2 text-sm font-medium leading-4 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <Minus className="mr-2 h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <div>
                        <button
                          type="button"
                          onClick={addWorkExperience}
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Add Work Experience
                        </button>
                      </div>

                      <h3 className="mt-8 text-lg font-medium leading-6 text-gray-900">
                        Education History
                      </h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                          <label
                            htmlFor="qualification"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Highest Qualification
                          </label>
                          <input
                            type="text"
                            id="qualification"
                            name="educationHistory[0].highestQualification"
                            value={
                              specificEmployeeData?.educationHistory[0]
                                .highestQualification
                            }
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter highest qualification"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Year
                          </label>
                          <input
                            type="text"
                            id="year"
                            name="educationHistory[0].year"
                            value={
                              specificEmployeeData?.educationHistory[0].year
                            }
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter year of completion"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="marks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Marks
                          </label>
                          <input
                            type="number"
                            id="marks"
                            name="educationHistory[0].marks"
                            value={
                              specificEmployeeData?.educationHistory[0].marks
                            }
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter marks obtained"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "statutory" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="adharNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Aadhar Number
                          </label>
                          <input
                            type="text"
                            id="adharNumber"
                            name="adharNumber"
                            value={specificEmployeeData?.adharNumber}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter Aadhar number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="panNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            PAN Number
                          </label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            value={specificEmployeeData?.panNumber}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter PAN number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bankAccountNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Bank Account Number
                          </label>
                          <input
                            type="text"
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={specificEmployeeData?.bankAccountNumber}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter bank account number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="IFSCCode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            id="IFSCCode"
                            name="IFSCCode"
                            value={specificEmployeeData?.IFSCCode}
                            onChange={handleUpdateChanges}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter IFSC code"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-3 text-right">
                  <button
                    type="submit"
                    onClick={handleUpdate}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default EmployeeProfile;
