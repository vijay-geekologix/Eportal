import api from "./httpClient"


interface LoginResponse {
  token: string; // Update this based on the actual response structure of your API
}

const login = async (data: any): Promise<void> => {
  try {
    const response: any = await api.post<LoginResponse>("admin/login", data);
    const token = response.data.data.token;
    // Save the token in localStorage
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Login successful! Token saved.");
    } else {
      console.error("No token received from API.");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

// get Project List

const ProjectList = async (): Promise<any> => {
  try {
    const response = await api.get("admin/projectDetails/getProjectDetails");
    console.log("Full Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

//get Employee List

const EmployeeList = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/getEmployee")
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

//Create Employee

const CreateEmployee = async (data:any): Promise<any> => {
  try {
    const response = await api.post("/Employee/createEmployee", data)
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

// delete Emplouee

const  DeleteEmployee = async (data:any): Promise<any> =>{
  try{
const  response = await api.post("/Employee/deleteEmployee", data)
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
}

//get Employee Attrition

const AttritionList = async (): Promise<any> => {
  try {
    const response = await api.get('/Employee/getAttrition')
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


export { login, ProjectList, EmployeeList, AttritionList, CreateAttrition, CreateEmployee, DeleteEmployee }