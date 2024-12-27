"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import {UserDetailsContextProvider} from '../context/UserDetailsContext'
import { useRouter } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

// if user is not loged in so it'll redirect to login page  
useEffect(()=>{
  const authToken = localStorage.getItem('authToken');
  if(authToken == undefined){
    router.replace('/')
  }
  // else{
  //   router.replace('/dashboard')
  // }
},[])

  return (
    <html lang="en">
      <UserDetailsContextProvider>
      <body suppressHydrationWarning={true}>
      <Toaster position="top-right" reverseOrder={false} />
        {loading ? <Loader /> : children}
      </body>
      </UserDetailsContextProvider>
    </html>
  );
}
