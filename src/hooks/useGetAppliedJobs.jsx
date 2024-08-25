// import { setAllAppliedJobs } from "@/redux/applicationSlice";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const useGetAppliedJobs = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         setIsLoading(true);
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(
//           "http://localhost:8000/api/v1/application/get"
//         );
//         if (res.data.success) {
//           dispatch(setAllAppliedJobs(res.data.application));
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setIsLoading(false);
//         console.log(error);
//       }

//       return isLoading;
//     };
//     fetchAppliedJobs();
//   }, []);
// };

// export default useGetAppliedJobs;

//////////////////////////////////////////////

import {
  setAllAppliedJobs,
  setIsFetchingAppliedJob,
} from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        dispatch(setIsFetchingAppliedJob(true));
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          "http://localhost:8000/api/v1/application/get"
        );
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
          dispatch(setIsFetchingAppliedJob(false));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsFetchingAppliedJob(false));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
