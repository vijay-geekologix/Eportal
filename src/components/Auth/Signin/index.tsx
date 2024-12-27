"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { login } from "@/app/api/Allapi";
// import login from '@/app/api/user'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserDetailsContext } from "@/context/UserDetailsContext";
import {verifyAuthToken} from '@/app/api/Allapi'

const images = [
  "/gif/Developers Gif.gif",
  // "/images/login/g2.jpg",
  // "/images/login/g3.jpg",
];
export default function Signin() {
  const router = useRouter();
  // if(localStorage.getItem('authToken')){
  //   router.replace('/dashboard') 
  // }
  // useEffect(()=>{
  //   const verifyToken = async (): Promise<any> =>{
  //     const response = await verifyAuthToken();
  //     console.log('verifyToken',response);
  //   }; 
  //   verifyToken();
  // },[])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const { userDetails, setUserDetails }: any = useUserDetailsContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", email, password);
    try {
      const loginData = { email, password };
      const response = await login(loginData);
      console.log("nhfgs", response);
      if(response == null){
        setPassword('');
        setEmail('');
        toast.error("Invalid credentials!");
        return;
      }else{
        toast.success("Login successful! 🎉");
        setUserDetails(response);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image Slider */}
      <div className="relative hidden overflow-hidden lg:block lg:w-3/4">
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
        <div className="bg-blue-350 absolute inset-0 flex flex-col justify-end bg-opacity-30 p-8">
          <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
            Welcome Back!
          </h2>
          {/* <p className="text-xl text-white drop-shadow-lg">Log in to access your employee dashboard.</p> */}
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400 p-4 sm:p-8 lg:w-1/4">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="p-8">
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-500">
                Employee Login
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
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
                      className="h-4 w-4 rounded border-gray-300 text-indigo-400 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-600 font-medium hover:text-indigo-400"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center border-t border-gray-200 bg-gray-50 px-8 py-4">
              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-900 hover:text-indigo-600"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
