/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  setIsSearching,
  setSearchedJobs,
  setSearchText,
} from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const HeroSection = ({ setProgress }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        setProgress(50);
        dispatch(setSearchText(query));
        dispatch(setIsSearching(true));
        let res = await axios.get(
          `http://localhost:8000/api/v1/job/searchJob?query=${query}`
        );

        // console.log("Search Response", res.data.filteredData);
        dispatch(setSearchedJobs(res.data.filteredData));
        dispatch(setIsSearching(false));
        setProgress(100);
        setTimeout(() => {
          navigate(`/browse?searchQuery=${query}`);
        }, 500);
      } catch (error) {
        dispatch(setIsSearching(false));
        console.log(error);
      }
    } else {
      toast.warning("Search Field Cannot Be Empty");
    }
  };

  return (
    <div className="text-center ">
      <div className="flex flex-col gap-5 my-10">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
          className="text-center w-[55%] md:w-fit justify-center mx-auto"
        >
          <div className="text-orange-600 px-4 py-2 rounded-full bg-gray-100 font-medium">
            No. 1 Job Hunt Website
          </div>
        </motion.div>
        <div>
          <h1 className="text-3xl md:text-5xl justify-start font-bold text-white">
            Discover, Apply & <br /> Land Your{" "}
            <span className="text-[#6A38C2]">Dream Job</span>
          </h1>
        </div>
        <div className="md:w-fit w-[90%] m-auto">
          <p className="text-white font-medium text-sm leading-5 px-5 md:px-0 text-justify">
            Unlock Your Career Potential—Find and Apply for Jobs That Fit Your
            Skills and Goals.
          </p>
        </div>
        <form onSubmit={handleSearch}>
          <div className="flex shadow-md shadow-purple-600  w-[80%] md:w-[40%]  bg-blend-normal border-[0.5px] border-gray-700  bg-black  pl-3 border-x-0 border-t-gray-800 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What’s your dream job?"
              className="outline-none text-sm md:text-base placeholder:pl-2 pl-1 md:pl-2  text-white  placeholder:text-white placeholder:font-normal  bg-transparent border-none w-full"
            />
            <Button
              type="submit"
              className="rounded-r-full bg-gradient-to-br from-black to-[#6A38C2] hover:bg-[#6A38C2]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default HeroSection;
