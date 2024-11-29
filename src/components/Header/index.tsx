import React from "react";
import {useEffect , useState} from "react";
import axios from "axios";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SearchForm from "@/components/Header/SearchForm";
import BiometricWorkingHour from '@/components/Header/BiometricWorkingHour'
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  // biometric ---------> 
    const [biometricData , setBiometricData] = useState([]);    
    useEffect(()=>{
      const fetch_Biometric_Data = async ()=>{
      try{
       let response  = await axios.get('http://localhost:9000/biometric/xmlapi');
       setBiometricData(response.data);
      }catch(err){
       console.log('ERROR OCCURE During Fetching Biometric Data',err);
      }
    }
    // fetch_Biometric_Data();
    // const interval = setInterval(()=>{
    //    fetch_Biometric_Data();
    // },1000);
    // return () => clearInterval(interval);  
    },[]);


  return (
      // <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-orange-500  dark:border-stroke-dark dark:bg-gray-dark">
      //   <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
      //     <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
      //       {/* <!-- Hamburger Toggle BTN --> */}
      //       <button
      //         aria-controls="sidebar"
      //         onClick={(e) => {
      //           e.stopPropagation();
      //           props.setSidebarOpen(!props.sidebarOpen);
      //         }}
      //         className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
      //       >
      //         <span className="relative block h-5.5 w-5.5 cursor-pointer">
      //           <span className="du-block absolute right-0 h-full w-full">
      //             <span
      //               className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
      //                 !props.sidebarOpen && "!w-full delay-300"
      //               }`}
      //             ></span>
      //             <span
      //               className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
      //                 !props.sidebarOpen && "delay-400 !w-full"
      //               }`}
      //             ></span>
      //             <span
      //               className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
      //                 !props.sidebarOpen && "!w-full delay-500"
      //               }`}
      //             ></span>
      //           </span>
      //           <span className="absolute right-0 h-full w-full rotate-45">
      //             <span
      //               className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
      //                 !props.sidebarOpen && "!h-0 !delay-[0]"
      //               }`}
      //             ></span>
      //             <span
      //               className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
      //                 !props.sidebarOpen && "!h-0 !delay-200"
      //               }`}
      //             ></span>
      //           </span>
      //         </span>
      //       </button>
      //       {/* <!-- Hamburger Toggle BTN --> */}

      //       <Link className="block flex-shrink-0 lg:hidden" href="/">
      //         <Image
      //           width={32}
      //           height={32}
      //           src={"/images/logo/logo-icon.svg"}
      //           alt="Logo"
      //         />
      //       </Link>
      //     </div>

      //     <div className="hidden xl:block">
      //       <div>
      //         <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
      //           Dashboard
      //         </h1>
      //         <p className="font-medium">Next.js Admin Dashboard Solution</p>
      //       </div>
      //     </div>

      //     <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
      //       <ul className="flex items-center gap-2 2xsm:gap-4">
      //         {/* <!-- Search Form --> */}
      //         <SearchForm />
      //         {/* <!-- Search Form --> */}

      //         {/* <!-- Dark Mode Toggle --> */}
      //         <DarkModeSwitcher />
      //         {/* <!-- Dark Mode Toggle --> */}

      //         {/* <!-- Notification Menu Area --> */}
      //         <DropdownNotification />
      //         {/* <!-- Notification Menu Area --> */}
      //       </ul>

      //       {/* <!-- User Area --> */}
      //       <DropdownUser />
      //       {/* <!-- User Area --> */}
      //     </div>
      //   </div>
      // </header>
      // sticky top-0 z-50 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white shadow-md
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400 text-white shadow-md">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Left Section - Logo and Hamburger Menu */}
        <div className="flex items-center gap-4">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="flex items-center justify-center rounded bg-white p-2 shadow-md lg:hidden"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-orange-500 transition-transform ${
                  props.sidebarOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-orange-500 transition-opacity ${
                  props.sidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-orange-500 transition-transform ${
                  props.sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <Image
              src="/images/logo/NWLogo-1-300x73.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            /> */}
            {/* <span className="hidden text-lg font-bold tracking-wide sm:block">
              Now A Wave
            </span> */}
          </Link>
        </div>

        {/* Center Section - Title */}
        {/* <div className="hidden xl:flex flex-col items-center text-center">
          <h1 className="text-lg font-semibold tracking-wide">
            Dashboard
          </h1>
          <p className="text-sm font-medium text-orange-100">
            Now A Wave Private Limited
          </p>
        </div> */}

        {/* Right Section - Utilities */}
        <div className="flex items-center gap-4">
          {/* Clock */}
          <div className="hidden xl:flex">
            <div className="relative w-25 mt-6 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              <span className="text-sm font-semibold text-orange-500">
                {/* {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} */}
               {/* <BiometricWorkingHour biometricApiData={biometricData}/> */}
               11:11
              </span>
            </div>
          </div>

          {/* Search Form */}
          {/* <SearchForm /> */}

          {/* Dark Mode Toggle */}
          {/* <DarkModeSwitcher /> */}

          {/* Notifications */}
          <DropdownNotification />

          {/* User Dropdown */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
