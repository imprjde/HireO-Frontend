// import { useEffect, useState } from "react";
// import HeroSection from "./HeroSection";
// import LatestJobs from "./LatestJobs";
// import Navbar from "./shared/Navbar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import BottomNav from "./shared/BottomNav";
// import Carousel from "./carousels/Carousel";
// import LoadingBar from "react-top-loading-bar";
// import Animation from "./animation/Animation";
// import { AnimatePresence, motion } from "framer-motion";
// import useTokenExpirationCheck from "@/hooks/useTokenExpirationCheck";

// const Home = () => {
//   useTokenExpirationCheck();
//   const [progress, setProgress] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(true);

//   useGetAllJobs();
//   const { authUser } = useSelector((store) => store.auth);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (authUser?.role === "recruiter") {
//       navigate("/admin/companies");
//     }
//   }, [authUser, navigate]);

//   useEffect(() => {
//     const hasAnimated = sessionStorage.getItem("hasAnimated");

//     if (hasAnimated) {
//       setIsAnimating(false);
//     } else {
//       sessionStorage.setItem("hasAnimated", "true");
//       setTimeout(() => setIsAnimating(false), 1500);
//     }
//   }, []);

//   return (
//     <div>
//       <AnimatePresence>
//         {isAnimating ? (
//           <Animation key="animation" />
//         ) : (
//           <>
//             <Navbar />
//             <motion.div
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // transition={{ duration: 1 }}
//             >
//               <LoadingBar color="#FFFFFF" height={4} progress={progress} />
//               <HeroSection setProgress={setProgress} />
//               <Carousel setProgress={setProgress} />
//               <LatestJobs />
//               <BottomNav />
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Home;

//////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import BottomNav from "./shared/BottomNav";
import Carousel from "./carousels/Carousel";
import LoadingBar from "react-top-loading-bar";
import Animation from "./animation/Animation";
import { AnimatePresence, motion } from "framer-motion";
import useTokenExpirationCheck from "@/hooks/useTokenExpirationCheck";
import useHasAnimated from "@/hooks/useHasAnimated";

const Home = () => {
  useTokenExpirationCheck();
  const [progress, setProgress] = useState(0);
  const isAnimating = useHasAnimated();

  useGetAllJobs();
  const { authUser } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [authUser, navigate]);

  return (
    <div>
      <AnimatePresence>
        {isAnimating ? (
          <Animation key="animation" />
        ) : (
          <>
            <Navbar />
            <motion.div>
              <LoadingBar color="#FFFFFF" height={4} progress={progress} />
              <HeroSection setProgress={setProgress} />
              <Carousel setProgress={setProgress} />
              <LatestJobs />
              <BottomNav />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
