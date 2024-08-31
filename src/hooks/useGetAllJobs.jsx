// import { setAllJobs, addJobs } from "@/redux/jobSlice"; // add addJobs action
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const { searchText } = useSelector((store) => store.job);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchJobs = async () => {
//     try {
//       axios.defaults.withCredentials = true;
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/job/getjob? =${searchText}&page=${page}&limit=6`
//       );

//       console.log(res.data.jobs);
//       if (!res.data.success) {
//         console.log("FALSE");
//         setHasMore(false);
//       } else if (res.data.success) {
//         if (page === 1) {
//           dispatch(setAllJobs(res.data.jobs));
//         } else {
//           dispatch(addJobs(res.data.jobs));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [searchText, page]);

//   const loadMoreJobs = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return { loadMoreJobs, hasMore, fetchJobs };
// };

// export default useGetAllJobs;

//////// MULTI API CALL BUG FIX /////////////////////////////////////

import { setAllJobs, addJobs } from "@/redux/jobSlice"; // add addJobs action
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/job/getjob?=${searchText}&page=${page}&limit=6`
      );

      if (!res.data.success) {
        setHasMore(false);
      } else if (res.data.success) {
        if (page === 1) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(addJobs(res.data.jobs));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  const loadMoreJobs = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { loadMoreJobs, hasMore, fetchJobs };
};

export default useGetAllJobs;
