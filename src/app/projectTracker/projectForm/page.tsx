// import React from 'react';

// const ProjectForm = () => {
//   return (
//     <div>
//        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-center mb-4">Multi-step Form</h1>
//           <div className="flex justify-between items-center">
//             {steps.map((s) => (
//               <button
//                 key={s.number}
//                 onClick={() => setStep(s.number)}
//                 className={`flex flex-col items-center justify-center w-12 h-12 rounded-full text-xs font-medium transition-colors duration-300 ${
//                   step === s.number
//                     ? 'bg-blue-500 text-white'
//                     : step > s.number
//                     ? 'bg-green-500 text-white'
//                     : 'bg-gray-200 text-gray-600'
//                 }`}
//               >
//                 <span>{s.number}</span>
//                 <span className="mt-1">{s.title}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//         {renderStep()}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={prevStep}
//             disabled={step === 1}
//             className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
//               step === 1
//                 ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 : 'bg-white text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Previous
//           </button>
//           <button
//             onClick={nextStep}
//             className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
//               step === 5
//                 ? 'bg-green-500 text-white hover:bg-green-600'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             {step === 5 ? 'Submit' : 'Next'}
//             {step !== 5 && <ChevronRight className="w-5 h-5 ml-1" />}
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProjectForm;

'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'

const ProjectForm = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        personalInfo: { selectProject: '', projectName: '', projectType: '', source: '', representiveName: '', clientName: '', personName: '', personNumber: '', date1talk: '', details: '', sendEmail: false, sendWhatsapp: '' },

        address: { MSA: '', DSA: '', NONSOLICITATION: '', date1: '', date2: '', date3: '', projectDetails: '' },

        education: { poc: '', noresource: '', startDate: '', endDate: '', assigneTo: '', remarks: '' },


        workExperience: { company: '', position: '', yearsOfExperience: '' },
        skills: { skillList: '' }
    })

    const updateFormData = (step: string, field: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [step]: {
                ...prevData[step as keyof typeof prevData],
                [field]: value
            }
        }))
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

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                        <label htmlFor="">Select Existing Project</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border rounded"
                            value={formData.personalInfo.selectProject}
                            onChange={(e) => updateFormData('personalInfo', 'selectProject', e.target.value)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="">Project Name</label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.personName}
                                    onChange={(e) => updateFormData('personalInfo', 'personName', e.target.value)}
                                />``
                            </div>
                            <div>
                                <label htmlFor="">Project Type</label>

                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.projectType}
                                    onChange={(e) => updateFormData('personalInfo', 'projectType', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="">Source of Project  </label>

                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.source}
                                    onChange={(e) => updateFormData('personalInfo', 'source', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Representive Name</label>

                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.representiveName}
                                    onChange={(e) => updateFormData('personalInfo', 'representiveName', e.target.value)}
                                />
                            </div>


                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="">Client Name</label>

                                <input
                                    type="text"
                                    placeholder="Phone"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.clientName}
                                    onChange={(e) => updateFormData('personalInfo', 'clientName', e.target.value)}
                                />
                            </div>


                            <div>
                                <label htmlFor="">Date of 1st Talk </label>

                                <input
                                    type="date"
                                    placeholder="Phone"
                                    className="w-full p-2 border rounded"
                                    value={formData.personalInfo.date1talk}
                                    onChange={(e) => updateFormData('personalInfo', 'date1talk', e.target.value)}
                                />
                            </div>

                        </div>


                        <div>

                            <label htmlFor="">Send Email</label>

                            <input
                                type="checkbox"
                                placeholder="Phone"
                                className="w-full p-2 border rounded"
                                value={formData.personalInfo.sendEmail}
                                onChange={(e) => updateFormData('personalInfo', 'sendEmail', e.target.value)}
                            />
                        </div>


                        <div>
                            <label htmlFor="">Send Message on WhatsApp to Client</label>

                            <input
                                type="checkbox"
                                placeholder="Phone"
                                className="w-full p-2 border rounded"
                                value={formData.personalInfo.sendWhatsapp}
                                onChange={(e) => updateFormData('personalInfo', 'sendWhatsapp', e.target.value)}
                            />
                        </div>




                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Project Creation</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="">MSA</label>
                                <input
                                    type="checkbox"
                                    placeholder="Street"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.MSA}
                                    onChange={(e) => updateFormData('address', 'MSA', e.target.value)}
                                />
                                <label htmlFor="">DSA</label>
                                <input
                                    type="checkbox"
                                    placeholder="City"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.DSA}
                                    onChange={(e) => updateFormData('address', 'DSA', e.target.value)}
                                />
                                <label htmlFor="">NONSOLICITATION</label>
                                <input
                                    type="checkbox"
                                    placeholder="City"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.NONSOLICITATION}
                                    onChange={(e) => updateFormData('address', 'NONSOLICITATION', e.target.value)}
                                />
                            </div>

                            <div>

                                <label htmlFor="">Date 1 </label>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.date1}
                                    onChange={(e) => updateFormData('address', 'date1', e.target.value)}
                                />
                                <label htmlFor="">Date 2 </label>
                                <input
                                    type="date"
                                    placeholder="Zip Code"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.date2}
                                    onChange={(e) => updateFormData('address', 'date2', e.target.value)}
                                />
                                <label htmlFor="">Date 3 </label>
                                <input
                                    type="date"
                                    placeholder="Zip Code"
                                    className="w-full p-2 border rounded"
                                    value={formData.address.date3}
                                    onChange={(e) => updateFormData('address', 'date3', e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Resources Planning</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor=""> POC </label>
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    className="w-full p-2 border rounded"
                                    value={formData.education.poc}
                                    onChange={(e) => updateFormData('education', 'poc', e.target.value)}
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
                        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                        <input
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
                        />
                    </div>
                )
            case 5:
                return (
                    <div className="space-y-4">
                        {/* <h2 className="text-2xl font-bold mb-4">Skills and Summary</h2> */}
                        {/* <textarea
                            placeholder="List your skills (comma-separated)"
                            className="w-full p-2 border rounded h-32"
                            value={formData.skills.skillList}
                            onChange={(e) => updateFormData('skills', 'skillList', e.target.value)}
                        /> */}
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-lg font-semibold mb-2">Form Data Summary (JSON):</h3>
                            <pre className="whitespace-pre-wrap break-words">
                                {JSON.stringify(formData, null, 2)}
                            </pre>
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
                                {renderStep()}
                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={prevStep}
                                        disabled={step === 1}
                                        className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium ${step === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-1" />
                                        Previous
                                    </button>
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