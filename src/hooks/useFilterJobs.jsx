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
          `http://localhost:8000/api/v1/job/filterJobs`,
          {
            params: { query },
          }
        );
        setFilteredJobs(res.data); // Assuming res.data contains the jobs data
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
