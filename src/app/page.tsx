import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation"; // Import redirect
import {UserDetailsContextProvider} from '../context/UserDetailsContext'
export default function Home() {
  // Simulate checking auth (Replace with actual auth logic)
  const isAuthenticated = false; // Update this logic to match your authentication state
  if (!isAuthenticated) {
    redirect("/auth/signin"); // Redirect to login page if not authenticated
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}