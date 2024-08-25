/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import { setAdminJobsLocally } from "@/redux/jobSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DeleteJobConfirmation({ jobId, setJobId, setPopup }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useClickOutside(() => setPopup(false));

  const handleDeleteJob = async () => {
    try {
      setIsDeleting(true);
      let resp = await axios.delete(
        `http://localhost:8000/api/v1/job/delete/${jobId}`
      );

      console.log("DELETE API RESPONSE", resp.data.message);
      setIsDeleting(false);
      setPopup(false);
      setJobId(null);
      toast.success(resp?.data?.message);
      dispatch(setAdminJobsLocally(jobId));
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      setJobId(null);
      setPopup(false);
      toast.error("Failed to delete this job");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0  flex   items-center justify-center  bg-gray-100 bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        className="bg-gray-950 z-50  h-64 md:h-80 shadow-md shadow-rose-500 flex flex-col m-auto space-y-7 justify-center items-center px-10 md:px-36 rounded-md"
      >
        <div>
          <span className="font-semibold text-white text-lg">
            Are you sure you want to Delete this Job ?
          </span>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setPopup(false)}
            className="bg-white text-black font-semibold px-3 md:px-5 md:py-2 py-1 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteJob}
            className="bg-rose-500 justify-center text-center min-h-10 min-w-[115px] text-white font-semibold px-3 md:px-5 md:py-2 py-1 rounded-sm"
          >
            {isDeleting ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
