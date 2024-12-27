
'use client';
import React, { useState, useEffect } from 'react';
import { useUserDetailsContext } from "@/context/UserDetailsContext";

export default function BiometricWorkingHour({biometricApiData}){

   const {userDetails, setUserDetails} = useUserDetailsContext(); 
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // biometric
  // const [esslUserID,setEsslUserID] = useState((localStorage.getItem('esslId')));  
  const [esslUserID,setEsslUserID] = useState(userDetails?.esslId);  
  let isEsslBiometricUserCheckin = false;

  const checkUserEsslID = () =>{
  
    let checkInOutEntryLength = 0;
    let checkInEntry = 0;
    let checkOutEntry = 0;
    let nonWorkingHour = 0;
    let checkIn_OutArr = [];
    for(let obj of biometricApiData){
      if(esslUserID == obj.esslId){
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
      }
    }
     
     if(isEsslBiometricUserCheckin == false){
       setElapsedTime('user Not checkIN')
     }else if(checkInOutEntryLength % 2 == 1){
        
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
    if(isEsslBiometricUserCheckin){
      startTimer();
    }
      // startTimer();
  });

//   --------------------------------------------->


  // Helper functions for managing time and storage
  const startTimer = (initialElapsedTime = 0) => {
    const id = setInterval(() => {
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
    console.log('Working Hour count-Down Stoped',elapsedTime)
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const convertTimeToNumber = (formattedTime) => {
    const [hours, minutes, seconds] = formattedTime.split(":").map(Number); // Split and convert to numbers
    const totalSeconds = hours * 3600 + minutes * 60 + seconds; // Convert to total seconds
    const totalHours = totalSeconds / 3600; // Convert to hours
    return totalHours;
  };

  const formattedTime = formatTime(elapsedTime) // hh:mm:ss
  const totalHours1 = convertTimeToNumber(formattedTime);

  return (
    <div className="">
      <div className="mt-2 text-lg font-semibold text-gray-700 border-l ">
        {/* <span className="text-gray-500"> */}
         {/* <span className='mb-2 text-md font-semibold'>  Employee Working Time : </span> */}
         {typeof(elapsedTime) != 'string'? formatTime(elapsedTime) :'Not Check-In yet'}
         {/* </span> */}
      </div>
    </div>
  );
}






