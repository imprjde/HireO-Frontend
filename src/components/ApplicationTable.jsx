// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// // import { useSelector } from "react-redux";
// import { Badge } from "./ui/badge";
// import AppliedJobsLoader from "./loaders/AppliedJobsLoader";
// import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// import { toast } from "sonner";

// const ApplicationTable = () => {
//   const { data: allAppliedJobs, isLoading, isError } = useGetAppliedJobs();

//   if (isLoading) {
//     return <AppliedJobsLoader />;
//   }

//   if (isError) {
//     toast.error("Failed to fetch your Applied Jobs");
//     return (
//       <div className="flex justify-center py-5">
//         <p className="text-red-500">Failed to get your applied Jobs.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* {isFetchingAppliedJobs && <AppliedJobsLoader />} */}
//       {!isLoading && allAppliedJobs && allAppliedJobs.length === 0 ? (
//         <>
//           <span className="flex m-auto justify-center ">
//             <p className="py-5 text-center text-sm md:text-base font- tracking-">
//               It looks like you haven&#39;t applied to any jobs yet.
//             </p>
//           </span>
//         </>
//       ) : (
//         <>
//           {!isLoading && (
//             <Table className="bg-gray-950  ">
//               <TableCaption className="my-2">
//                 A list of your recent applied jobs
//               </TableCaption>
//               <TableHeader>
//                 <TableRow className="hover:bg-gray-950">
//                   <TableHead className="text-gray-300">Date</TableHead>
//                   <TableHead className="text-gray-300 ">Job Role</TableHead>
//                   <TableHead className="text-gray-300">Company</TableHead>
//                   <TableHead className="text-gray-300 text-right">
//                     Status
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {allAppliedJobs &&
//                   allAppliedJobs
//                     ?.filter((job) => {
//                       return job?.job !== null;
//                     })
//                     ?.map((appliedjob) => (
//                       <TableRow
//                         className="hover:bg-gray-950 text-xs md:text-sm "
//                         key={appliedjob?._id}
//                       >
//                         <TableCell className>
//                           {appliedjob?.createdAt.split("T")[0]}
//                         </TableCell>
//                         <TableCell className>
//                           {appliedjob?.job?.title}
//                         </TableCell>
//                         <TableCell className>
//                           {appliedjob?.job?.company?.name}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Badge
//                             className={`${
//                               appliedjob?.status === "rejected"
//                                 ? "bg-red-600 hover:bg-red-600"
//                                 : appliedjob?.status === "pending"
//                                 ? "bg-gray-600 hover:bg-gray-600 "
//                                 : "bg-green-600 hover:bg-green-600"
//                             }`}
//                           >
//                             {appliedjob?.status?.toUpperCase()}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//               </TableBody>
//             </Table>
//           )}
//         </>
//       )}
//     </>
//   );
// };
// export default ApplicationTable;

////////////////////////////////////////////// APPLIED JOB PAGINATION //////////////////////////////////////////////////

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import AppliedJobsLoader from "./loaders/AppliedJobsLoader";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ApplicationTable = () => {
  const [page, setPage] = useState(1);
  const { allAppliedJobs } = useSelector((store) => store.application); // Get jobs from Redux store
  const { isLoading, isError } = useGetAppliedJobs(page);

  console.log("allAppliedJobs?.length", allAppliedJobs?.length);

  if (isLoading && allAppliedJobs?.length <= 4) {
    return <AppliedJobsLoader />;
  }
  if (isError) {
    toast.error("Failed to fetch your Applied Jobs");
    return (
      <div className="flex justify-center py-5">
        <p className="text-red-500">Failed to get your applied Jobs.</p>
      </div>
    );
  }

  return (
    <>
      {/* {isFetchingAppliedJobs && <AppliedJobsLoader />} */}
      {!isLoading && allAppliedJobs && allAppliedJobs.length === 0 ? (
        <>
          <span className="flex m-auto justify-center ">
            <p className="py-5 text-center text-sm md:text-base font- tracking-">
              It looks like you haven&#39;t applied to any jobs yet.
            </p>
          </span>
        </>
      ) : (
        <>
          <div className="flex bg-red- m-auto items-start  justify-between p-5 ">
            <h1
              // className="text-lg md:text-xl font-bold p-5"
              className="text-lg md:text-xl font-bold  items-center"
            >
              Applied Jobs ({allAppliedJobs?.length})
            </h1>
          </div>
          {allAppliedJobs?.length !== 0 && (
            <Table className="bg-gray-950  ">
              <TableCaption className="my-2">
                <div className="mb-3 m-auto justify-center w-full flex ">
                  {!isLoading ? (
                    <button
                      onClick={() => setPage(page + 1)}
                      className="text-white bg-zinc-900 px-2 py-1 rounded-md"
                    >
                      Load More
                    </button>
                  ) : (
                    <div className="w-8 h-8 border-4 border-t-4 mt-5 border-transparent border-t-white rounded-full animate-spin"></div>
                  )}
                </div>
                <span>A list of your recent applied jobs</span>
              </TableCaption>

              <TableHeader>
                <TableRow className="hover:bg-gray-950">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300 ">Job Role</TableHead>
                  <TableHead className="text-gray-300">Company</TableHead>
                  <TableHead className="text-gray-300 text-right">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAppliedJobs &&
                  allAppliedJobs
                    ?.filter((job) => {
                      return job?.job !== null;
                    })
                    ?.map((appliedjob) => (
                      <TableRow
                        className="hover:bg-gray-950 text-xs md:text-sm "
                        key={appliedjob?._id}
                      >
                        <TableCell className>
                          {appliedjob?.createdAt?.split("T")[0]}
                        </TableCell>
                        <TableCell className>
                          {appliedjob?.job?.title}
                        </TableCell>
                        <TableCell className>
                          {appliedjob?.job?.company?.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={`${
                              appliedjob?.status === "rejected"
                                ? "bg-red-600 hover:bg-red-600"
                                : appliedjob?.status === "pending"
                                ? "bg-gray-600 hover:bg-gray-600 "
                                : "bg-green-600 hover:bg-green-600"
                            }`}
                          >
                            {appliedjob?.status?.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};
export default ApplicationTable;
