import { actions } from "react-table";
import api from "./httpClient";

interface LoginResponse {
  token: string;
}

const date = new Date();
const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Auth Api
const login = async (data: any): Promise<null|void> => {
  try {
    const response: any = await api.post<LoginResponse>("admin/login", data);
    const token = response.data.data.token;
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("Id", response.data.data.user._id);
      localStorage.setItem("esslId", response.data.data.user.esslId);
      return response.data.data.user;
      console.log("Login successful! Token saved.");
    } else {
      console.error("No token received from API.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

const verifyAuthToken = async (): Promise<null|void> =>{
  // try{
  //   const token:any = localStorage.getItem('authToken');
  //   const response:any = await api.post("Employee/verifyToken", token);
  //   return response;
  // }catch(error){
  //   console.error("Invalid Token!", error);
  //   return null;
  // }
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
    const response = await api.post(
      "admin/projectDetails/createProjectDetails",
      data,
    );
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

// Employee Api
const EmployeeList = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/getEmployee");
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

const CreateEmployee = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/createEmployee", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

const DeleteEmployee = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/deleteEmployee", data);
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

const specificEmployee = async (esslId: any, _id: any): Promise<any> => {
  try {
    const data = {
      esslId: esslId,
      _id: _id,
    };
    const response = await api.get("/Employee/specificEmployee", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching specificEmployee list:", error);
    throw error;
  }
};

const AttendenceList = async (
  userESSLid?: string,
  startDate?: string,
  endDate?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (userESSLid) params.userESSLid = userESSLid;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/Employee/biometric/totalDuration", params);
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
    if (attendenceTypeFeildId)
      params.attendenceTypeFeildId = attendenceTypeFeildId;

    const response = await api.put(
      "/Employee/biometric/editAttendenceType",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error During Edit attendance type:", error);
    throw error;
  }
};

// leave Apply, change Attendence Leaves , change employee Details , Regularise requests  Api , Leave Balance Records;
// ------------------------------------------------->

const requestEditAttendenceType = async (
  esslId?: string,
  userName?:string,
  date?: string,
  attendenceType?: string,
  attendenceTypeFeildId?: any,
  reason?: any,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (esslId) params.esslId = esslId;
    if (userName) params.userName = userName;
    if (date) params.attendenceDate = date;
    if (attendenceType) params.attendenceType = attendenceType;
    if (attendenceTypeFeildId)
      params.attendenceTypeFeildId = attendenceTypeFeildId;
    if (reason) params.reason = reason;
    if (currentDate) params.applyDate = currentDate;
    const response = await api.post(
      "/Employee/requests/requestEditAttendenceType",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error During Request Edit attendance type:", error);
    throw error;
  }
};

const getAllrequestsEditAttendenceType = async (
  startDate?: string,
  endDate?: string,
  requestType?: string,
  requestStatus?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType;
    if (requestStatus) params.requestStatus = requestStatus;
    const response = await api.get(
      "/Employee/requests/requestEditAttendenceType",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error fetching attendance type request Data:", error);
    throw error;
  }
};

const putAllrequestsEditAttendenceType = async (
  requestIds?: any[],
  approvalType?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (requestIds) params.requestIds = requestIds;
    if (approvalType) params.approvalType = approvalType;
    const response = await api.put(
      "/Employee/requests/requestEditAttendenceType",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error update attendance type request:", error);
    throw error;
  }
};

// update attendance type by admin
const updateAttendenceTypeByAdmin = async (
  data?: any,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (data) params.data = data;
    const response = await api.put(
      "/Employee/requests/attendenceTypeUpdateByAdmin",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error update attendance type request:", error);
    throw error;
  }
};

//leave request Api
const postRequestLeave = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/requests/requestLeave", data);
    return response.data;
  } catch (err) {
    console.log("Error during creating leave", err);
  }
};

const getAllrequestLeave = async (
  startDate?: string,
  endDate?: string,
  requestType?: string,
  requestStatus?: string,
  esslId?:string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType;
    if (requestStatus) params.requestStatus = requestStatus;
    if (esslId) params.esslId = esslId;
    const response = await api.get("/Employee/requests/requestLeave", params);
    return response;
  } catch (error) {
    console.error("Error fetching leave list request:", error);
    throw error;
  }
};

const putAllrequestsLeave = async (
  requestIds?: string[],
  approvalType?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (requestIds) params.requestIds = requestIds;
    if (approvalType) params.approvalType = approvalType;
    const response = await api.put("/Employee/requests/requestLeave", params);
    return response;
  } catch (error) {
    console.error("Error update Leave request:", error);
    throw error;
  }
};

//Employee Details request Api
const postEmployeeDetailsRequest = async (data: any): Promise<any> => {
  try {
    console.log("postRegulariseRequest Request data", data);
    const response = await api.post(
      "/Employee/requests/requestEmployeeDetails",
      data,
    );
    return response.data;
  } catch (err) {
    console.log("Error during creating post Regularise Request Request", err);
  }
};

const getAllEmployeeDetailsRequest = async (
  startDate?: string,
  endDate?: string,
  requestType?: string,
  requestStatus?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType;
    if (requestStatus) params.requestStatus = requestStatus;
    const response = await api.get(
      "/Employee/requests/requestEmployeeDetails",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error fetching leave list request:", error);
    throw error;
  }
};


const putAllEmployeeDetailsRequest = async (
  requestData?: any[],
  approvalType?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (requestData) params.requestData = requestData;
    if (approvalType) params.approvalType = approvalType;
    const response = await api.put("/Employee/requests/requestEmployeeDetails", params);
    return response;
  } catch (error) {
    console.error("Error update Employee Details request:", error);
    throw error;
  }
};


// Regularise Request Api
const postRegulariseRequest = async (data: any): Promise<any> => {
  
  try {
    const response = await api.post(
      "/Employee/requests/requestRegularise",
      data,
    );
    return response.data;
  } catch (err) {
    console.log("Error during creating Regularise Request", err);
  }
};

const getAllRegulariseRequest = async (
  startDate?: string,
  endDate?: string,
  requestType?: string,
  requestStatus?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (requestType) params.requestType = requestType;
    if (requestStatus) params.requestStatus = requestStatus;
    const response = await api.get(
      "/Employee/requests/requestRegularise",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error fetching Regularise request list:", error);
    throw error;
  }
};


const putAllRegulariseRequest = async (
  requestData?: any[],
  approvalType?: string,
): Promise<any> => {
  
  try {
    const params: Record<string, any> = {};
    if (requestData) params.requestData = requestData;
    if (approvalType) params.approvalType = approvalType;
    const response = await api.put("/Employee/requests/requestRegularise", params);
    return response;
  } catch (error) {
    console.error("Error update Regularise request:", error);
    throw error;
  }
};

// Leave Balance Records
const postLeaveBalanceRecords = async (data: any): Promise<any> => {
  
  try {
    const response = await api.post(
      "/Employee/leaveBalanceRecords/records",
      data,
    );
    return response.data;
  } catch (err) {
    console.log("Error during creating Regularise Request", err);
  }
};

const getLeaveBalanceRecords = async (
  employeeId?: string,
  year?: Number,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (employeeId) params.employeeId = employeeId;
    if (year) params.year = year;
    const response = await api.get(
      "/Employee/leaveBalanceRecords/records",
      params,
    );
    return response;
  } catch (error) {
    console.error("Error fetching Regularise request list:", error);
    throw error;
  }
};

const putLeaveBalanceRecords = async (
  balanceRecordsData?: any[],
): Promise<any> => {
  try {
    console.log('hnnnnn',balanceRecordsData);
    const params:any = balanceRecordsData;
    const response = await api.put("/Employee/leaveBalanceRecords/records", params);
    return response;
  } catch (error) {
    console.error("Error update Regularise request:", error);
    throw error;
  }
};

// ------------------------------------------------->

const WeekHolday = async (
  startDate?: string,
  endDate?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/Employee/weekSummary", params);
    return response;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
};

//Attrition Api
const AttritionList = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/getAttrition");
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

const getSpecificAttrition = async (
  _id: any,
  employeeName: any,
): Promise<any> => {
  try {
    const data = {
      _id: _id,
      employeeName: employeeName,
    };
    const response = await api.get("/Employee/getSpecificAttrition", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching SpecificAttrition list:", error);
    throw error;
  }
};

const DeleteAttrition = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/deleteAttrition", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

//Post Employee Attrition
const CreateAttrition = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/Employee/createAttrition", data);
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

// biometric server machine's port should be shared 
// biometric machine port Base url: "https://p4h4d07h-9000.inc1.devtunnels.ms/",
const getBiometricWorkingHour = async (): Promise<any> => {
  try {
    const response = await api.get(
      "https://p4h4d07h-9000.inc1.devtunnels.ms/biometric/xmlapi",
    );
    return response.data;
  } catch (err) {
    console.log("Error during get biometric working hour", err);
  }
};

export {
  login,
  ProjectList,
  AttritionList,
  CreateAttrition,
  CreateEmployee,
  DeleteEmployee,
  EmployeeList,
  specificEmployee,
  CreateProject,
  AttendenceList,
  editAttendenceType,
  getAllrequestsEditAttendenceType,
  requestEditAttendenceType,
  putAllrequestsEditAttendenceType,
  updateAttendenceTypeByAdmin,
  postRequestLeave,
  getAllrequestLeave,
  putAllrequestsLeave,
  postEmployeeDetailsRequest,
  getAllEmployeeDetailsRequest,
  putAllEmployeeDetailsRequest,
  postRegulariseRequest,
  getAllRegulariseRequest,
  putAllRegulariseRequest,
  postLeaveBalanceRecords,
  getLeaveBalanceRecords,
  putLeaveBalanceRecords,
  getSpecificAttrition,
  DeleteAttrition,
  WeekHolday,
  getBiometricWorkingHour,
};
