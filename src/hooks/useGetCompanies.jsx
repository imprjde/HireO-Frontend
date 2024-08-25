import { setCompanies, setIsFetchingCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = (shouldSkip) => {
  console.log("useGetCompanies HOOK RUNNING");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log("RUNNINNG XAMPP");
        dispatch(setIsFetchingCompanies(true));
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `http://localhost:8000/api/v1/company/getcompany?page=${page}&shouldSkip=${shouldSkip}`
        );
        console.log("RES.DATA", res.data);
        dispatch(setCompanies(res.data.companies));
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsFetchingCompanies(false));
      }
    };

    fetchCompanies();
  }, [page, dispatch, shouldSkip]);

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

export default useGetCompanies;
