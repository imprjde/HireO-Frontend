import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import Job from "./Job";
import { motion } from "framer-motion";
// import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  // useGetAllJobs();
  const { searchedJobs, searchText, isSearching } = useSelector(
    (store) => store.job
  );

  console.log("isSearching=", isSearching);
  return (
    <div>
      <Navbar />
      <div className="w-full h-full mx-auto bg-black pb-10 px-3">
        <h1 className="font-bold text-gray-100 mb-5 mt-2 text-lg md:text-xl ">
          Showing Results For {searchText} ({searchedJobs?.length})
        </h1>
        <div className="flex-1  overflow-y-auto no-scrollbar pb-5">
          <div className="grid m md:grid-cols-3 gap-4">
            {searchedJobs?.length !== 0 ? (
              searchedJobs?.map((job) => {
                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                );
              })
            ) : (
              <div className="max-h-screen md:w-screen max-w-screen bg-red-5 overflow-x-hidden flex  pt-20 justify-center">
                <div className="flex flex-col items-center">
                  <img
                    src="https://cdn.usegalileo.ai/sdxl10/0409343f-5d2f-4f03-9722-86a1f3b435db.png "
                    className="w-[70%] md:w-full  md:h-[50%] rounded-md"
                    alt="Background"
                  />
                  <p className="mt-8 text-sm md:text-lg text-center text-white ">
                    We couldn&#39;t find any matches for &#34;{searchText}&#34;.
                    <br /> Try another search.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
