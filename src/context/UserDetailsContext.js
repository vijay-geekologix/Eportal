import { createContext, useContext, useEffect, useState } from "react";
import {specificEmployee} from '@/app/api/Allapi'

const UserDetailsContext = createContext(null);

export const UserDetailsContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const esslId = localStorage.getItem('esslId');
      const userId = localStorage.getItem('Id');
      
      //  it prevent to empty context when web reloaded
      if (esslId && userId) {
        try {
          const response = await specificEmployee(esslId, userId);

          if (JSON.stringify(userDetails) !== JSON.stringify(response.data[0])) {
            setUserDetails(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }
    fetchUserData();
  }, [userDetails]);
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetailsContext = () => {
  const context = useContext(UserDetailsContext);

  if (!context) {
    throw new Error(
      "useUserDetailsContext must be used within UserDetailsContextProvider"
    );
  }

  return context;
};
