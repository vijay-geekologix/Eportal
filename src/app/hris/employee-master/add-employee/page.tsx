'use client'

import React, { useState } from 'react'
import { Camera, Upload, Plus, Minus } from 'lucide-react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { CreateEmployee } from '@/app/api/user'
import { toast } from "react-toastify";   
import { useRouter } from 'next/navigation'

interface PersonalInfo {
  firstName: string
  middleName: string
  lastName: string
  company: string
  role: string
  email: string
  mobileNumber: string
  dateOfBirth: string
  gender: string
  address: string
  emergencyNumber: string
  pincode: string
}

interface WorkExperience {
  companyName: string
  role: string
  experience: string
}

interface Education {
  qualification: string
  year: string
  marks: string
}

interface StatutoryInfo {
  adharNumber: string
  panNumber: string
  bankAccountNumber: string
  IFSCCode: string
  branchName: string
  probationPeriod: boolean
  probationMonths: string
}

const EmployeeProfile: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'personal' | 'qualification' | 'statutory'>('personal')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyNumber: '',
    pincode: '',
  })
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { companyName: '', role: '', experience: '' },
  ])
  const [education, setEducation] = useState<Education>({ qualification: '', year: '', marks: '' })
  const [statutoryInfo, setStatutoryInfo] = useState<StatutoryInfo>({
    adharNumber: '',
    panNumber: '',
    bankAccountNumber: '',
    IFSCCode: '',
    branchName: '',
    probationPeriod: false,
    probationMonths: '',
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleWorkChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWorkExperience((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [name]: value }
      return updated
    })
  }

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEducation((prev) => ({ ...prev, [name]: value }))
  }

  const addWorkExperience = () => {
    setWorkExperience((prev) => [...prev, { companyName: '', role: '', experience: '' }])
  }

  const removeWorkExperience = (index: number) => {
    setWorkExperience((prev) => prev.filter((_, i) => i !== index))
  }

  const handleStatutoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setStatutoryInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare the data to be sent
    const formData = {
        photo: profileImage,
        companyName: personalInfo.company,
        firstName: personalInfo.firstName,
        middleName: personalInfo.middleName,
        lastName: personalInfo.lastName,
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
        probationMonths: statutoryInfo.probationPeriod ? statutoryInfo.probationMonths : null,
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
        const response = await CreateEmployee(formData);
        // if (response) { // Assuming `response.ok` indicates a successful request
            const result = await response.json();

            // if (result.statusCode === 201) {
                toast.success("Employee created successfully!", {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                console.log("Form submitted successfully:", result);

                // Redirect after toast
                setTimeout(() => {
                    router.push("/employee-master");
                }, 3000); // Delay redirect until after the toast disappears
            // }
        // } 
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred while submitting the form. Please try again.", {
            position: "top-right",
            autoClose: 3000,
        });
    }
};


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-6xl px-4 md:px-6 ">
        <Breadcrumb pageName="Add Employee" />
        <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Camera className="text-gray-400" size={48} />
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <select
                        id="company"
                        name="company"
                        onChange={handlePersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="">Select Company</option>
                        <option value="NowAwave">NowAwave</option>
                        <option value="Geekologix">Geekologix</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        onChange={handlePersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  {['personal', 'qualification', 'statutory'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'personal' | 'qualification' | 'statutory')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          id="middleName"
                          name="middleName"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter middle name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                          gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                          mobileNumber No
                        </label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter mobileNumber number"
                        />
                      </div>
                      <div>
                        <label htmlFor="emergencyNumber" className="block text-sm font-medium text-gray-700">
                          Emergency No
                        </label>
                        <input
                          type="tel"
                          id="emergencyNumber"
                          name="emergencyNumber"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter emergency contact number"
                        />
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                          pincode
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          onChange={handlePersonalChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        onChange={handlePersonalChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Enter full address"
                      ></textarea>
                    </div>
                  </div>
                )}

                {activeTab === 'qualification' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Work Experience</h3>
                    {workExperience.map((work, index) => (
                      <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-md">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div>
                            <label htmlFor={`companyName-${index}`} className="block text-sm font-medium text-gray-700">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id={`companyName-${index}`}
                              name="companyName"
                              value={work.companyName}
                              onChange={(e) => handleWorkChange(index, e)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                              placeholder="Enter company name"
                            />
                          </div>
                          <div>
                            <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700">
                              Role
                            </label>
                            <input
                              type="text"
                              id={`role-${index}`}
                              name="role"
                              value={work.role}
                              onChange={(e) => handleWorkChange(index, e)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                              placeholder="Enter role"
                            />
                          </div>
                          <div>
                            <label htmlFor={`experience-${index}`} className="block text-sm font-medium text-gray-700">
                              Experience (Years)
                            </label>
                            <input
                              type="number"
                              id={`experience-${index}`}
                              name="experience"
                              value={work.experience}
                              onChange={(e) => handleWorkChange(index, e)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                              placeholder="Enter years of experience"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeWorkExperience(index)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Minus className="h-4 w-4 mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <button
                        type="button"
                        onClick={addWorkExperience}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Work Experience
                      </button>
                    </div>

                    <h3 className="text-lg font-medium leading-6 text-gray-900 mt-8">Education History</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div>
                        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                          Highest Qualification
                        </label>
                        <input
                          type="text"
                          id="qualification"
                          name="qualification"
                          value={education.qualification}
                          onChange={handleEducationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter highest qualification"
                        />
                      </div>
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                          Year
                        </label>
                        <input
                          type="text"
                          id="year"
                          name="year"
                          value={education.year}
                          onChange={handleEducationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter year of completion"
                        />
                      </div>
                      <div>
                        <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                          Marks
                        </label>
                        <input
                          type="text"
                          id="marks"
                          name="marks"
                          value={education.marks}
                          onChange={handleEducationChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter marks obtained"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'statutory' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="adharNumber" className="block text-sm font-medium text-gray-700">
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          id="adharNumber"
                          name="adharNumber"
                          value={statutoryInfo.adharNumber}
                          onChange={handleStatutoryChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter Aadhar number"
                        />
                      </div>
                      <div>
                        <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          id="panNumber"
                          name="panNumber"
                          value={statutoryInfo.panNumber}
                          onChange={handleStatutoryChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter PAN number"
                        />
                      </div>
                      <div>
                        <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">
                          Bank Account Number
                        </label>
                        <input
                          type="text"
                          id="bankAccountNumber"
                          name="bankAccountNumber"
                          value={statutoryInfo.bankAccountNumber}
                          onChange={handleStatutoryChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter bank account number"
                        />
                      </div>
                      <div>
                        <label htmlFor="IFSCCode" className="block text-sm font-medium text-gray-700">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          id="IFSCCode"
                          name="IFSCCode"
                          value={statutoryInfo.IFSCCode}
                          onChange={handleStatutoryChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter IFSC code"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="probationPeriod"
                        name="probationPeriod"
                        type="checkbox"
                        checked={statutoryInfo.probationPeriod}
                        onChange={handleStatutoryChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="probationPeriod" className="ml-2 block text-sm text-gray-900">
                        Probation Period Applies
                      </label>
                    </div>
                    {statutoryInfo.probationPeriod && (
                      <div>
                        <label htmlFor="probationMonths" className="block text-sm font-medium text-gray-700">
                          Probation Months
                        </label>
                        <input
                          type="number"
                          id="probationMonths"
                          name="probationMonths"
                          value={statutoryInfo.probationMonths}
                          onChange={handleStatutoryChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter probation period in months"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-6 py-3 bg-gray-50 text-right">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default EmployeeProfile

