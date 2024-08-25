import { motion } from "framer-motion";

const Jobnotfound = () => {
  return (
    <div className="flex-1 flex items-center justify-center mx-auto">
      <motion.img
        className="w-[75%] md:w-[50%] pt-64 md:pt-0"
        src="./notfound.jpg"
        alt="Job not found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default Jobnotfound;
