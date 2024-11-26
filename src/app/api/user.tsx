import api from "./httpClient"


interface LoginResponse {
    token: string; // Update this based on the actual response structure of your API
}

const login =async (data :any) : Promise<void> =>   {
    try{
        const response:any = await api.post<LoginResponse>("admin/login", data);
        const token  =response.data.data.token;
        // Save the token in localStorage
        if(token) {
            localStorage.setItem("authToken", token);
            console.log("Login successful! Token saved.");
        } else {
            console.error("No token received from API.");
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
}

export default login