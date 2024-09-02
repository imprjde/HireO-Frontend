// import {
//   setAllAppliedJobs,
//   setIsFetchingAppliedJob,
// } from "@/redux/applicationSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetAppliedJobs = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         dispatch(setIsFetchingAppliedJob(true));
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/application/get`
//         );
//         if (res.data.success) {
//           dispatch(setAllAppliedJobs(res.data.application));
//           dispatch(setIsFetchingAppliedJob(false));
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         dispatch(setIsFetchingAppliedJob(false));
//       }
//     };

//     fetchAppliedJobs();
//   }, [dispatch]);
// };

// export default useGetAppliedJobs;

/////// TANSTACK OPTIMIZATION ////////////////////////////////////////////////

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAppliedJobs = () => {
  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/application/get`,
        {
          withCredentials: true,
        }
      );
      console.log("RES API CALL 10SEC:");
      return res.data.application;
    },
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
    retry: false,
  });
};

export default useGetAppliedJobs;
