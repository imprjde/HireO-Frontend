import { useState, useEffect } from "react";
import axios from "axios";

const useFilterJobs = (query) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/job/filterJobs`,
          {
            params: { query },
          }
        );
        setFilteredJobs(res.data);
        setError(null);
      } catch (error) {
        setError(error);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchFilteredJobs();
    }
  }, [query]);

  return { filteredJobs, error, loading };
};

export default useFilterJobs;
