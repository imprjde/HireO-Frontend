// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import { motion } from "framer-motion";
// // import { messaging } from "./firebase/firebase";
// // import { getToken } from "firebase/messaging";
// import Jobs from "./components/Jobs";
// import Home from "./components/Home";
// import JobDescription from "./components/JobDescription";
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import Profile from "./components/Profile";
// import PostJob from "./components/PostedJobs";
// import Companies from "./components/Companies";
// import CompanySetup from "./components/CompanySetup";
// import CompanyCreate from "./components/CompanyCreate";
// import Browse from "./components/Browse";
// import CreateJobs from "./components/admin/CreateJobs";
// import ProtectedRoute from "./components/admin/ProtectedRoute";
// import Applicants from "./components/admin/Applicants";
// import SavedJobs from "./components/SavedJobs";
// import EditJob from "./components/EditJob";
// import ForgotPassword from "./components/ForgotPassword";
// import Notification from "./components/NotificationPage";
// import ViewNotification from "./components/ViewNotification";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Animation from "./components/animation/Animation";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { reqNotifyPermission } from "./helpers/reqNotifyPermission";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/jobs",
//     element: <Jobs />,
//   },
//   {
//     path: "/description/:id",
//     element: <JobDescription />,
//   },
//   {
//     path: "/browse",

//     element: <Browse />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/saved",
//     element: <SavedJobs />,
//   },
//   {
//     path: "/view-notification",
//     element: <ViewNotification />,
//   },
//   {
//     path: "/resest-password/9b2d4e8f1a3c5g7h",
//     element: <ForgotPassword />,
//   },
//   // Admin Dashboard Route Starts From Here
//   {
//     path: "/admin/jobs",
//     element: (
//       <ProtectedRoute>
//         <PostJob />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/jobs/create",
//     element: (
//       <ProtectedRoute>
//         <CreateJobs />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/jobs/:id/edit",
//     element: (
//       //
//       <ProtectedRoute>
//         <EditJob />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/jobs/:id/applicants",
//     element: (
//       <ProtectedRoute>
//         <Applicants />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/companies",
//     element: (
//       <ProtectedRoute>
//         <Companies />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/companies/create",
//     element: (
//       <ProtectedRoute>
//         <CompanyCreate />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/admin/companies/:id",
//     element: (
//       <ProtectedRoute>
//         <CompanySetup />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/notifications",
//     element: <Notification />,
//   },
// ]);

// function App() {
//   const { authUser } = useSelector((store) => store.auth);

//   // useEffect(() => {
//   //   const requestNotificationPermission = async () => {
//   //     console.log("requestNotificationPermission FN RUNNING");
//   //     const permission = await window.Notification.requestPermission();
//   //     if (permission === "granted") {
//   //       const token = await getToken(messaging, {
//   //         vapidKey:
//   //           "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
//   //       });
//   //       console.log("Token Generated=", token);
//   //     } else if (permission === "denied") {
//   //       alert("You won't receive any notification from HireO");
//   //     }
//   //   };
//   //   requestNotificationPermission();
//   // }, []);

//   // useEffect(() => {
//   //   if (authUser && authUser?._id) {
//   //     reqNotifyPermission(authUser?._id);
//   //   }
//   // }, [authUser]);

//   const queryClient = new QueryClient();
//   return (
//     <div className="bg-gradient-to-b min-h-screen bg-black">
//       <QueryClientProvider client={queryClient}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <RouterProvider router={appRouter} />
//         </motion.div>
//       </QueryClientProvider>
//     </div>
//   );
// }

// export default App;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { motion } from "framer-motion";
// import { messaging } from "./firebase/firebase";
// import { getToken } from "firebase/messaging";
import Jobs from "./components/Jobs";
import Home from "./components/Home";
import JobDescription from "./components/JobDescription";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/Profile";
import PostJob from "./components/PostedJobs";
import Companies from "./components/Companies";
import CompanySetup from "./components/CompanySetup";
import CompanyCreate from "./components/CompanyCreate";
import Browse from "./components/Browse";
import CreateJobs from "./components/admin/CreateJobs";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Applicants from "./components/admin/Applicants";
import SavedJobs from "./components/SavedJobs";
import EditJob from "./components/EditJob";
import ForgotPassword from "./components/ForgotPassword";
import Notification from "./components/NotificationPage";
import ViewNotification from "./components/ViewNotification";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Animation from "./components/animation/Animation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { reqNotifyPermission } from "./helpers/reqNotifyPermission";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",

    element: <Browse />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/saved",
    element: <SavedJobs />,
  },
  {
    path: "/view-notification",
    element: <ViewNotification />,
  },
  {
    path: "/resest-password/9b2d4e8f1a3c5g7h",
    element: <ForgotPassword />,
  },
  // Admin Dashboard Route Starts From Here
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <CreateJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/edit",
    element: (
      //
      <ProtectedRoute>
        <EditJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
]);

function App() {
  // const { authUser } = useSelector((store) => store.auth);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const requestNotificationPermission = async () => {
  //     console.log("requestNotificationPermission FN RUNNING");
  //     const permission = await window.Notification.requestPermission();
  //     if (permission === "granted") {
  //       const token = await getToken(messaging, {
  //         vapidKey:
  //           "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
  //       });
  //       console.log("Token Generated=", token);
  //     } else if (permission === "denied") {
  //       alert("You won't receive any notification from HireO");
  //     }
  //   };
  //   requestNotificationPermission();
  // }, []);

  // useEffect(() => {
  //   if (authUser && authUser?._id) {
  //     reqNotifyPermission(authUser?._id, dispatch);
  //   }
  // }, []);

  //checking whether cookie is expired or not

  const queryClient = new QueryClient();
  return (
    <div className="bg-gradient-to-b min-h-screen bg-black">
      <QueryClientProvider client={queryClient}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <RouterProvider router={appRouter} />
        </motion.div>
      </QueryClientProvider>
    </div>
  );
}

export default App;

// L17778BPPJF9V8NJ6CJ3D5YT

// secive ID : VA4672d76cc7aabec4517ab7ab0be94b83
