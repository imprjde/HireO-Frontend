/* eslint-disable react/prop-types */
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useClickOutside from "@/helpers/useClickOutside";
import { setClearSavedJobs } from "@/redux/jobSlice";
import { setAllNotifications } from "@/redux/notificationSlice";

export default function LogoutConfirmation({ setShowModal }) {
  const modalRef = useClickOutside(() => setShowModal(false));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setClearSavedJobs([]));
        dispatch(setAllNotifications([]));
        setShowModal(false);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      setShowModal(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0  flex  items-center justify-center  bg-gray-100 bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        className="bg-gray-950  h-64 md:h-80 shadow-md shadow-rose-500 flex flex-col m-auto space-y-7 justify-center items-center px-10 md:px-36 rounded-md"
      >
        <div>
          <span className="font-semibold text-lg">
            Are you sure you want to Logout ?
          </span>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="bg-white text-black font-semibold px-3 md:px-5 md:py-2 py-1 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={logoutHandler}
            className="bg-rose-500 text-white font-semibold px-3 md:px-5 md:py-2 py-1 rounded-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
