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
import MoveToTop from "./MoveToTop";

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

  const handleFullscreen = () => {
    const elem = document.documentElement; // This refers to the entire document, which will be displayed in fullscreen

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isAnimating ? (
          <Animation key="animation" />
        ) : (
          <>
            <Navbar />
            <button onClick={handleFullscreen} className="bg-red-500">Enter Fullscreen</button>
            <motion.div>
              <LoadingBar color="#FFFFFF" height={4} progress={progress} />
              <HeroSection setProgress={setProgress} />
              <Carousel setProgress={setProgress} />
              <MoveToTop />
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
