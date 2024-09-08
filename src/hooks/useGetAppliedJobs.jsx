// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useGetAppliedJobs = () => {
//   return useQuery({
//     queryKey: ["appliedJobs"],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/application/get`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("RES API CALL 10SEC:");
//       return res.data.application;
//     },
//     staleTime: 60000, // 1 minute
//     cacheTime: 300000, // 5 minutes
//     retry: false,
//   });
// };

// export default useGetAppliedJobs;

///////////////////////////////// APPLIED JOB PAGINATION /////////////////////////////////////////////////

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useGetAppliedJobs = (page) => {
//   return useQuery({
//     queryKey: ["appliedJobs", page],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/application/get?page=${page}`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("RES API CALL 10SEC:", res.data);
//       return res.data.application;
//     },
//     staleTime: 60000, // 1 minute
//     cacheTime: 300000, // 5 minutes
//     retry: false,
//   });
// };

// export default useGetAppliedJobs;

////////////////////////////////////////////////////////////////////////////////////////////////
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addAppliedJobs, setAllAppliedJobs } from "@/redux/applicationSlice";

const useGetAppliedJobs = (page, setHasMore) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["appliedJobs", page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/application/get?page=${page}`,
        {
          withCredentials: true,
        }
      );
      console.log("RES API CALL 10SEC:", res.data.application);
      setHasMore(res?.data?.hasMore);
      if (page === 1) {
        dispatch(setAllAppliedJobs(res?.data?.application));
      } else {
        dispatch(addAppliedJobs(res?.data?.application));
      }

      return res.data.application;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
  });
};

export default useGetAppliedJobs;
