'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { login } from '@/app/api/Allapi'
// import login from '@/app/api/user'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
const images = [
  "/gif/LoginLogo.gif",
  // "/images/login/g2.jpg",
  // "/images/login/g3.jpg",

]
export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempted with:', email, password)
    try {
      const loginData = { email, password }
       await login(loginData)
      toast.success("Login successful! 🎉");
      router.push('/dashboard')
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Invalid Credentials")
    }


  }

  return (
    <div className="flex min-h-screen">
    {/* Left side - Image Slider */}
    <div className="hidden lg:block lg:w-3/4 relative overflow-hidden">
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
    <div className="w-full lg:w-1/4 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-500 text-center mb-6">
              Employee Login
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-500">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-indigo-500 sm:text-sm"    
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-indigo-500 sm:text-sm"
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
                    className="h-4 w-4 text-indigo-400 focus:ring-orange-500 border-gray-300 rounded"
                  />  
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-600 hover:text-indigo-400">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div> 
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
            <p className="text-xs text-gray-600">
              Don't have an account? <a href="#" className="font-medium text-indigo-900 hover:text-indigo-600">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}