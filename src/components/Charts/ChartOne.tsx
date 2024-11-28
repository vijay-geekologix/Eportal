
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import Badge from "@mui/material/Badge";
// import Tooltip from "@mui/material/Tooltip";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { useRouter } from 'next/navigation'

// function getRandomNumber(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

// function fakeFetch(date, { signal }) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       const daysInMonth = date.daysInMonth();
//       const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

//       resolve({ daysToHighlight });
//     }, 500);

//     signal.onabort = () => {
//       clearTimeout(timeout);
//       reject(new DOMException("aborted", "AbortError"));
//     };
//   });
// }

// const initialValue = dayjs("2022-04-17");

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "8px",
// };

// function ServerDay(props) {
//   const { highlightedDays = [], day, outsideCurrentMonth, workingHours, onDayClick ,...other } =
//     props;

//   const isSelected =
//     !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;
//   const workHours = workingHours[day.date()] || "No data";
//   return (
//     <Tooltip title={workHours} arrow>
//       <Badge
//         key={day.toString()}
//         overlap="circular"
//         // badgeContent={isSelected ? "🔴" : undefined}
//         onClick={() => !outsideCurrentMonth && onDayClick(day)} // Trigger modal
//       >
//         <PickersDay
//           {...other}
//           outsideCurrentMonth={outsideCurrentMonth}
//           day={day}
//           onClick={() => !outsideCurrentMonth && onDayClick(day)}
//           sx={{
//             backgroundColor: workHours == 'absent'  ? "rgba(255, 0, 0, 0.8)" : undefined,
//             color: workHours == 'absent'  ? "white" : "black",
//             "&:hover": { backgroundColor: workHours == 'absent'  ? "rgba(255, 0, 0, 0.4)" : "#f0f0f0" },
//             margin: "6px",

//           }}
//         />
//       </Badge>
//     </Tooltip>
//   );
// }

// export default function CalenderBiometric() {

//   const router = useRouter();

//   const requestAbortController = React.useRef(null);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
//   const [selectedDate, setSelectedDate] = React.useState(null);
//   const [open, setOpen] = React.useState(false);
//   const [isClientSide , setIsClientSide] = useState(false); // Modal state
//   const [workingHours, setWorkingHours] = React.useState({
//     1: "9:00 AM - 5:00 PM",
//     2: "10:00 AM - 6:00 PM",
//     3: "9:00 AM - 5:00 PM",
//     4: "10:00 AM - 6:00 PM",
//     5: "absent",
//     6: "9:00 AM - 5:00 PM",
//     7: "10:00 AM - 6:00 PM",
//     8: "9:00 AM - 5:00 PM",
//     9: "10:00 AM - 6:00 PM",
//     10: "10:00 AM - 6:00 PM",
//     11: "9:00 AM - 5:00 PM",
//     12: "10:00 AM - 6:00 PM",
//     13: "9:00 AM - 5:00 PM",
//     14: "10:00 AM - 6:00 PM",
//     15: "10:00 AM - 6:00 PM",
//     16:'absent',
//     17: "9:00 AM - 5:00 PM",
//     18: "10:00 AM - 6:00 PM",
//     19: "9:00 AM - 5:00 PM",
//     20: "10:00 AM - 6:00 PM",
//     21: "absent",
//     22: "9:00 AM - 5:00 PM",
//     23: "10:00 AM - 6:00 PM",
//     24: "9:00 AM - 5:00 PM",
//     25: "10:00 AM - 6:00 PM",    
//     26:"10:00 AM - 6:00 PM",
//     27: "9:00 AM - 5:00 PM",
//     28: "10:00 AM - 6:00 PM",
//     29: "9:00 AM - 5:00 PM",
//     30: "10:00 AM - 6:00 PM",
//     31: "10:00 AM - 6:00 PM",
//   });

//   const handleOpen = (date) => {
//     setSelectedDate(date);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const fetchHighlightedDays = (date) => {
//     const controller = new AbortController();
//     fakeFetch(date, {
//       signal: controller.signal,
//     })
//       .then(({ daysToHighlight }) => {
//         setHighlightedDays(daysToHighlight);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         if (error.name !== "AbortError") {
//           throw error;
//         }
//       });

//     requestAbortController.current = controller;
//   };

//   React.useEffect(() => {
//     fetchHighlightedDays(initialValue);
//     return () => requestAbortController.current?.abort();
//   }, []);

//   const handleMonthChange = (date) => {
//     if (requestAbortController.current) {
//       requestAbortController.current.abort();
//     }

//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighlightedDays(date);
//   };

//   useEffect(()=>{
//     setIsClientSide(true);
//   },[])

//   const navigateToLeavePage = () => {
//     console.log('shgdhsjh',isClientSide)
//     if(isClientSide) {
//       router.push("/leave");}
//       else{
//         console.log("shgdhsjh")
//       }
//   };

//   return (
// <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
// <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <DateCalendar
//     defaultValue={initialValue}
//     loading={isLoading}
//     onMonthChange={handleMonthChange}
//     renderLoading={() => <DayCalendarSkeleton />}
//     slots={{
//       day: ServerDay,
//     }}
//     slotProps={{
//       day: {
//         highlightedDays,
//         workingHours,
//         onDayClick: handleOpen,
//       },
//     }}
//     sx={{
//       width: "100%",
//       maxWidth: "900px",
//       minHeight:"350px",
//       marginTop: "20px",
//       "& .MuiPickersDay-root": {
//         fontSize: "1rem",
//       },
//       "& .MuiPickersYear-yearButton": {
//         fontSize: "1rem",
//         fontWeight: "bold",
//         padding: "10px",
//         borderRadius: "8px",
//         "&.Mui-selected": {
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "rgb(255, 119, 41)",
//           color: "#ffffff",
//         },
//         "&:hover": {
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#E0E7FF",
//         },
//       },
//       "& .MuiPickersCalendarViewTransitionContainer-root": {
//         overflow: "hidden",
//       },
//       "& .MuiDayCalendar-root": {
//         overflow: "hidden",
//       },
//       "& .MuiDayCalendar-root::-webkit-scrollbar": {
//         display: "none",
//       },
//       // "& .MuiDayCalendar-root":{
//       //   msOverflowStyle: "none",
//       //   scrollbarWidth: "none",
//       // },
//       "& .MuiPickersSlideTransition-root":{
//         height:'100%',
//         overflow:"hidden",
//         marginBottom:'100px',
//       },
//       "& .MuiDayCalendar-weekDayLabel":{
//         margin:'7px',
//         fontSize:"15px",
//       },
//       "& .MuiDayCalendar-weekContainer":{
//         width:"100%",
//       },
//       "& .MuiBadge-root":{
//         minWidth:"50px",
//       },
//     }}
//   />
// </LocalizationProvider>
// <Modal open={open} onClose={handleClose}>
//         <Box sx={modalStyle}>
//           <h2>{`Selected Date: ${selectedDate?.format("DD MMM YYYY")}`}</h2>
//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//             <Button variant="contained" color="primary" onClick={() => navigateToLeavePage()}>
//               Leave
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => alert("Regularise Action")}>
//               Regularise
//             </Button>
//           </div>
//         </Box>
// </Modal>
// </div>
//   );
// }



'use client'

import React, { useState } from 'react'
import CalendarBox from '@/components/CalenderBox/index'
export default function Calendar() {
  return(
    <>
     <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <CalendarBox/>
     </div>
    </>
  )
}

