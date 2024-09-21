import LatestJobCard from "./LatestJobCard";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import InfiniteLoader from "./loaders/InfiniteLoader";
import { useEffect } from "react";

const LatestJobs = () => {
  const { data: allJobs, loadMoreJobs, hasMore, status } = useGetAllJobs();

  const endMessage = (
    <p className="text-lg font-semibold text-gray-200 fo pt-5 text-center">
      {status === "pending" ? <InfiniteLoader /> : "No More Jobs To Display!"}
    </p>
  );

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(
      "latestJobsScrollPosition"
    );
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem("latestJobsScrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-7xl md:mx-auto mx-3 pb-20 overflow-x-hidden mt-12 md:mt-16 m-auto justify-center flex flex-col">
      <h1 className="text-2xl md:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest and Top</span>
        <span className="text-white"> Job Openings</span>
      </h1>

      <InfiniteScroll
        dataLength={allJobs?.length || 0}
        next={loadMoreJobs}
        hasMore={hasMore}
        loader={<InfiniteLoader />}
        endMessage={endMessage}
      >
        <div className="grid m-auto justify-center grid-cols-1 md:grid-cols-3 gap-4 my-5">
          {allJobs?.map((job) => (
            <Link key={job._id} to={`/description/${job?._id}`}>
              <LatestJobCard job={job} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default LatestJobs;
