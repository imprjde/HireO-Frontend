/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
export default function DeniedInfo({ setShowModal }) {
  const modalRef = useClickOutside(() => setShowModal(false));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-white bg-opacity-40"></div>
      <div
        ref={modalRef}
        className="relative bg-black mx-3 md:mx-0 p-6 w-full max-w-md rounded-lg shadow-lg z-10"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-200"
        >
          <IoMdClose color="white" />
        </button>

        <p className="text-gray-200 my-16 dark:text-gray-300  text-base text-justify font-semibold">
          You&rsquo;ve Disabled Notifications From HireO. To Receive Job
          Updates, Please Enable Notifications In Your Browser Settings.
        </p>
      </div>
    </motion.div>
  );
}
