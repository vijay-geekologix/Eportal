"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserDetailsContext } from "@/context/UserDetailsContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const menuGroups = [
  {
    name: "DASHBOARD",
    menuItems: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 4H20C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4ZM4 6V18H20V6H4ZM6 8H10V10H6V8ZM6 12H10V14H6V12ZM6 16H10V18H6V16ZM14 8H18V10H14V8ZM14 12H18V14H14V12ZM14 16H18V18H14V16Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Dashboard",
        // label: "Attendence",
        route: "/dashboard",
        // route: "#",
        // children: [
        //   { label: "Dashboard", route: "/dashboard" },
        // ],
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 9C16 10.6569 14.6569 12 13 12C11.3431 12 10 10.6569 10 9C10 7.34315 11.3431 6 13 6C14.6569 6 16 7.34315 16 9ZM4 11C4 12.1046 4.89543 13 6 13C7.10457 13 8 12.1046 8 11C8 9.89543 7.10457 9 6 9C4.89543 9 4 9.89543 4 11ZM20 11C20 12.1046 19.1046 13 18 13C16.8954 13 16 12.1046 16 11C16 9.89543 16.8954 9 18 9C19.1046 9 20 9.89543 20 11ZM13 13C14.933 13 18 14.1188 18 16V17C18 17.5523 17.5523 18 17 18H9C8.44772 18 8 17.5523 8 17V16C8 14.1188 11.067 13 13 13ZM6 15C4.89543 15 3 15.8954 3 17C3 17.5523 3.44772 18 4 18H8V16C8 15.4487 8.12592 15.0227 8.37791 14.6671C7.73573 14.3291 7.01048 14.1071 6 14.1071V15ZM20 17C20 15.8954 18.1046 15 17 15V14.1071C15.9895 14.1071 15.2643 14.3291 14.6221 14.6671C14.8741 15.0227 15 15.4487 15 16V18H20C20.5523 18 21 17.5523 21 17Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "HRIS",
        route: "#",
        children: [
          { label: "Emloyess-Master", route: "/hris/employee-master" },
          { label: "Attrition", route: "/hris/attrition" },
        ],
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 4C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V9C22 8.44772 21.5523 8 21 8H12.4142L10.7071 6.29289C10.3166 5.90237 9.68342 5.90237 9.29289 6.29289L7.58579 8H3ZM4 18V10H7C7.26522 10 7.51957 9.89464 7.70711 9.70711L9.41421 8H20V18H4ZM12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16H16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14H12Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Projects",
        route: "/projectTracker/projectList",
        // children: [
        //   { label: "Add Project", route: "/projectTracker/projectForm" },
        //   { label: "Project List", route: "/projectTracker/projectList" },
        // ],
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C11.4477 2 11 2.44772 11 3V4H7C5.34315 4 4 5.34315 4 7V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V7C20 5.34315 18.6569 4 17 4H13V3C13 2.44772 12.5523 2 12 2ZM17 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H12C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13H10Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Attendence",
        route: "#",
        children: [
          { label: "My Attendence", route: "/attendence/myattendence" },
          { label: "View Attendence", route: "/attendence/viewattendence" },
        ],
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.7071 4.29289C21.0976 4.68342 21.0976 5.31658 20.7071 5.70711L19.4142 7H20C20.5523 7 21 7.44772 21 8V16C21 16.5523 20.5523 17 20 17H4C3.44772 17 3 16.5523 3 16V8C3 7.44772 3.44772 7 4 7H4.58579L3.29289 5.70711C2.90237 5.31658 2.90237 4.68342 3.29289 4.29289C3.68342 3.90237 4.31658 3.90237 4.70711 4.29289L5.70711 5.29289C6.09763 5.68342 6.09763 6.31658 5.70711 6.70711L4.70711 5.70711C4.31658 5.31658 3.68342 5.31658 3.29289 5.70711C2.90237 6.09763 2.90237 6.73079 3.29289 7.12132L5.70711 9.53553C6.09763 9.92606 6.73079 9.92606 7.12132 9.53553C7.51184 9.14501 7.51184 8.51184 7.12132 8.12132L9.53553 6.70711C9.92606 6.31658 9.92606 5.68342 9.53553 5.29289C9.14501 4.90237 8.51184 4.90237 8.12132 5.29289L6.70711 6.70711C6.31658 7.09763 6.31658 7.73079 6.70711 8.12132L7.70711 9.12132C8.09763 9.51184 8.73079 9.51184 9.12132 9.12132L10.7071 7.53553C11.0976 7.14501 11.0976 6.51184 10.7071 6.12132L10.7071 5.70711L11.7071 4.70711C12.0976 4.31658 12.0976 3.68342 11.7071 3.29289L9.12132 1.70711C8.73079 1.31658 8.09763 1.31658 7.70711 1.70711C7.31658 2.09763 7.31658 2.73079 7.70711 3.12132L8.70711 4.12132C9.09763 4.51184 9.73079 4.51184 10.1213 4.12132L11.7071 2.53553C12.0976 2.14501 12.0976 1.51184 11.7071 1.12132C11.3166 0.73079 10.6834 0.73079 10.2929 1.12132L9.29289 2.12132C8.90237 2.51184 8.90237 3.14501 9.29289 3.53553C9.68342 3.92606 10.3166 3.92606 10.7071 3.53553L10.7071 4.29289C10.0976 4.68342 9.46342 4.68342 9.12132 5.12132L8.12132 6.12132C7.73079 6.51184 7.09763 6.51184 6.70711 7.12132C6.31658 7.51184 6.31658 8.14501 6.70711 8.53553L7.70711 9.53553L9.12132 10.7071L9.29289 11.7071C9.68342 12.0976 10.3166 12.0976 10.7071 11.7071C11.0976 11.3166 10.7071 11.7071 10.1213 10.7071L7.53553 9.12132C7.14501 9.51184 6.51184 9.51184 6.12132 9.12132L5.29289 8.29289C4.90237 7.90237 4.31658 7.90237 3.70711 7.29289C3.31658 6.90237 3.31658 6.31658 3.70711 5.70711C3.90237 5.31658 4.09763 5.31658 4.70711 5.29289L7.70711 4.29289L7.70711 3.12132L7.12132 3.12132L6.12132 3.70711L7.70711 4.70711L7.70711 4.29289C5.92802 5.05926 5 6.29289 5.29289 5.29289"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Leave",
        route: "/leave",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18ZM12 7C11.45 7 11 7.45 11 8V11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11V8C13 7.45 12.55 7 12 7ZM12 13C11.45 13 11 13.45 11 14C11 14.55 11.45 15 12 15C12.55 15 13 14.55 13 14C13 13.45 12.55 13 12 13ZM15 9.5L14.29 8.79C14.11 8.61 13.86 8.56 13.63 8.62L13 9.03V12.68L13.63 13.08C13.86 13.14 14.11 13.09 14.29 12.91L15 12.2C15.21 11.99 15.21 11.64 15 11.43L15 9.5Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Pending Approval",
        route: "/pending-approval",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.43 12.98c.04-.31.07-.63.07-.98s-.03-.67-.09-1L21 9.24a1.5 1.5 0 0 0-.38-1.66l-1.91-1.91a1.5 1.5 0 0 0-1.66-.38l-1.74.72c-.52-.4-1.08-.73-1.68-.98l-.26-1.92A1.5 1.5 0 0 0 11.5 2h-3a1.5 1.5 0 0 0-1.5 1.35l-.26 1.92c-.6.25-1.16.58-1.68.98L3.32 7.2a1.5 1.5 0 0 0-.38 1.66l.72 1.74c-.06.33-.09.66-.09 1s.03.67.09 1L2.94 14.7a1.5 1.5 0 0 0 .38 1.66l1.91 1.91a1.5 1.5 0 0 0 1.66.38l1.74-.72c.52.4 1.08.73 1.68.98l.26 1.92A1.5 1.5 0 0 0 8.5 22h3a1.5 1.5 0 0 0 1.5-1.35l.26-1.92c.6-.25 1.16-.58 1.68-.98l1.74.72c.24.1.5.16.76.16.41 0 .8-.16 1.09-.45l1.91-1.91a1.5 1.5 0 0 0 .38-1.66l-.72-1.74ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Settings",
        route: "#",
        children: [
          { label: "Opening -Balance", route: "/Settings/openingbalance" },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { userDetails, setUserDetails }: any = useUserDetailsContext();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  // role base redirect user

  // const router = useRouter();
  // const pathname = usePathname();
  // const { userDetails, setUserDetails }:any = useUserDetailsContext();
  // const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  // const role = userDetails?.user_role;

  // const roleBasedAccess:any = {
  //   employee: ["/dashboard", "/attendence/myattendence", "/leave"],
  //   admin: ["*"],
  //   manager: ["*"],
  // };

  // useEffect(() => {
  //   const allowedPaths = roleBasedAccess[role] || [];
  //   if (!allowedPaths.includes("*") && !allowedPaths.includes(pathname)) {
  //     router.replace("/dashboard");
  //   }
  // }, [role, pathname]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
          }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-200  bg-white px-6 py-6 dark:border-gray-700 dark:bg-gray-dark">
          <Link href="/dashboard">
            <Image
              width={176}
              height={10}
              src="/gif/3o7TKUM3IgJBX2as9O.webp"
              alt="Logo"
              priority
              className="dark:hidden"
              style={{ width: "auto", height: "50px" }}
            />
            <Image
              width={176}
              height={32}
              src="/images/logo/logo.svg"
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block text-gray-600 dark:text-gray-400 lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
            </svg>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-6 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-4">
                  {group.menuItems.map(
                    (menuItem, menuIndex) => {
                      let notForEmployee = ['HRIS', 'Projects', 'Pending Approval','Settings'];
                      if (userDetails?.user_role == 'employee' && !notForEmployee.includes(menuItem.label)) {
                        return (
                          <SidebarItem
                            key={menuIndex}
                            item={menuItem}
                            pageName={pageName}
                            setPageName={setPageName}
                          />
                        )
                      }
                      else if (userDetails?.user_role != 'employee') {
                        return (
                          <SidebarItem
                            key={menuIndex}
                            item={menuItem}
                            pageName={pageName}
                            setPageName={setPageName}
                          />
                        )
                      }
                    }
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
