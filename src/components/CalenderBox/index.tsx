// const CalendarBox = () => {
//   return (
//     <>
//       <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
//         <table className="w-full">
//           <thead>
//             <tr className="grid grid-cols-7 rounded-t-[10px] bg-primary text-white">
//               <th className="flex h-15 items-center justify-center rounded-tl-[10px] p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Sunday </span>
//                 <span className="block lg:hidden"> Sun </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Monday </span>
//                 <span className="block lg:hidden"> Mon </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Tuesday </span>
//                 <span className="block lg:hidden"> Tue </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Wednesday </span>
//                 <span className="block lg:hidden"> Wed </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Thursday </span>
//                 <span className="block lg:hidden"> Thur </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Friday </span>
//                 <span className="block lg:hidden"> Fri </span>
//               </th>
//               <th className="flex h-15 items-center justify-center rounded-tr-[10px] p-1 text-body-xs font-medium sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Saturday </span>
//                 <span className="block lg:hidden"> Sat </span>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <!-- Line 1 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">1</span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-r-[5px] border-l-[3px] border-primary bg-gray-2 px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-dark-2 md:visible md:w-[190%] md:opacity-100">
//                     <span className="event-name font-medium text-dark dark:text-white">
//                       Redesign Website
//                     </span>
//                     <span className="time text-sm">1 Dec - 2 Dec</span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">2</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">3</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">4</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">5</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">6</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">7</span>
//               </td>
//             </tr>
//             {/* <!-- Line 1 --> */}
//             {/* <!-- Line 2 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">8</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">9</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   10
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   11
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   12
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   13
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   14
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 2 --> */}
//             {/* <!-- Line 3 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   15
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   16
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   17
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   18
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   19
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   20
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   21
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 3 --> */}
//             {/* <!-- Line 4 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   22
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   23
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   24
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   25
//                 </span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-r-[5px] border-l-[3px] border-primary bg-gray-2 px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-dark-2 md:visible md:w-[290%] md:opacity-100">
//                     <span className="event-name font-medium text-dark dark:text-white">
//                       App Design
//                     </span>
//                     <span className="time text-sm">25 Dec - 27 Dec</span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   26
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   27
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   28
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 4 --> */}
//             {/* <!-- Line 5 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer rounded-bl-[10px] border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   29
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   30
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">
//                   31
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">1</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">2</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">3</span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer rounded-br-[10px] border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-dark dark:text-white">4</span>
//               </td>
//             </tr>
//             {/* <!-- Line 5 --> */}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default CalendarBox;

// -------------------------------------------------->


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

// export default function Calender() {

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
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/CalenderBox/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarBox() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isYearPopupOpen, setIsYearPopupOpen] = useState(false)
  const [workingHours, setWorkingHours] = React.useState({
    1: "9:00 AM - 5:00 PM",
    2: "10:00 AM - 6:00 PM",
    3: "9:00 AM - 5:00 PM",
    4: "10:00 AM - 6:00 PM",
    5: "absent",
    6: "9:00 AM - 5:00 PM",
    7: "10:00 AM - 6:00 PM",
    8: "9:00 AM - 5:00 PM",
    9: "10:00 AM - 6:00 PM",
    10: "10:00 AM - 6:00 PM",
    11: "9:00 AM - 5:00 PM",
    12: "10:00 AM - 6:00 PM",
    13: "9:00 AM - 5:00 PM",
    14: "10:00 AM - 6:00 PM",
    15: "10:00 AM - 6:00 PM",
    16:'absent',
    17: "9:00 AM - 5:00 PM",
    18: "10:00 AM - 6:00 PM",
    19: "9:00 AM - 5:00 PM",
    20: "10:00 AM - 6:00 PM",
    21: "absent",
    22: "9:00 AM - 5:00 PM",
    23: "10:00 AM - 6:00 PM",
    24: "9:00 AM - 5:00 PM",
    25: "10:00 AM - 6:00 PM",    
    26:"10:00 AM - 6:00 PM",
    27: "9:00 AM - 5:00 PM",
    28: "10:00 AM - 6:00 PM",
    29: "9:00 AM - 5:00 PM",
    30: "10:00 AM - 6:00 PM",
    31: "10:00 AM - 6:00 PM",
  });
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    return { daysInMonth, firstDayOfMonth }
  }

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  const handleLeave = () => {
    router.push('/leave');
    console.log('Leave requested for:', selectedDate)

  }
  const handleRegularise = () => {
    console.log('Regularise requested for:', selectedDate)
  }

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
    setIsYearPopupOpen(false)
  }

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 12 }, (_, i) => currentYear - 5 + i)
  }

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={prevMonth} disabled={isYearPopupOpen}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          className="text-lg font-semibold"
          onClick={() => setIsYearPopupOpen(!isYearPopupOpen)}
        >
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Button>
        <Button variant="outline" onClick={nextMonth} disabled={isYearPopupOpen}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {isYearPopupOpen ? (
        <div className="bg-white shadow-md rounded-md p-4 z-10">
          <div className="grid grid-cols-3 gap-2">
            {generateYearRange().map((year) => (
              <Button
                key={year}
                variant="outline"
                onClick={() => handleYearClick(year)}
                className={cn(
                  year === currentDate.getFullYear() && "bg-primary  text-white"
                )}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="text-center py-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isToday = 
                day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear()
              const isSelected = selectedDate && 
                day === selectedDate.getDate() && 
                currentDate.getMonth() === selectedDate.getMonth() && 
                currentDate.getFullYear() === selectedDate.getFullYear()
              return (
                <div key={day} className="relative">
                  <div
                    className={cn(
                      "text-center py-2 rounded-full cursor-pointer",
                      isToday && "bg-primary text-white",
                      isSelected && "bg-primary text-white"
                    )}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </div>
                  {isSelected && (
                    <div className="absolute top-full left-0 right-0 mt-1 flex justify-center space-x-1 z-10">
                      <Button size="sm" onClick={handleLeave}>Leave</Button>
                      <Button size="sm" onClick={handleRegularise}>Regularise</Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

