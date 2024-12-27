import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Signin from "@/components/Auth/Signin";
import { log } from "console";
import { useRouter } from "next/navigation";


export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};


const SignIn: React.FC = () => {
  return (
    <div className="w-full">
      <div className="">
        <Signin />
      </div>
    </div>
  );
};

export default SignIn;
