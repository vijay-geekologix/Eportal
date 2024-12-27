// // utils/withRoleGuard.tsx
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useUserDetailsContext } from "@/context/UserDetailsContext";

// const roleBasedAccess:any = {
//   employee: ["/dashboard", "/attendance/my-attendance", "/leaves"],
//   admin: ["*"], // '*' means access to all routes
//   manager: ["*"], // add restrictions if needed
// };

// export function withRoleGuard(Component: any) {
//     const {userDetails}:any = useUserDetailsContext();
//     return function RoleGuardedComponent(props: any) {
//     const role = userDetails?.user_role;
//     const router = useRouter();

//     useEffect(() => {
//       if (!role) return; // Wait for role to be fetched
//       const allowedPaths = roleBasedAccess[role] || [];
//       if (!allowedPaths.includes("*") && !allowedPaths.includes(router.pathname)) {
//         router.replace("/dashboard"); // Redirect to a safe fallback (e.g., dashboard)
//       }
//     }, [role, router.pathname]);

//     return <Component {...props} />;
//   };
// }
