'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect, useState } from "react";
import { getSpecificAttrition ,CreateAttrition } from "@/app/api/Allapi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AttritionMaster = ({params:initialParams}:any) => {
  const [params, setParams] = useState<any | null>(null);
  const [specificAttritionData , setSpecificAttritionData] = useState<any>([]);
  const router = useRouter()
  const [formData, setFormData] = useState({
    employee_name: "",
    joining_date: "",
    resign_offer_date: "",
    left_date: "",
    reason_of_leaving: "",
    noticePeriod: "",
  });

  // Calculate notice period based on resign offer date and last working date
  const calculateNoticePeriod = () => {
    const resign_offer_date: any = new Date(formData.resign_offer_date);
    const left_date: any = new Date(formData.left_date);
    const timeDiff: any = left_date - resign_offer_date;
    const noticePeriodInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days
    setFormData((prevState: any) => ({
      ...prevState,
      noticePeriod: noticePeriodInDays > 0 ? noticePeriodInDays : "",
    }));
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    // Handle form submission logic
    const data = formData
    try {
      const response = await CreateAttrition(data)
      if (response.status == 200) {
        router.push('hris/attrition')
        toast.success("Attrition Creatd Successfull")
      }
    } catch (error: any) {
      console.log(error, "Attrition is not Created")
      toast.error("Attrition is not Created")
    }
  };

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    };

    resolveParams();
  }, [initialParams]);



  useEffect(() => {
    if (!params || !params.addAttrition) return;
    const fetchSpecifyEmployeeData = async () => {
      try {
        const response = await getSpecificAttrition(params.addAttrition[1], params.addAttrition[2]);
        setSpecificAttritionData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        // toast.error('An error occurred while fetching attrition data. Please try again.', {
        //   position: 'top-right',
        // });
      }
    };

    fetchSpecifyEmployeeData();

  }, [params]);

  const formatDateForInput = (isoString:any) => {
    return isoString ? new Date(isoString).toISOString().split("T")[0] : "";
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-4xl px-4 md:px-6 ">
        <Breadcrumb pageName=" Add Attrition" />
        {  params && params.addAttrition && params.addAttrition.length <= 1 
      
        ?

        <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
          <div className="max-w-4xl mx-auto p-8 border bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="employee_name" className="text-lg font-semibold">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="employee_name"
                    name="employee_name"
                    value={formData.employee_name}
                    onChange={handleChange}
                    className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="joining_date" className="text-lg font-semibold">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joining_date"
                    name="joining_date"
                    value={formData.joining_date}
                    onChange={handleChange}
                    className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="resign_offer_date" className="text-lg font-semibold">
                    Resign Offer Date
                  </label>
                  <input
                    type="date"
                    id="resign_offer_date"
                    name="resign_offer_date"
                    value={formData.resign_offer_date}
                    onChange={handleChange}
                    onBlur={calculateNoticePeriod}
                    className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="left_date" className="text-lg font-semibold">
                    Last Working Date
                  </label>
                  <input
                    type="date"
                    id="left_date"
                    name="left_date"
                    value={formData.left_date}
                    onChange={handleChange}
                    onBlur={calculateNoticePeriod}
                    className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="reason_of_leaving" className="text-lg font-semibold">
                  Reason for Leaving
                </label>
                <textarea
                  id="reason_of_leaving"
                  name="reason_of_leaving"
                  value={formData.reason_of_leaving}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="noticePeriod" className="text-lg font-semibold">
                  Notice Period (Days)
                </label>
                <input
                  type="text"
                  id="noticePeriod"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  readOnly
                  className="mt-2 p-3 border rounded-md bg-gray-100 text-gray-500"
                />
              </div>

              <button
                type="submit"
                className=" py-2 text-end px-4 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
        :
        
        <div className="w-full bg-indigo-50 p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto p-8 border bg-white">
          <form  className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="employee_name" className="text-lg font-semibold">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employee_name"
                  name="employee_name"
                  value={specificAttritionData[0]?.employee_name}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="joining_date" className="text-lg font-semibold">
                  Joining Date
                </label>
                <input
                  type="date"
                  id="joining_date"
                  name="joining_date"
                  value={formatDateForInput(specificAttritionData[0]?.joining_date)}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="resign_offer_date" className="text-lg font-semibold">
                  Resign Offer Date
                </label>
                <input
                  type="date"
                  id="resign_offer_date"
                  name="resign_offer_date"
                  value={formatDateForInput(specificAttritionData[0]?.resign_offer_date)}
                  onChange={handleChange}
                  onBlur={calculateNoticePeriod}
                  className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="left_date" className="text-lg font-semibold">
                  Last Working Date
                </label>
                <input
                  type="date"
                  id="left_date"
                  name="left_date"
                  value={formatDateForInput(specificAttritionData[0]?.left_date)}
                  onChange={handleChange}
                  onBlur={calculateNoticePeriod}
                  className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason_of_leaving" className="text-lg font-semibold">
                Reason for Leaving
              </label>
              <textarea
                id="reason_of_leaving"
                name="reason_of_leaving"
                value={specificAttritionData[0]?.reason_of_leaving}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="noticePeriod" className="text-lg font-semibold">
                Notice Period (Days)
              </label>
              <input
                type="text"
                id="noticePeriod"
                name="noticePeriod"
                value={"45 days"}
                readOnly
                className="mt-2 p-3 border rounded-md bg-gray-100 text-gray-500"
              />
            </div>

            <button
              className=" py-2 text-end px-4 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={()=> router.push('/dashboard')}
            >
              Save
            </button>
          </form>
        </div>
        </div>
      }
      </div>
    </DefaultLayout>
  );
};

export default AttritionMaster;
