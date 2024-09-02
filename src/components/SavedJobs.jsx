// import { useEffect, useState } from "react";
// import SavedJobCard from "./SavedJobCard";
// import BottomNav from "./shared/BottomNav";
// import Navbar from "./shared/Navbar";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsFetchingSavedJobs, setSavedJobs } from "@/redux/jobSlice";
// import UpdateLoader from "./loaders/UpdateLoader";
// import { toast } from "sonner";
// import SavedJobsLoader from "./loaders/SavedJobsLoader";
// import useTokenExpirationCheck from "@/hooks/useTokenExpirationCheck";

// export default function SavedJobs() {
//   useTokenExpirationCheck();
//   const { authUser } = useSelector((store) => store.auth);
//   const { savedJobs, isFetchingSavedJobs } = useSelector((store) => store.job);
//   const [isRemoving, setIsRemoving] = useState(false);
//   console.log(savedJobs);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
//       if (!authUser) {
//         toast.info("Please Login to access your saved Jobs");
//         return;
//       }
//       try {
//         dispatch(setIsFetchingSavedJobs(true));
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/saved/getSavedJobs?created_by=${
//             authUser?._id
//           }`
//         );
//         dispatch(setSavedJobs(res.data.savedJobs));
//         dispatch(setIsFetchingSavedJobs(false));
//       } catch (error) {
//         toast.error(error?.message);
//         dispatch(setIsFetchingSavedJobs(false));
//         console.log(error);
//       }
//     };
//     fetchSavedJobs();
//   }, [authUser, authUser?._id, dispatch]);
//   return (
//     <div className=" bg-black pb-24 min-h-screen w-screen text-white">
//       <Navbar />
//       {!isFetchingSavedJobs && !authUser && (
//         <div className="h-screen w-full pt-[350px]  md:pt-64">
//           <button
//             onClick={() => navigate("/login")}
//             className="flex bg-white  space-x-1  text-gray-900 font-bold px-10 py-2 rounded-3xl m-auto justify-center items-center"
//           >
//             <span> Login here to access saved Jobs</span>
//             <span className="mt-1">
//               <FaArrowRightLong />
//             </span>
//           </button>
//         </div>
//       )}

//       {authUser && (
//         <>
//           {isRemoving && <UpdateLoader message={"Removing..."} />}
//           <div>
//             <>
//               {" "}
//               <span className="w-full m-auto flex pl-4 justify- mt-4 font-extrabold text-xl tracking-wider">
//                 Your Saved Jobs ({savedJobs?.length})
//               </span>
//               <div className="mt-10 md:grid space-y-5 md:space-y-0 md:grid-cols-3 gap-5">
//                 {!isFetchingSavedJobs &&
//                   savedJobs?.map((job) => (
//                     <SavedJobCard
//                       key={job._id}
//                       job={job}
//                       setIsRemoving={setIsRemoving}
//                     />
//                   ))}
//               </div>
//             </>

//             {isFetchingSavedJobs && (
//               <div className="mt-10  md:grid space-y-5 md:space-y-0 md:grid-cols-3 gap-5">
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
//                   <SavedJobsLoader key={index} />
//                 ))}
//               </div>
//             )}

//             {savedJobs?.length === 0 && !isFetchingSavedJobs && (
//               <>
//                 <div className="bg-red-0 min-h-[60vh] md:min-h-[80vh]  space-y-4  text-lg md:text-xl flex flex-col m-auto justify-center items-center">
//                   <span className="tracking-widest font-semibold">
//                     You Have No Saved Jobs :)
//                   </span>
//                   <span>
//                     <button
//                       onClick={() => navigate("/jobs")}
//                       className="bg-sky-500 px-4 font-normal text-base md:text-lg py-1 rounded-3xl"
//                     >
//                       Create Your First Save Here
//                     </button>
//                   </span>
//                 </div>
//               </>
//             )}
//           </div>
//         </>
//       )}

//       <BottomNav />
//     </div>
//   );
// }

//////////////////////// TANSTACK OPTIMIZATION //////////////////////////////////////////////////////////

import { useState } from "react";
import SavedJobCard from "./SavedJobCard";
import BottomNav from "./shared/BottomNav";
import Navbar from "./shared/Navbar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSavedJobs } from "@/redux/jobSlice";
// import { setIsFetchingSavedJobs } from "@/redux/jobSlice";
import UpdateLoader from "./loaders/UpdateLoader";
import { toast } from "sonner";
import SavedJobsLoader from "./loaders/SavedJobsLoader";
import useTokenExpirationCheck from "@/hooks/useTokenExpirationCheck";
import { useQuery } from "@tanstack/react-query";

export default function SavedJobs() {
  useTokenExpirationCheck();
  const { authUser } = useSelector((store) => store.auth);
  // const { savedJobs, isFetchingSavedJobs } = useSelector((store) => store.job);
  const [isRemoving, setIsRemoving] = useState(false);
  // console.log(savedJobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchSavedJobs = async () => {
  //     if (!authUser) {
  //       toast.info("Please Login to access your saved Jobs");
  //       return;
  //     }
  //     try {
  //       dispatch(setIsFetchingSavedJobs(true));
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/saved/getSavedJobs?created_by=${
  //           authUser?._id
  //         }`
  //       );
  //       dispatch(setSavedJobs(res.data.savedJobs));
  //       dispatch(setIsFetchingSavedJobs(false));
  //     } catch (error) {
  //       toast.error(error?.message);
  //       dispatch(setIsFetchingSavedJobs(false));
  //       console.log(error);
  //     }
  //   };
  //   fetchSavedJobs();
  // }, [authUser, authUser?._id, dispatch]);

  const fetchSavedJobs = async (userId) => {
    console.log("FETCH SAVED JOB API RUNNING");
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/saved/getSavedJobs?created_by=${userId}`,
        { withCredentials: true }
      );
      dispatch(setSavedJobs(res.data.savedJobs));
      return res?.data?.savedJobs;
    } catch (error) {
      console.log("ERR::", error);
      toast.error(error?.response?.data?.message);
      return [];
    }
  };
  const { isLoading: isFetchingSavedJobs, data: savedJobs } = useQuery({
    queryKey: ["savedJobs", authUser?._id],
    queryFn: () => fetchSavedJobs(authUser?._id),
    enabled: !!authUser,
    staleTime: 40000,
  });

  return (
    <div className=" bg-black pb-24 min-h-screen w-screen text-white">
      <Navbar />
      {!isFetchingSavedJobs && !authUser && (
        <div className="h-screen w-full pt-[350px]  md:pt-64">
          <button
            onClick={() => navigate("/login")}
            className="flex bg-white  space-x-1  text-gray-900 font-bold px-10 py-2 rounded-3xl m-auto justify-center items-center"
          >
            <span> Login here to access saved Jobs</span>
            <span className="mt-1">
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      )}

      {authUser && (
        <>
          {isRemoving && <UpdateLoader message={"Removing..."} />}
          <div>
            <>
              {" "}
              <span className="w-full m-auto flex pl-4 justify- mt-4 font-extrabold text-xl tracking-wider">
                Your Saved Jobs ({savedJobs?.length})
              </span>
              <div className="mt-10 md:grid space-y-5 md:space-y-0 md:grid-cols-3 gap-5">
                {!isFetchingSavedJobs &&
                  savedJobs?.map((job) => (
                    <SavedJobCard
                      key={job._id}
                      job={job}
                      setIsRemoving={setIsRemoving}
                    />
                  ))}
              </div>
            </>

            {isFetchingSavedJobs && (
              <div className="mt-10  md:grid space-y-5 md:space-y-0 md:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                  <SavedJobsLoader key={index} />
                ))}
              </div>
            )}

            {savedJobs?.length === 0 && !isFetchingSavedJobs && (
              <>
                <div className="bg-red-0 min-h-[60vh] md:min-h-[80vh]  space-y-4  text-lg md:text-xl flex flex-col m-auto justify-center items-center">
                  <span className="tracking-widest font-semibold">
                    You Have No Saved Jobs :)
                  </span>
                  <span>
                    <button
                      onClick={() => navigate("/jobs")}
                      className="bg-sky-500 px-4 font-normal text-base md:text-lg py-1 rounded-3xl"
                    >
                      Create Your First Save Here
                    </button>
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
