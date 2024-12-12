import api from "./httpClient"


interface LoginResponse {
  token: string;
}

const date = new Date();
const currentDate =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Auth Api
const login = async (data: any): Promise<void> => {
  try {
    const response: any = await api.post<LoginResponse>("admin/login", data);
    const token = response.data.data.token;
    // console.log("Res", response.data.data.user.firstName)
    // Save the token in localStorage
    if (token) {

      localStorage.setItem("authToken", token);
      localStorage.setItem("Id", response.data.data.user._id);

      localStorage.setItem("esslId", response.data.data.user.esslId);
      localStorage.setItem("Name", response.data.data.user.firstName);
      localStorage.setItem("email", response.data.data.user.email);

      localStorage.setItem("user_role", response.data.data.user.user_role);
      localStorage.setItem("user_name", `${response.data.data.user.firstName} ${response.data.data.user.lastName}`);

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
    const response = await api.get('/Employee/biometric/totalDuration', params);
    return response;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
};

const editAttendenceType = async (
  esslId?: string,
  date?: string,
  attendenceType?: string,
  attendenceTypeFeildId?: any,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (esslId) params.esslId = esslId;
    if (date) params.date = date;
    if (attendenceType) params.attendenceType = attendenceType;
    if (attendenceTypeFeildId) params.attendenceTypeFeildId = attendenceTypeFeildId;

    const response = await api.put('/Employee/biometric/editAttendenceType', params);
    console.log('lkl',response)
    return response;
  } catch (error) {
    console.error("Error During Edit attendance type:", error);
    throw error;
  }
};


// leave and change Attendence Leaves Api;
// ------------------------------------------------->

const requestEditAttendenceType = async (
  esslId?: string,
  date?: string,
  attendenceType?: string,
  attendenceTypeFeildId?: any,
  reason?:any
): Promise<any> => {
  const userName = localStorage.getItem('user_name');

  try {
    const params: Record<string, any> = {};
    if (esslId) params.esslId = esslId;
    if (userName) params.userName = userName;
    if (date) params.attendenceDate = date;
    if (attendenceType) params.attendenceType = attendenceType;
    if (attendenceTypeFeildId) params.attendenceTypeFeildId = attendenceTypeFeildId;
    if(reason) params.reason = reason;
    if(currentDate) params.applyDate = currentDate;
    console.log('lkl',params)
    const response = await api.post('/Employee/requests/requestEditAttendenceType', params);
    return response;
  } catch (error) {
    console.error("Error During Request Edit attendance type:", error);
    throw error;
  }
};

const getAllrequestsEditAttendenceType = async (
  startDate?: string,
  endDate?: string,
  requestType?: string , 
  requestStatus? : string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType
    if(requestStatus) params.requestStatus = requestStatus
    const response = await api.get('/Employee/requests/requestEditAttendenceType', params);
    return response;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
};


//leave Post Api 
const postRequestLeave = async (data: any): Promise<any> => {
  try {
    console.log('lklllll',data)
    const response = await api.post("/Employee/requests/requestLeave", data)
    return response.data;
  } catch (err) {
    console.log('Error during creating leave', err);
  }
}

// const getAllrequestLeave = async (

// ): Promise<any> => {
//   try {
//     const response = await api.get("/Employee/requests/requestLeave")
//     return response.data;
//   } catch (err) {
//     console.log('Error during get leave', err);
//   }
// }


const getAllrequestLeave = async (
  startDate?: string,
  endDate?: string,
  requestType?: string , 
  requestStatus? : string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType;
    if(requestStatus) params.requestStatus = requestStatus;
    const response = await api.get('/Employee/requests/requestLeave', params);
    return response;
  } catch (error) {
    console.error("Error fetching leave list:", error);
    throw error;
  }
};


// ------------------------------------------------->

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
    const response = await api.post("/requestLeave", data)
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


// biometricBaseURL:"https://p4h4d07h-9000.inc1.devtunnels.ms/",
const getBiometricWorkingHour = async (): Promise<any> => {
  try {
    const response = await api.get("https://p4h4d07h-9000.inc1.devtunnels.ms/biometric/xmlapi");
    return response.data;
  } catch (err) {
    console.log('Error during get biometric working hour', err);
  }
}

// const getAllRequests = async () : Promise<any> =>{
//  try {
//   const response = await api.get("leave/allLeavelist")
//   return response.data;
//  } catch (err) {
//   console.log('Error during get leave', err);
//  }
// }


export { 
         login,
         ProjectList, 
         CreateLeave, 
         getLeaveData, 
         AttritionList, 
         CreateAttrition, 
         CreateEmployee, 
         DeleteEmployee, 
         EmployeeList, 
         specificEmployee 
         ,CreateProject, 
         AttendenceList, 
         editAttendenceType,
         getAllrequestsEditAttendenceType, 
         requestEditAttendenceType,
         postRequestLeave,
         getAllrequestLeave, 
         getSpecificAttrition, 
         DeleteAttrition,
         WeekHolday, 
         getBiometricWorkingHour
      };
