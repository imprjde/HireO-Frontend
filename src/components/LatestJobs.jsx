// import { useMemo } from "react";
// import LatestJobCard from "./LatestJobCard";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import InfiniteLoader from "./loaders/InfiniteLoader";

// const LatestJobs = () => {
//   const { allJobs } = useSelector((store) => store.job);
//   const { loadMoreJobs, hasMore } = useGetAllJobs();

//   const memoizedJobs = useMemo(() => allJobs, [allJobs]);

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
//         dataLength={memoizedJobs.length}
//         next={loadMoreJobs}
//         hasMore={hasMore}
//         loader={<InfiniteLoader />}
//         endMessage={endMessage}
//       >
//         <div className="grid m-auto justify-center grid-cols-1 md:grid-cols-3 gap-4 my-5">
//           {memoizedJobs.map((job) => (
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

//////////////////////// MULTI API CALL BUG FIX //////////////////////////////////////////////////////////////

import { useMemo } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import InfiniteLoader from "./loaders/InfiniteLoader";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { loadMoreJobs, hasMore } = useGetAllJobs();

  const memoizedJobs = useMemo(() => allJobs, [allJobs]);

  const endMessage = (
    <p className="text-lg font-semibold text-gray-200 fo pt-5 text-center">
      No More Jobs To Display!
    </p>
  );

  return (
    <div className="max-w-7xl md:mx-auto mx-3 pb-20 overflow-x-hidden  mt-12 md:mt-16 m-auto justify-center flex flex-col">
      <h1 className="text-2xl md:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest and Top</span>
        <span className="text-white"> Job Openings</span>
      </h1>

      <InfiniteScroll
        dataLength={memoizedJobs.length}
        next={loadMoreJobs}
        hasMore={hasMore}
        loader={<InfiniteLoader />}
        endMessage={endMessage}
      >
        <div className="grid m-auto justify-center grid-cols-1 md:grid-cols-3 gap-4 my-5">
          {memoizedJobs.map((job) => (
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
