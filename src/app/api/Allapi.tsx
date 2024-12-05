import api from "./httpClient"


interface LoginResponse {
  token: string;
}

// Auth Api
const login = async (data: any): Promise<void> => {
  try {
    const response: any = await api.post<LoginResponse>("admin/login", data);
    const token = response.data.data.token;
    console.log("Res", response.data.data.user.user_role)
    // Save the token in localStorage
    if (token) {

      localStorage.setItem("authToken", token);
      localStorage.setItem("user_role", response.data.data.user.user_role);

      console.log("Login successful! Token saved.");
    } else {
      console.error("No token received from API.");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

// Project Api
const ProjectList = async (): Promise<any> => {
  try {
    const response = await api.get("admin/projectDetails/getProjectDetails");
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

const CreateProject = async (data: any): Promise<any> => {
  try {
    const response = await api.post("admin/projectDetails/createProjectDetails", data)
    console.log("Full Response:", response);
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

// Employee Api
const EmployeeList = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/getEmployee")
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}


const CreateEmployee = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/createEmployee", data)
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}


const DeleteEmployee = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/deleteEmployee", data)
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

const specificEmployee = async (esslId:any , _id:any): Promise<any> =>{
  try {
    const data = {
      esslId:esslId,
      _id:_id,
    }
    const response = await api.get("/Employee/specificEmployee", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching specificEmployee list:",error);
    throw error;
  }
}

const AttendenceList = async (
  userESSLid?: string,
  startDate?: string,
  endDate?: string
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (userESSLid) params.userESSLid = userESSLid;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/Employee/totalDuration', params);
    console.log('lkl',response)
    return response;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
};

const WeekHolday = async (
  startDate?: string,
  endDate?: string
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/Employee/weekSummary', params);
    return response;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
}

//Attrition Api
const AttritionList = async (): Promise<any> => {
  try {
    const response = await api.get('/Employee/getAttrition')
    return response.data
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

const getSpecificAttrition = async (_id:any , employeeName:any): Promise<any> => {
  try {
    const data = {
      _id:_id,
      employeeName:employeeName,
    }
    const response = await api.get('/Employee/getSpecificAttrition',data);
    return response.data;
  } catch (error) {
    console.error("Error fetching SpecificAttrition list:", error);
    throw error;
  }
}

const DeleteAttrition = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/deleteAttrition", data)
    return response.data
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

//Post Employee Attrition
const CreateAttrition = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/Employee/createAttrition', data)
    console.log("response", response)
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

//leave Post Api 
const CreateLeave = async (data: any): Promise<any> => {
  try {
    const response = await api.post("leave/applyleave", data)
    return response.data;
  } catch (err) {
    console.log('Error during creating leave', err);
  }
}

const getLeaveData = async (): Promise<any> => {
  try {
    const response = await api.get("leave/allLeavelist")
    return response.data;
  } catch (err) {
    console.log('Error during get leave', err);
  }
}

export { login, ProjectList, CreateLeave, getLeaveData, AttritionList, CreateAttrition, CreateEmployee, DeleteEmployee, EmployeeList, specificEmployee ,CreateProject, AttendenceList, getSpecificAttrition, DeleteAttrition, WeekHolday };
