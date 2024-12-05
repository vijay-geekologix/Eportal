"use client"
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { ChevronRight } from 'lucide-react';
import { ProjectList } from '@/app/api/Allapi';
import toast from 'react-hot-toast';
import { MdDelete, MdDeleteForever } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProjectList4 = () => {
  const router = useRouter()
  const [projectData, setProjectData] = useState<any[]>([]);  // Holds the project list from the API
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [totalPages, setTotalPages] = useState(1);  // Track total pages

  const itemsPerPage = 10;  // Set the page limit to 5 items per page

  // Fetch project data from the API
  const getProjectList = async () => {
    try {
      const data = await ProjectList(); // This calls the function that fetches the project list
      console.log("Project List Data:", data.data);
      setProjectData(data.data);  // Set the fetched project data

      // Set total pages based on the length of the fetched data
      setTotalPages(Math.ceil(data.data.length / itemsPerPage));

      if (data.data.length > 0) {
        toast.success("Project List fetched successfully!");
      } else {
        toast.error("No projects found!");
      }
    } catch (error) {
      console.error("Error fetching project list:", error);
      toast.error("Failed to fetch project list.");
    }
  };

  // useEffect hook to call the API when the component mounts
  useEffect(() => {
    getProjectList();
  }, []);
  const formatWithDots = (text: string, limit: number = 20) => {
    // If the text length is greater than the limit, truncate and append '...'
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text; // Otherwise, return the original text
  };
  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = projectData.slice(startIndex, startIndex + itemsPerPage);

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <DefaultLayout>
        <div className="mx-auto max-w-10xl px-4 md:px-6 ">
          <Breadcrumb pageName="Project List" />
          <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
           <div className="bg-white shadow-lg rounded-lg p-6">

            <div className="overflow-x-auto">
              {/* Header */}
              <div className="flex mb-5 items-center gap-2 text-xl text-gray-600">
                <span>Projects</span>
                <ChevronRight className="h-5 w-5" />
                <span>Project List</span>
              </div>

              {/* Table for displaying projects */}
              <div className="text-right space-y-4 sm:space-y-0 sm:space-x-4  flex-col sm:flex-row mb-2">
                <button onClick={()=> router.push('/projectTracker/projectForm')} className="px-6 py-2 rounded-lg border border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 transition-all duration-300">
                  Create Project
                </button>
                <button className="px-6 py-2 rounded-lg border border-gray-300 bg-red text-white hover:bg-red-600 focus:ring-2 focus:ring-gray-400 transition-all duration-300">
                  Delete
                </button>
              </div>

              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">Project Name</th>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">Project Details</th>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">Client Name</th>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">Project Type</th>
                    <th className="border px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th> */}
                  </tr>
                </thead>
                <tbody>

                  {
                    paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="border-t text-center py-4 text-gray-500">
                          No data available! Please check back later.
                        </td>

                      </tr>
                    ) : (
                      paginatedData.map((item: any, index: number) => (
                        <tr key={item.id} className="border-t">
                          {/* Adjust the ID based on currentPage */}
                          <td className="border px-6 py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                          <td className="border px-6 py-4 text-sm underline text-blue-500 hover:text-blue-700" 
                          onClick={() => router.push(`/projectTracker/projectForm?projectName=${(item._id)}`)}
                           >{item.projectName} 
                            </td>
                          <td className="border px-6 py-4 text-sm text-gray-700">{formatWithDots(item.projectDetails)}</td>
                          <td className="border px-6 py-4 text-sm text-gray-700">{item.clientName}</td>
                          <td className="border px-6 py-4 text-sm text-gray-700">{item.projectType}</td>
                          <td className="border px-6 py-4 text-sm text-gray-700">{item.status}</td>
                          {/* <td className="px-6 py-4 text-sm text-gray-700"><  MdDelete className='text-red text-2xl font-bold' /></td> */}
                        </tr>
                      ))
                    )
                  }


                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {/* <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span> */}
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
         </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ProjectList4;
