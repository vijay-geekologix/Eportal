// "use client";
// import Link from "next/link";
// import React from "react";
// import GoogleSigninButton from "../GoogleSigninButton";
// import SigninWithPassword from "../SigninWithPassword";

// export default function Signin() {
//   return (
//     <>
//       <GoogleSigninButton text="Sign in" />

//       <div className="my-6 flex items-center justify-center">
//         <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
//         <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
//           Or sign in with email
//         </div>
//         <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
//       </div>

//       <div>
//         <SigninWithPassword />
//       </div>

//       <div className="mt-6 text-center">
//         <p>
//           Don’t have any account?{" "}
//           <Link href="/auth/signup" className="text-primary">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </>
//   );
// }



'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  "/gif/p1.gif",
 "/gif/person1.gif",
    "/gif/person2.gif",
  
]

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', email, password)
  }

  return (
    // <div className="flex min-h-screen">
    //   {/* Left side - Image Slider */}
    //   <div className="hidden lg:block lg:w-2/2 relative overflow-hidden">
    //     <div className="absolute inset-0">
    //       <Image
    //         src={images[currentImage]}
    //         alt={`Employee ${currentImage + 1}`}
    //         layout="fill"
    //         objectFit="cover"
    //         quality={100}
    //         priority
    //         className="transition-opacity duration-1000"
    //       />
    //     </div>
    //     <div className="absolute inset-0 bg-blue-600 bg-opacity-30 flex flex-col justify-end p-8">
    //       <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome Back!</h2>
    //       <p className="text-xl text-white drop-shadow-lg">Log in to access your employee dashboard.</p>
    //     </div>
    //   </div>

    //   {/* Right side - Login Form */}
    //   <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
    //     <div className="w-full max-w-md">
    //       <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
    //         <div className="p-8">
    //           <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
    //             Employee Login
    //           </h2>
    //           <form className="space-y-6" onSubmit={handleSubmit}>
    //             <div>
    //               <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
    //                 Email address
    //               </label>
    //               <input
    //                 id="email-address"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //                 placeholder="Enter your email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //                 Password
    //               </label>
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //                 placeholder="Enter your password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //             </div>
    //             <div className="flex items-center justify-between">
    //               <div className="flex items-center">
    //                 <input
    //                   id="remember-me"
    //                   name="remember-me"
    //                   type="checkbox"
    //                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
    //                 />
    //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
    //                   Remember me
    //                 </label>
    //               </div>
    //               <div className="text-sm">
    //                 <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
    //                   Forgot your password?
    //                 </a>
    //               </div>
    //             </div>
    //             <div>
    //               <button
    //                 type="submit"
    //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
    //               >
    //                 Sign in
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //         <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
    //           <p className="text-xs text-gray-600">
    //             Don't have an account? <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Sign up</a>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex min-h-screen">
  {/* Left side - Image Slider */}
  <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src={images[currentImage]}
        alt={`Employee ${currentImage + 1}`}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="transition-opacity duration-1000"
      />
    </div>
    <div className="absolute inset-0 bg-blue-600 bg-opacity-30 flex flex-col justify-end p-8">
      <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome Back!</h2>
      <p className="text-xl text-white drop-shadow-lg">Log in to access your employee dashboard.</p>
    </div>
  </div>

  {/* Right side - Login Form */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
    <div className="w-full max-w-md">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Employee Login
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
          <p className="text-xs text-gray-600">
            Don't have an account? <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}