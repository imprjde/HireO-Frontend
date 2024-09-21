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
    cacheTime: Infinity,
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
