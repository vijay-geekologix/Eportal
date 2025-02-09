"use client";
import React, { useEffect, useState } from "react";
import { Camera, Upload, Plus, Minus } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  specificEmployee,
  CreateEmployee,
  postEmployeeDetailsRequest,
} from "@/app/api/Allapi";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
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

const ProfileBox = () => {
  const router = useRouter();
  const { userDetails, setUserDetails }: any = useUserDetailsContext();
  const [activeTab, setActiveTab] = useState<
    "personal" | "qualification" | "statutory"
  >("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [specificEmployeeData, setSpecificEmployeeData] = useState<any>({});
  const [tempSpecificEmployeeData, setTempSpecificEmployeeData] = useState<any>(
    {},
  );
  const [esslId, setEsslId] = useState(userDetails?.esslId);
  const [userDbId, setUserDbId] = useState(userDetails?._id);
  const [userName, setUserName] = useState(
    userDetails?.firstName + " " + userDetails?.lastName,
  );

  const [newPersonalInfo, setNewPersonalInfo] = useState<any>({});
  const [oldPersonalInfo, setOldPersonalInfo] = useState<any>({});
  const [newQualificationInfo, setNewQualifationInfo] = useState<any>({});
  const [oldQualificationInfo, setOldQualificationInfo] = useState<any>({});
  const [newStatutoryInfo, setNewStatutoryInfo] = useState<any>({});
  const [oldStatutoryInfo, setOldStatutoryInfo] = useState<any>({});
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { companyName: "", role: "", experience: "" },
  ]);
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

  const handleNewPersonalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    // setNewPersonalInfo((prev) => ({ ...prev, [name]: value }))
    setNewPersonalInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setOldPersonalInfo((prev: any) => ({
      ...prev,
      [name]: specificEmployeeData[0][name],
    }));
    // tempSpecificEmployeeData[0][name] = value

    setTempSpecificEmployeeData((prev: any) => {
      const updatedTemp = [...prev];
      updatedTemp[0] = {
        ...updatedTemp[0],
        [name]: value,
      };
      return updatedTemp;
    });
  };

  // useEffect(() => {
  //   console.log("juuPersonalInfo1", newPersonalInfo);
  //   console.log("juuPersonalInfo2", oldPersonalInfo);
  //   console.log("juuQualificationInfo1", newQualificationInfo);
  //   console.log("juuQualificationInfo2", oldQualificationInfo);
  //   console.log("juuStatutoryInfo5", newStatutoryInfo);
  //   console.log("juuStatutoryInfo6", oldStatutoryInfo);
  // }, [newPersonalInfo, newQualificationInfo, newStatutoryInfo]);

  const handleWorkChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewQualifationInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setOldQualificationInfo((prev: any) => ({
      ...prev,
      [name]: specificEmployeeData[0]["workExperience"][0][name],
    }));
    // tempSpecificEmployeeData[0][name] = value

    setTempSpecificEmployeeData((prev: any) => {
      const updatedTemp = [...prev];
      updatedTemp[0]["workExperience"][0] = {
        ...updatedTemp[0]["workExperience"][0],
        [name]: value,
      };
      return updatedTemp;
    });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewQualifationInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setOldQualificationInfo((prev: any) => ({
      ...prev,
      [name]: specificEmployeeData[0]["educationHistory"][0][name],
    }));
    // tempSpecificEmployeeData[0][name] = value

    setTempSpecificEmployeeData((prev: any) => {
      const updatedTemp = [...prev];
      updatedTemp[0]["educationHistory"][0] = {
        ...updatedTemp[0]["educationHistory"][0],
        [name]: value,
      };
      return updatedTemp;
    });
  };

  // const addWorkExperience = () => {
  //   setWorkExperience((prev) => [...prev, { companyName: '', role: '', experience: '' }])
  // }

  // const removeWorkExperience = (index: number) => {
  //   setWorkExperience((prev) => prev.filter((_, i) => i !== index))
  // }

  const handleStatutoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setNewStatutoryInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setOldStatutoryInfo((prev: any) => ({
      ...prev,
      [name]: specificEmployeeData[0][name],
    }));
    // tempSpecificEmployeeData[0][name] = value

    setTempSpecificEmployeeData((prev: any) => {
      const updatedTemp = [...prev];
      updatedTemp[0] = {
        ...updatedTemp[0],
        [name]: value,
      };
      return updatedTemp;
    });
  };

  const handleRequestBtn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        userName: userName,
        userId: userDbId,
        esslId: esslId,
        applyDate: currentDate,
        information: [
          {
            type: "personalInfo",
            oldInfo: oldPersonalInfo,
            newInfo: newPersonalInfo,
          },
          {
            type: "qualificationInfo",
            oldInfo: oldQualificationInfo,
            newInfo: newQualificationInfo,
          },
          {
            type: "statutoryInfo",
            oldInfo: oldStatutoryInfo,
            newInfo: newStatutoryInfo,
          },
        ],
      };
      const response = await postEmployeeDetailsRequest(data);
      if (response.statusCode === 200) {
        router.push("/dashboard");
        toast.success("Request sent successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during Request sent:", error);
      toast.error("An error occurred while Request sent, Please try again.", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchSpecifyEmployeeData = async () => {
      try {
        const response = await specificEmployee(esslId, userDbId);
        setSpecificEmployeeData(response.data);
        setTempSpecificEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchSpecifyEmployeeData();
  }, []);

  // for Database's date format
  const formatISODate = (isoString: any) => {
    return isoString ? new Date(isoString).toISOString().split("T")[0] : "";
  };

  return (
    <>
      <div className="w-full bg-indigo-50 p-4 shadow-md md:p-6">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
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
                      name="photo"
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
                      // value={personalInfo.company}
                      // onChange={handleNewPersonalChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">
                        {tempSpecificEmployeeData[0]?.companyName}
                      </option>
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
                      name="role"
                      // value={personalInfo.role}
                      // onChange={handlePersonalChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-2 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">
                        {tempSpecificEmployeeData[0]?.user_role}
                      </option>
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
                        value={tempSpecificEmployeeData[0]?.esslId}
                        onChange={handleNewPersonalChange}
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
                        value={tempSpecificEmployeeData[0]?.employeeCode}
                        onChange={handleNewPersonalChange}
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
                        value={tempSpecificEmployeeData[0]?.joiningDate}
                        onChange={handleNewPersonalChange}
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
                        value={tempSpecificEmployeeData[0]?.confirmationDate}
                        onChange={handleNewPersonalChange}
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
                          checked={statutoryInfo.probationPeriod}
                          onChange={handleStatutoryChange}
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
                            value={statutoryInfo.probationMonths}
                            onChange={handleStatutoryChange}
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
          </div> */}
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
                      name="photo"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option value="">{tempSpecificEmployeeData[0]?.companyName}</option>
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
                        name="role"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option value="">{tempSpecificEmployeeData[0]?.user_role}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        value={tempSpecificEmployeeData[0]?.esslId}
                        onChange={handleNewPersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                        value={tempSpecificEmployeeData[0]?.employeeCode}
                        onChange={handleNewPersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter Employee Code"
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
                        value={tempSpecificEmployeeData[0]?.joiningDate}
                        onChange={handleNewPersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                        value={tempSpecificEmployeeData[0]?.confirmationDate}
                        onChange={handleNewPersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <div className="mt-1 flex w-full items-center rounded-md border-gray-300 bg-gray-50 px-2 py-2 shadow-sm">
                        <input
                          id="probationPeriod"
                          name="probationPeriod"
                          type="checkbox"
                          checked={statutoryInfo.probationPeriod}
                          onChange={handleStatutoryChange}
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
                            value={statutoryInfo.probationMonths}
                            onChange={handleStatutoryChange}
                            className="ml-5 mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-2 py-1.5 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium  ${activeTab === tab
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
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.firstName}
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
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.middleName || "---"}
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
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.lastName}
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
                        onChange={handleNewPersonalChange}
                        value={formatISODate(
                          tempSpecificEmployeeData[0]?.dateOfBirth,
                        )}
                        className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.gender}
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
                        email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.email}
                        className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        mobileNumber No
                      </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.mobileNumber}
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
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.emergencyNumber}
                        className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter emergency contact number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        onChange={handleNewPersonalChange}
                        value={tempSpecificEmployeeData[0]?.pincode}
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
                      address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      onChange={handleNewPersonalChange}
                      value={tempSpecificEmployeeData[0]?.address}
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
                      className="space-y-4 rounded-md bg-gray-50 p-4 px-2 py-1"
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
                            value={
                              tempSpecificEmployeeData[0]?.workExperience[0]
                                ?.companyName
                            }
                            // onChange={(e) => handleWorkChange(index, e)}
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
                            value={
                              tempSpecificEmployeeData[0]?.workExperience[0]
                                ?.role
                            }
                            // onChange={(e) => handleWorkChange(index, e)}
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
                            value={
                              tempSpecificEmployeeData[0]?.workExperience[0]
                                ?.experience
                            }
                            onChange={(e) => handleWorkChange(index, e)}
                            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter years of experience"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                        id="highestQualification"
                        name="highestQualification"
                        value={
                          tempSpecificEmployeeData[0]?.educationHistory[0]
                            .highestQualification
                        }
                        onChange={handleEducationChange}
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
                        name="year"
                        value={
                          tempSpecificEmployeeData[0]?.educationHistory[0].year
                        }
                        onChange={handleEducationChange}
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
                        type="text"
                        id="marks"
                        name="marks"
                        value={
                          tempSpecificEmployeeData[0]?.educationHistory[0].marks
                        }
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
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        id="adharNumber"
                        name="adharNumber"
                        value={tempSpecificEmployeeData[0]?.adharNumber}
                        onChange={handleStatutoryChange}
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
                        value={tempSpecificEmployeeData[0]?.panNumber}
                        onChange={handleStatutoryChange}
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
                        value={tempSpecificEmployeeData[0]?.bankAccountNumber}
                        onChange={handleStatutoryChange}
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
                        value={tempSpecificEmployeeData[0]?.IFSCCode}
                        onChange={handleStatutoryChange}
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
                onClick={handleRequestBtn}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600  px-4  py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;