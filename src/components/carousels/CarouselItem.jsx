import {
  setIsSearching,
  setSearchedJobs,
  setSearchText,
} from "@/redux/jobSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CarouselItem({ category, setProgress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCarouselSearch = async (category) => {
    try {
      setProgress(50);
      dispatch(setSearchText(category));
      dispatch(setIsSearching(true));
      let res = await axios.get(
        `http://localhost:8000/api/v1/job/searchJob?carouselQuery=${category}`
      );

      // console.log(res.data.jobs);
      dispatch(setSearchedJobs(res.data.jobs));
      dispatch(setIsSearching(false));
      setProgress(100);
      setTimeout(() => {
        navigate(`/browse?searchQuery=${category}`);
      }, 1000);
    } catch (error) {
      dispatch(setIsSearching(false));
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleCarouselSearch(category)}
      className="  m-auto flex space-x-3 justify-center "
    >
      <div className=" space-y-3 flex flex-col">
        <span className=" cursor-pointer bg-white font-semibold w-fit px-2 py-2 rounded-2xl text-sm md:text-base text-black m-auto text-center  ">
          {category}
        </span>
      </div>
    </div>
  );
}
