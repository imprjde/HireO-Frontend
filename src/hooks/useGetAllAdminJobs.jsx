import { setAdminJobs, setIsFetchingAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllAdminJobs = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        dispatch(setIsFetchingAdminJobs(true));
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `http://localhost:8000/api/v1/job/getadminjobs?page=${page}`
        );

        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        console.log(error);
      } finally {
        dispatch(setIsFetchingAdminJobs(false));
      }
    };

    fetchAdminJobs();
  }, [page, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    page,
    totalPages,
    handlePageChange,
  };
};

export default useGetAllAdminJobs;
