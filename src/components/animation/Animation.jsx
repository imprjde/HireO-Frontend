import { useEffect, useState } from "react";
import HireOLogo from "../../../src/assets/HireOLogo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Animation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="animation"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2 } }}
          className="min-h-screen flex bg-gray-950 justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.img
              className="w-[150px] rounded-full relative z-10"
              src={HireOLogo}
              alt="HireO Logo"
              style={{
                filter: "drop-shadow(0px 0px 20px rgba(214, 32, 175, 1))",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
