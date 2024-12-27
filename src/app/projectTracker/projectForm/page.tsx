'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Select from 'react-select';
import { CreateProject, ProjectList } from '@/app/api/Allapi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {NotFoundPage} from '@/components/NotFoundPage/page'
import { useUserDetailsContext } from "@/context/UserDetailsContext";

interface FormData {
    personalInfo: {
        selectProject: string
        projectName: string
        projectType: string
        source: string
        representative: string
        clientName: string
        personName: string
        personNumber: string
        date1talk: string
        details: string
        sendEmail: boolean
        sendWhatsapp: boolean
    }
    address: {
        MSA: boolean
        DSA: boolean
        NONSOLICITATION: boolean
        date1: string
        date2: string
        date3: string
        projectDetails: string
    }
    education: {
        poc: string
        noresource: string
        startDate: string
        endDate: string
        assigneTo: string
        remarks: string
    }
    workExperience: {
        company: string
        position: string
        yearsOfExperience: string
    }
    skills: {
        skillList: string
    }
}

const ProjectForm = () => {
    const router = useRouter()
    const {userDetails, setUserDetails}:any = useUserDetailsContext();
    if(userDetails?.user_role == 'employee') return(<NotFoundPage/>);
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        personalInfo: { selectProject: '', projectName: '', projectType: '', source: '', representative: '', clientName: '', personName: '', personNumber: '', date1talk: '', details: '', sendEmail: false, sendWhatsapp: false },
        address: { MSA: false, DSA: false, NONSOLICITATION: false, date1: '', date2: '', date3: '', projectDetails: '' },
        education: { poc: '', noresource: '', startDate: '', endDate: '', assigneTo: '', remarks: '' },
        workExperience: { company: '', position: '', yearsOfExperience: '' },
        skills: { skillList: '' }
    })

    const [selectedOptions, setSelectedOptions] = useState([]);
    // Options for the select dropdown
    const [options, setOptions] = useState([])


    const handleChange = (selected: any) => {
        setSelectedOptions(selected);
    };

    const projectListDetails = async () => {
        const response = await ProjectList()
        const formattedOptions = response.data.map((project: any) => ({
            value: project._id,
            label: project.projectName,
        }))
        setOptions(formattedOptions)
    }
    useEffect(() => {
        projectListDetails()
    }, [])

    const updateFormData = (step: keyof FormData, field: string, value: any) => {
        setFormData(prevData => ({
            ...prevData,
            [step]: {
                ...prevData[step],
                [field]: value
            }
        }))
    }

    const handleProjectSelection = async (selectedProjectId: string) => {
        try {
            const response = await ProjectList()
            const selectedProject = response.data.find((project: any) => project._id === selectedProjectId)
            console.log("testing", selectedProject)
            if (selectedProject) {
                setFormData(prevData => ({
                    ...prevData,
                    personalInfo: {
                        ...prevData.personalInfo,
                        selectProject: selectedProjectId,
                        projectName: selectedProject.projectName || '',
                        projectType: selectedProject.projectType || '',
                        source: selectedProject.source || '',
                        representative: selectedProject.representative || '',
                        clientName: selectedProject.clientName || '',
                        personName: selectedProject.personName || '',
                        personNumber: selectedProject.personNumber || '',
                        date1talk: selectedProject.date1talk || '',
                        details: selectedProject.details || '',
                        sendEmail: selectedProject.sendEmail || false,
                        sendWhatsapp: selectedProject.sendWhatsapp || false,
                        MSA: selectedProject.agreements.msa || false,
                        DSA: selectedProject.agreements.dsa || false,
                        NONSOLICITATION: selectedProject.agreements.NONSOLICITATION || false
                    }
                }))
            }
            else {
                setFormData(prevData => ({
                    ...prevData,
                    personalInfo: {
                        ...prevData.personalInfo,
                        selectProject: '',
                        projectName: '',
                        projectType: '',
                        source: '',
                        representative: '',
                        clientName: '',
                        personName: '',
                        personNumber: '',
                        date1talk: '',
                        details: '',
                        sendEmail: false,
                        sendWhatsapp: false,
                        MSA: false,
                        DSA: false,
                        NONSOLICITATION: false
                    }
                }))
            }
        } catch (error) {
            console.error('Error fetching project details:', error)
        }
    }

    const nextStep = () => setStep(step < 5 ? step + 1 : step)
    const prevStep = () => setStep(step > 1 ? step - 1 : step)

    const steps = [
        { number: 1, title: '1st Talk' },
        { number: 2, title: 'Project Creation' },
        { number: 3, title: 'Resource Planning' },
        { number: 4, title: 'Running' },
        { number: 5, title: 'Complete' },
    ]


    //multple form
    const [forms, setForms] = useState([{ id: 1, data: {} }]);

    // Add a new form
    const addForm = () => {
        setForms([...forms, { id: forms.length + 1, data: {} }]);
    };

    // Remove a form by ID
    const removeForm = (id: any) => {
        setForms(forms.filter((form) => form.id !== id));
    };

    //Handle input changes
    const handleInputChange = (id: any, field: any, value: any) => {
        setForms(
            forms.map((form) =>
                form.id === id
                    ? { ...form, data: { ...form.data, [field]: value } }
                    : form
            )
        );
    };

    const createProjectData = async () => {
        await CreateProject(formData)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Transform formData into the desired JSON format
        const transformedData = {
            projectName: formData.personalInfo.projectName,
            projectType: formData.personalInfo.projectType,
            source: formData.personalInfo.source,
            representative: formData.personalInfo.representative,
            clientName: formData.personalInfo.clientName,
            projectDetails: formData.address.projectDetails,
            contactPerson: formData.personalInfo.personName,
            contactNumber: formData.personalInfo.personNumber,
            firstTalkDate: formData.personalInfo.date1talk,
            sendEmail: formData.personalInfo.sendEmail,
            interested: formData.personalInfo.sendWhatsapp, // Assuming this represents "interested"
            resultFirstTalk: formData.personalInfo.details, // Assuming this represents "resultFirstTalk"
            resources: [
                {
                    assignedTo: formData.education.assigneTo,
                    numberOfResources: formData.education.noresource,
                    startDate: formData.education.startDate,
                    expectedEndDate: formData.education.endDate,
                    remarks: formData.education.remarks,
                },
            ],
            agreements: {
                msa: { checked: formData.address.MSA, dateTime: formData.address.date1 },
                dsa: { checked: formData.address.DSA, dateTime: formData.address.date2 },
                nonSolicitation: { checked: formData.address.NONSOLICITATION, dateTime: formData.address.date3 },
            },
        };

        try {
            console.log("Transformed Data:", transformedData);

            // Call the CreateProject API
            const response = await CreateProject(transformedData);

            if (response.ok) {
                const result = await response.json();

                toast.success("Projects created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                console.log("Form submitted successfully:", result);
                // Navigate to the project tracker page after submission
                router.push("projectTracker/projectList");
            } else {
                throw new Error("Failed to create the project");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };




    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        {/* <h2 className="text-2xl font-bold mb-4">1st Talk</h2> */}
                        <label htmlFor="selectProject">Select Existing Project</label>
                        <select
                            id="selectProject"
                            className='w-full p-2 border rounded'
                            value={formData.personalInfo.selectProject}
                            onChange={(e) => {
                                updateFormData('personalInfo', 'selectProject', e.target.value)
                                handleProjectSelection(e.target.value)
                            }}
                        >
                            <option value="none">None</option>
                            {options.map((option: any) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="projectName">Project Name</label>
                                <input
                                    id="projectName"
                                    type="text"
                                    placeholder="Project Name"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.projectName}
                                    onChange={(e) => updateFormData('personalInfo', 'projectName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="projectType">Project Type</label>
                                <input
                                    id="projectType"
                                    type="text"
                                    placeholder="Project Type"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.projectType}
                                    onChange={(e) => updateFormData('personalInfo', 'projectType', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="source">Source of Project</label>
                                <input
                                    id="source"
                                    type="text"
                                    placeholder="Source of project"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.source}
                                    onChange={(e) => updateFormData('personalInfo', 'source', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="representative">Representative Name</label>
                                <input
                                    id="representative"
                                    type="text"
                                    placeholder="Representative Name"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.representative}
                                    onChange={(e) => updateFormData('personalInfo', 'representative', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="clientName">Client Name</label>
                                <input
                                    id="clientName"
                                    type="text"
                                    placeholder="Client Name"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.clientName}
                                    onChange={(e) => updateFormData('personalInfo', 'clientName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="date1talk">Date of 1st Talk</label>
                                <input
                                    id="date1talk"
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.date1talk}
                                    onChange={(e) => updateFormData('personalInfo', 'date1talk', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={''}
                                className="form-checkbox h-3 w-5 text-blue-600 transition duration-150 ease-in-out"
                                checked={formData.personalInfo.sendEmail}
                                onChange={(e) => updateFormData('personalInfo', 'sendEmail', e.target.checked)}
                            />
                            <span className="text-gray-400  ms-4 font-medium">{'Send Message on Email to Client'} </span>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={''}
                                className="form-checkbox h-3 w-5 text-blue-600 transition duration-150 ease-in-out"
                                checked={formData.personalInfo.sendWhatsapp}
                                onChange={(e) => updateFormData('personalInfo', 'sendWhatsapp', e.target.checked)}
                            />
                            <span className="text-gray-400  ms-4 font-medium">{'Send Message on WhatsApp to Client'} </span>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Agreements</h3>
                                <div className="space-y-2">
                                    {['MSA', 'DSA', 'NONSOLICITATION'].map((agreement) => (
                                        <label key={agreement} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
                                            <input
                                                type="checkbox"
                                                id={agreement}
                                                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                                checked={formData.address[agreement as keyof typeof formData.address] as boolean}
                                                onChange={(e: any) => updateFormData('address', agreement, e.target.checked)}
                                            />
                                            <span className="text-gray-900 font-medium">{agreement}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Important Dates</h3>
                                {['date1', 'date2', 'date3'].map((dateField, index) => (
                                    <div key={dateField}>
                                        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Date {index + 1}</label> */}
                                        <input
                                            type="date"
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition duration-150 ease-in-out"
                                            value={formData.address[dateField as keyof typeof formData.address] as string}
                                            onChange={(e) => updateFormData('address', dateField, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label> */}
                            <textarea
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition duration-150 ease-in-out"
                                rows={4}
                                value={formData.address.projectDetails}
                                onChange={(e) => updateFormData('address', 'projectDetails', e.target.value)}
                                placeholder="Enter project details..."
                            ></textarea>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor=""> POC </label>
                                <Select
                                    isMulti
                                    name="fruits"
                                    options={options}
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Select fruits"
                                    isClearable
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: '#ddd',
                                            borderRadius: '0.375rem',
                                            padding: '0.25rem',
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#4caf50',
                                            borderRadius: '1rem',
                                            color: '#fff',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="">No Of Resource</label>
                                <input
                                    type="numbers"
                                    placeholder="Institution"
                                    className="w-full p-2 border rounded"
                                    value={formData.education.noresource}
                                    onChange={(e) => updateFormData('education', 'noresource', e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor=""> Start Date</label>
                                <input
                                    type="number"
                                    placeholder="Graduation Year"
                                    className="w-full p-2 border rounded"
                                    value={formData.education.startDate}
                                    onChange={(e) => updateFormData('education', 'startDate', e.target.value)}
                                />
                            </div>


                            <div>
                                <label htmlFor=""> assigneTo</label>
                                <select name="" className='w-full p-2 border rounded' id="">
                                    {options.map((option: any) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>

                                <label htmlFor=""> End Date</label>
                                <input
                                    type="date"
                                    placeholder="Graduation Year"
                                    className="w-full p-2 border rounded"
                                    value={formData.education.endDate}
                                    onChange={(e) => updateFormData('education', 'endDate', e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor=""> Remarks</label>
                                <input
                                    type="text"
                                    placeholder="Graduation Year"
                                    className="w-full p-2 border rounded"
                                    value={formData.education.remarks}
                                    onChange={(e) => updateFormData('education', 'remarks', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                )
            case 4:
                return (
                    <div className="space-y-4">
                        {/* <input
                            type="text"
                            placeholder="Company"
                            className="w-full p-2 border rounded"
                            value={formData.workExperience.company}
                            onChange={(e) => updateFormData('workExperience', 'company', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            className="w-full p-2 border rounded"
                            value={formData.workExperience.position}
                            onChange={(e) => updateFormData('workExperience', 'position', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Years of Experience"
                            className="w-full p-2 border rounded"
                            value={formData.workExperience.yearsOfExperience}
                            onChange={(e) => updateFormData('workExperience', 'yearsOfExperience', e.target.value)}
                        /> */}
                        <div className="container mx-auto px-4">
                            {/* <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Multi Form</h1> */}
                            <div className=''>
                                <div>
                                    Actual Start Date-<input
                                        type="date"
                                        placeholder="Actual Start Date"
                                        // onChange={(e) =>
                                        //     handleInputChange(form.id, "milestoneName", e.target.value)
                                        // }
                                        className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-3"
                                    />
                                </div>
                                <div>
                                    Actual End Date- <input
                                        type="date"
                                        placeholder="Actual End  Date"
                                        // onChange={(e) =>
                                        //     handleInputChange(form.id, "milestoneName", e.target.value)
                                        // }
                                        className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                            <div className=" flex justify-start mt-4 mb-3">
                                <button
                                    onClick={addForm}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    +
                                </button>
                            </div>
                            <div className="space-y-6">
                                {forms.map((form) => (
                                    <div
                                        key={form.id}
                                        className="bg-white shadow-md rounded-lg p-4 space-y-4"
                                    >
                                        {/* First Row: Milestone Name, Assigned, Start Date, Due Date */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                                            <input
                                                type="text"
                                                placeholder="Milestone Name"
                                                onChange={(e) =>
                                                    handleInputChange(form.id, "milestoneName", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Assigned"
                                                onChange={(e) =>
                                                    handleInputChange(form.id, "assigned", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                onChange={(e) =>
                                                    handleInputChange(form.id, "startDate", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Due Date"
                                                onChange={(e) =>
                                                    handleInputChange(form.id, "dueDate", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                        {/* Second Row: Actual Start Date, Actual End Date, Assign To */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <input
                                                type="date"
                                                placeholder="Actual Start Date"
                                                onChange={(e) =>
                                                    handleInputChange(form.id, "actualStartDate", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Actual End Date"
                                                onChange={(e: any) =>
                                                    handleInputChange(form.id, "actualEndDate", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <select
                                                onChange={(e: any) =>
                                                    handleInputChange(form.id, "assignTo", e.target.value)
                                                }
                                                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            >
                                                <option value="">Assign To</option>
                                                <option value="John">John</option>
                                                <option value="Jane">Jane</option>
                                                <option value="Doe">Doe</option>
                                            </select>
                                            <button
                                                onClick={() => removeForm(form.id)}
                                                className="  w-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='d-flex mt-4' >
                                <label htmlFor="" className='mb-5'> Project Demo ivitiated</label>
                                <label key={''} className="flex justify-between items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id={''}
                                            className="form-checkbox  h-3.5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                        // checked={formData.address[agreement as keyof typeof formData.address] as boolean}
                                        // onChange={(e: any) => updateFormData('address', agreement, e.target.checked)}
                                        />
                                        <span className="ms-5 text-gray-900 font-medium">Save Date & time</span>
                                    </div>
                                    <div>
                                        <button className='bg-green-500 px-4 py-1 text-white rounded-lg hover:bg-red-600 transition'> Save</button>
                                    </div>


                                </label>


                            </div>

                        </div>

                    </div>
                )
            case 5:
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="max-h-95 overflow-auto bg-gray-200 p-2 rounded border">
                                <pre className="whitespace-pre-wrap break-words">
                                    {JSON.stringify(formData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-10xl px-4 md:px-6 ">
                {/* <Breadcrumb pageName="Project List" /> */}
                <div className="w-[70%]  mx-auto  bg-indigo-50 p-4 md:p-6 shadow-md">
                    <div className="overflow-x-auto ">
                        {/* Header */}
                        <div className="flex mb-5 items-center gap-2 text-xl text-gray-600">
                            <span>Projects</span>
                            <ChevronRight className="h-5 w-5" />
                            <span>Create Project</span>
                        </div>
                        <div className="flex  justify-center px-4 sm:px-6 lg:px-8">
                            <div className=" w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
                                <div className="mb-8">
                                    {/* <h1 className="text-3xl font-bold text-center mb-4">Multi-step Form</h1> */}
                                    <div className="mx-auto">
                                        <div className="w-[70%] mx-auto flex  justify-between items-center">
                                            {steps.map((s) => (
                                                <button
                                                    key={s.number}
                                                    onClick={() => setStep(s.number)}
                                                    className={`flex flex-col items-center justify-center px-5 h-10  rounded-2xl text-xs  font-medium transition-colors duration-300 ${step === s.number
                                                        ? 'bg-indigo-500 text-white'
                                                        : step > s.number
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                        }`}
                                                >
                                                    <span className="mt-1">{s.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="min-h-[400px] sm:min-h-[600px] lg:min-h-[400px] flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl mb-6 font-bold">
                                            {step === 1
                                                ? "1st Talk"
                                                : step === 2
                                                    ? "Project Creation"
                                                    : step === 3
                                                        ? "Resource Planning"
                                                        : step === 4
                                                            ? "Running"
                                                            : "Complete"}
                                        </h2>
                                        {renderStep()}
                                    </div>
                                </div>
                                {/* {renderStep()} */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={prevStep}
                                        disabled={step === 1}
                                        className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${step === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-1" />
                                        Back
                                    </button>


                                    {step == 1 || step == 2 || step == 3 ? (
                                        <div className='flex'>
                                            <button
                                                onClick={handleSubmit}
                                                className={"items-end px-4 py-2 me-2 border bg-green text-white rounded-md text-sm font-medium"}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={nextStep}
                                                className={` items-end px-4 py-2 border rounded-md text-sm font-medium ${'bg-indigo-500 text-white cursor-not-allowed'}`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )
                                        :
                                        step == 4 ? (
                                            <div className='flex'>
                                                <button
                                                    onClick={handleSubmit}
                                                    className={"items-end px-4 py-2 me-2 border bg-green text-white rounded-md text-sm font-medium"}
                                                >
                                                    Close complete
                                                </button>
                                                <button
                                                    onClick={nextStep}
                                                    className={` items-end px-4 py-2 border rounded-md text-sm font-medium ${'bg-indigo-500 text-white cursor-not-allowed'}`}
                                                >
                                                    Close incomplete
                                                </button>
                                            </div>
                                        )

                                            : (
                                                <button
                                                    onClick={()=> {nextStep(), router.push('/projectTracker/projectList')}}
                                                    className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${step === 5
                                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                                        }`}
                                                >
                                                    {step === 5 ? 'Submit' : null}
                                                    {step !== 5 && <ChevronRight className="w-5 h-5 ml-1" />}
                                                </button>
                                            )}

                                    {/* <div>
                                        <button
                                            onClick={nextStep}
                                            className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${step === 5
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                                }`}
                                        >
                                            {step === 5 ? 'Submit' : 'Next'}
                                            {step !== 5 && <ChevronRight className="w-5 h-5 ml-1" />}
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    );
}

export default ProjectForm