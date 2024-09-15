// import { setAllJobs, addJobs } from "@/redux/jobSlice";
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
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/job/getjob?=${searchText}&page=${page}&limit=6`
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText, page]);

//   const loadMoreJobs = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return { loadMoreJobs, hasMore, fetchJobs };
// };

// export default useGetAllJobs;

//////////////////////////////  TSQ OPTIMIZATION //////////////////////////////////////////////////

// import { setAllJobs, addJobs } from "@/redux/jobSlice";
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
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/job/getjob?=${searchText}&page=${page}&limit=6`
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText, page]);

//   const loadMoreJobs = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return { loadMoreJobs, hasMore, fetchJobs };
// };

// export default useGetAllJobs;

//////////////////////////////  MORE TSQ OPTIMIZATION //////////////////////////////////////////////////
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, addJobs } from "@/redux/jobSlice";

const fetchJobs = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/job/getjob?page=${pageParam}&limit=6`,
    { withCredentials: true }
  );
  return res.data;
};

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);

  const query = useInfiniteQuery({
    queryKey: ["jobs", searchText],
    queryFn: fetchJobs,
    // staleTime: 5 * 60 * 1000,
    cacheTime: Infinity,
    // staleTime: 5 * 60 * 1000,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.success && lastPage.jobs.length > 0
        ? allPages.length + 1
        : undefined;
    },
    onSuccess: (data) => {
      const allJobs = data.pages.flatMap((page) => page.jobs);
      if (data.pages.length === 1) {
        dispatch(setAllJobs(allJobs));
      } else {
        dispatch(addJobs(allJobs));
      }
    },
  });

  return {
    data: query.data?.pages.flatMap((page) => page.jobs) || [],
    loadMoreJobs: query.fetchNextPage,
    hasMore: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    status: query.status,
    error: query.error,
  };
};

export default useGetAllJobs;
