
'use client';
import React, { useState, useEffect } from 'react';
// import { checkInEmployee, checkOutEmployee } from '@/_services/services_api';
// import Tooltip from '@mui/material/Tooltip';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Alert,
//   AlertTitle
// } from "@mui/material";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/system';
// import { useRouter } from "next/navigation";
// import CalenderBiometric from '@/components/utils/CalenderBiometric';
// import biometricApiData from '@/utils/biometricData';

import axios from 'axios';
export default function BiometricWorkingHour({biometricApiData}){
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  // const [checkInTime, setCheckInTime] = useState(null);
  // const [checkOutTime, setCheckOutTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isNextWeekAvailable, setIsNextWeekAvailable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [inputHours, setInputHours] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // biometric
  const [esslUserID,setEsslUserID] = useState(42);  

  const checkUserEsslID = () =>{
  
    let isEsslBiometricUserCheckin = false;
    let checkInOutEntryLength = 0;
    let checkInEntry = 0;
    let checkOutEntry = 0;
    let nonWorkingHour = 0;
    let checkIn_OutArr = [];
    for(let obj of biometricApiData){
        if(esslUserID == obj.id){
          if(checkInEntry == 0){
            checkInEntry = obj.time;
          }else{
            checkOutEntry = obj.time;
          }
          checkIn_OutArr.push(obj.time);
          checkInOutEntryLength++;
          isEsslBiometricUserCheckin = true;
        }
     }

     // calculate all checkIN - checkOut time to remove non-working time  
     if(checkInOutEntryLength > 1){
      for(let i = 0; i<checkInOutEntryLength/2-1; i++){
        let checkOutTime = checkIn_OutArr[i+i+1];
        let checkInTime = checkIn_OutArr[i+i+2];
        const [checkOutHour , checkOutMinutes , checkOutSeconds]= checkOutTime?.split(':').map(Number);
        const checkOutTimeInSec = checkOutHour*3600 + checkOutMinutes*60 + checkOutSeconds;
        
        const [checkInHour , checkInMinutes , checkInSeconds]= checkInTime?.split(':').map(Number);
        const checkInTimeInSec = checkInHour*3600 + checkInMinutes*60 + checkInSeconds;
        
        nonWorkingHour = nonWorkingHour + checkInTimeInSec - checkOutTimeInSec;
        console.log('lllkl',nonWorkingHour); 
      }
    }
     console.log('checkInOutEntryLength',checkInOutEntryLength)
     if(isEsslBiometricUserCheckin == false){
       setElapsedTime('user Not checkIN')
     }else if(checkInOutEntryLength % 2 == 1){
        console.log('pppp',checkInEntry);
        
        const [checkInHour , checkInMinutes , checkInSeconds]= checkInEntry.split(':').map(Number);
        const checkInTimeInSeconds = checkInHour*3600 + checkInMinutes*60 + checkInSeconds;  // 12.27 hour
        
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const currentTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        const workingTimeInSeconds = currentTimeInSeconds - checkInTimeInSeconds - nonWorkingHour; 
        setElapsedTime(workingTimeInSeconds);

     }else{
      console.log('both entry time ',checkInEntry,"  ",checkOutEntry);
      const [checkInHour , checkInMinutes , checkInSeconds]= checkInEntry.split(':').map(Number);
      const checkInTimeInSeconds = checkInHour*3600 + checkInMinutes*60 + checkInSeconds;

      const [checkOutHour , checkOutMinutes , checkOutSeconds]= checkOutEntry.split(':').map(Number);
      const checkOutTimeInSeconds = checkOutHour*3600 + checkOutMinutes*60 + checkOutSeconds;
      
      const totalWorkingTime = checkOutTimeInSeconds - checkInTimeInSeconds - nonWorkingHour + 9;
      console.log("gggg ",checkOutTimeInSeconds - checkInTimeInSeconds ,"    " ,nonWorkingHour);
      setElapsedTime(totalWorkingTime);
      console.log('klkl',totalWorkingTime);
      stopTimer();
     }
  }

  useEffect(()=>{
      checkUserEsslID();
  },[biometricApiData])

  
  useEffect(()=>{
      startTimer();
      console.log('hello hello2 ' , elapsedTime);
  });

//   --------------------------------------------->


  // Helper functions for managing time and storage
  const startTimer = (initialElapsedTime = 0) => {
    const id = setInterval(() => {
      console.log('hello hello ' , elapsedTime);
      setElapsedTime((prevElapsedTime) => {
        const updatedTime = prevElapsedTime + 1;
        return updatedTime;
      });
    }, 1000);
    setIntervalId(id);
  };

  
  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    console.log('hgggg',elapsedTime)
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

// const fetchAttendanceData = async (startDate, endDate) => {
//   try {
//     const authToken = localStorage.getItem('auth-token');
//     const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
//     const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate}&endDate=${endDate}`;
//     const response = await axios.get(url, { headers });
    
//     // Check if response contains attendance data
//     if (response.data.attendances) {
//       // Store the fetched attendance data in localStorage
//       localStorage.setItem('attendanceData', JSON.stringify(response.data.attendances));
      
//       // Set the state with fetched data
//       setAttendanceData(response.data.attendances);
//     }

//     const nextWeekStartDate = new Date(endDate);
//     nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
//     const nextWeekEndDate = new Date(nextWeekStartDate);
//     nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 6);

//     const nextStartDate = nextWeekStartDate.toISOString().split('T')[0];
//     const nextEndDate = nextWeekEndDate.toISOString().split('T')[0];

//     const nextWeekResponse = await axios.get(
//       `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${nextStartDate}&endDate=${nextEndDate}`,
//       { headers }
//     );
    
//     setIsNextWeekAvailable(nextWeekResponse.data.attendances.length > 0);

//   } catch (error) {
//     console.error(error);
//   }
// };


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // const [projectdata2, setprojectdata2] = useState([]);

//   const getuserproject = async () => {
//     try {
//       const authToken = localStorage.getItem('auth-token');
//       const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
//       const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/admin/projectDetails/getUserProjects`;
//       const response = await axios.get(url, { headers });
//       setprojectdata(response.data.projects)
//       setprojectdata2(response.data.projects)

//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     getuserproject();
//   }, [])
 
//   const [getprojectdata, setgetprojectdata] = useState([]); // Initialize as an empty array
//   const [formData, setFormData] = useState();

// useEffect(() => {
//   if (projectdata2.length > 0) {
//     const tester = projectdata2.map((project) => {
//       return { projectId: project._id, projectName: project.projectName, time: "", Update: "" };
//     });
//     setgetprojectdata(tester); // Set the transformed data
//   }
// }, [projectdata2]); // This effect depends on projectdata2, so it will run when projectdata2 changes

//  useEffect(()=>{
//   setFormData({
//     date: new Date().toISOString().split('T')[0],
//     projects: getprojectdata
//   })
//  },[getprojectdata])
//   const [totalHours, setTotalHours] = useState(0);

//   useEffect(() => {
//     const total = getprojectdata.reduce((sum, project) => {
//       const hours = parseFloat(project.time) || 0;
//       return sum + hours;
//     }, 0);
//     setTotalHours(total);
//   }, [getprojectdata]);

  const convertTimeToNumber = (formattedTime) => {
    const [hours, minutes, seconds] = formattedTime.split(":").map(Number); // Split and convert to numbers
    const totalSeconds = hours * 3600 + minutes * 60 + seconds; // Convert to total seconds
    const totalHours = totalSeconds / 3600; // Convert to hours
    return totalHours;
  };

  const formattedTime = formatTime(elapsedTime) // hh:mm:ss
  const totalHours1 = convertTimeToNumber(formattedTime);

  return (
    <div className="p-5 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        {/* <span className="text-gray-500"> */}
         {/* <span className='mb-2 text-md font-semibold'>  Employee Working Time : </span> */}
         {typeof(elapsedTime) != 'string'? formatTime(elapsedTime) :'Not Check-In yet'}
         {/* </span> */}
      </div>
    </div>
  );
}






