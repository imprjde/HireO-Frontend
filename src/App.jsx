import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { motion } from "framer-motion";
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
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reqNotifyPermission } from "./helpers/reqNotifyPermission";
import { useEffect, useState } from "react";
import DeniedInfo from "./components/DeniedInfo";
import { AnimatePresence } from "framer-motion";

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
  const [showModal, setShowModal] = useState(false);
  const { authUser } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // let refToken = localStorage.getItem("refToken");
    if (
      authUser &&
      authUser?._id &&
      authUser?.role === "student"
      // && authUser?.fcmToken !== refToken
    ) {
      console.warn("UseEffect for Permission Running");
      reqNotifyPermission(authUser?._id, dispatch, setShowModal);
    } else {
      console.error("reqNotifyPermission Won't run");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?._id]);

  const queryClient = new QueryClient();

  return (
    <div className="bg-gradient-to-b min-h-screen bg-black">
      <AnimatePresence>
        {showModal && <DeniedInfo setShowModal={setShowModal} />}
      </AnimatePresence>
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
