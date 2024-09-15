// import LatestJobCard from "./LatestJobCard";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import InfiniteLoader from "./loaders/InfiniteLoader";

// const LatestJobs = () => {
//   const { allJobs } = useSelector((store) => store.job);
//   const { loadMoreJobs, hasMore } = useGetAllJobs();

//   /// Below useEffect is used to retain your previous scroll position.

// useEffect(() => {
//   // Scroll to the saved position when the component mounts
//   const savedScrollPosition = sessionStorage.getItem(
//     "latestJobsScrollPosition"
//   );
//   if (savedScrollPosition) {
//     window.scrollTo(0, parseInt(savedScrollPosition, 10));
//   }

//   // Save the current scroll position before the component unmounts
//   const handleScroll = () => {
//     sessionStorage.setItem("latestJobsScrollPosition", window.scrollY);
//   };

//   window.addEventListener("scroll", handleScroll);

//   // Cleanup the event listener on unmount
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

//   const endMessage = (
//     <p className="text-lg font-semibold text-gray-200 fo pt-5 text-center">
//       No More Jobs To Display!
//     </p>
//   );

//   return (
//     <div className="max-w-7xl md:mx-auto mx-3 pb-20 overflow-x-hidden  mt-12 md:mt-16 m-auto justify-center flex flex-col">
//       <h1 className="text-2xl md:text-4xl font-bold">
//         <span className="text-[#6A38C2]">Latest and Top</span>
//         <span className="text-white"> Job Openings</span>
//       </h1>

//       <InfiniteScroll
//         dataLength={allJobs?.length}
//         next={loadMoreJobs}
//         hasMore={hasMore}
//         loader={<InfiniteLoader />}
//         endMessage={endMessage}
//       >
//         <div className="grid m-auto justify-center grid-cols-1 md:grid-cols-3 gap-4 my-5">
//           {allJobs?.map((job) => (
//             <Link key={job._id} to={`/description/${job?._id}`}>
//               <LatestJobCard job={job} />
//             </Link>
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default LatestJobs;

////////////////////// MORE TSQ INFINITE QUERY OPTIMIZATION ////////////////////////////////////////////////

import LatestJobCard from "./LatestJobCard";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import InfiniteLoader from "./loaders/InfiniteLoader";
import { useEffect } from "react";

const LatestJobs = () => {
  const { data: allJobs, loadMoreJobs, hasMore } = useGetAllJobs();

  const endMessage = (
    <p className="text-lg font-semibold text-gray-200 fo pt-5 text-center">
      No More Jobs To Display!
    </p>
  );

  useEffect(() => {
    // Scroll to the saved position when the component mounts
    const savedScrollPosition = sessionStorage.getItem(
      "latestJobsScrollPosition"
    );
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    // Save the current scroll position before the component unmounts
    const handleScroll = () => {
      sessionStorage.setItem("latestJobsScrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
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
