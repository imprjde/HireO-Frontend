// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "./ui/badge";
// import AppliedJobsLoader from "./loaders/AppliedJobsLoader";
// import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// import { toast } from "sonner";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const ApplicationTable = () => {
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const { allAppliedJobs } = useSelector((store) => store.application);
//   const { isLoading, isError } = useGetAppliedJobs(page, setHasMore);

//   if (isLoading && page === 1) {
//     return (
//       <>
//         <div className="flex bg-red- m-auto items-start justify-between p-5">
//           <h1 className="text-lg md:text-xl font-bold items-center">
//             Applied Jobs
//           </h1>
//         </div>
//         <AppliedJobsLoader />
//       </>
//     );
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
//       <div className="flex bg-red- m-auto items-start justify-between p-5">
//         <h1 className="text-lg md:text-xl font-bold items-center">
//           Applied Jobs
//         </h1>
//       </div>

//       {!isLoading && (!allAppliedJobs || allAppliedJobs.length === 0) ? (
//         <div className="flex justify-center">
//           <p className="py-5 text-center text-sm md:text-base font-light">
//             It looks like you haven&#39;t applied to any jobs yet.
//           </p>
//         </div>
//       ) : (
//         allAppliedJobs?.length > 0 && (
//           <Table className="bg-gray-950">
//             <TableCaption className="my-2">
//               {isLoading && page === 1 && <AppliedJobsLoader />}
//               <div className="flex justify-center mb-3">
//                 {!isLoading && hasMore && (
//                   <button
//                     onClick={() => setPage(page + 1)}
//                     className="text-gray-900 w-1/2 md:w-[200px] font-medium px-4 bg-white mx-10 py-1.5 rounded-sm"
//                   >
//                     Load More
//                   </button>
//                 )}
//                 {isLoading && (
//                   <div className="w-7 h-7 border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin"></div>
//                 )}
//               </div>
//               <span>A list of your recent applied jobs</span>
//             </TableCaption>

//             <TableHeader>
//               <TableRow className="hover:bg-gray-950">
//                 <TableHead className="text-gray-300">Date</TableHead>
//                 <TableHead className="text-gray-300">Job Role</TableHead>
//                 <TableHead className="text-gray-300">Company</TableHead>
//                 <TableHead className="text-gray-300 text-right">
//                   Status
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {allAppliedJobs
//                 ?.filter((job) => job?.job !== null)
//                 ?.map((appliedjob) => (
//                   <TableRow
//                     className="hover:bg-gray-950 text-xs md:text-sm"
//                     key={appliedjob?._id}
//                   >
//                     <TableCell>
//                       {appliedjob?.createdAt?.split("T")[0]}
//                     </TableCell>
//                     <TableCell>{appliedjob?.job?.title}</TableCell>
//                     <TableCell>{appliedjob?.job?.company?.name}</TableCell>
//                     <TableCell className="text-right">
//                       <Badge
//                         className={`${
//                           appliedjob?.status === "rejected"
//                             ? "bg-red-600"
//                             : appliedjob?.status === "pending"
//                             ? "bg-gray-600"
//                             : "bg-green-600"
//                         }`}
//                       >
//                         {appliedjob?.status?.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         )
//       )}
//     </>
//   );
// };
// export default ApplicationTable;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import AppliedJobsLoader from "./loaders/AppliedJobsLoader";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";

const ApplicationTable = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { allAppliedJobs } = useSelector((store) => store.application);
  const { isLoading, isError } = useGetAppliedJobs(page, setHasMore);

  if (isLoading && page === 1) {
    return (
      <>
        <div className="flex bg-red- m-auto items-start justify-between p-5">
          <h1 className="text-lg md:text-xl font-bold items-center">
            Applied Jobs
          </h1>
        </div>
        <AppliedJobsLoader />
      </>
    );
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
      <div className="flex bg-red- m-auto items-start justify-between p-5">
        <h1 className="text-lg md:text-xl font-bold items-center">
          Applied Jobs
        </h1>
      </div>

      {!isLoading && (!allAppliedJobs || allAppliedJobs.length === 0) ? (
        <div className="flex justify-center">
          <p className="py-5 text-center text-sm md:text-base font-light">
            It looks like you haven&#39;t applied to any jobs yet.
          </p>
        </div>
      ) : (
        allAppliedJobs?.length > 0 && (
          <Table className="bg-gray-950">
            <TableCaption className="my-2">
              {isLoading && page === 1 && <AppliedJobsLoader />}
              <div className="flex justify-center mb-3">
                {!isLoading && hasMore && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="text-gray-900 w-1/2 md:w-[200px] font-medium px-4 bg-white mx-10 py-1.5 rounded-sm"
                  >
                    Load More
                  </button>
                )}
                {isLoading && (
                  <div className="w-7 h-7 border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin"></div>
                )}
              </div>
              <span>A list of your recent applied jobs</span>
            </TableCaption>

            <TableHeader>
              <TableRow className="hover:bg-gray-950">
                <TableHead className="text-gray-300 hidden md:block">
                  Date
                </TableHead>
                <TableHead className="text-gray-300">Job Role</TableHead>
                <TableHead className="text-gray-300">Company</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allAppliedJobs
                ?.filter((job) => job?.job !== null)
                ?.map((appliedjob) => (
                  <TableRow
                    className="hover:bg-gray-950 text-xs md:text-sm"
                    key={appliedjob?._id}
                  >
                    <TableCell className="hidden md:block">
                      {appliedjob?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell>{appliedjob?.job?.title}</TableCell>
                    <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={`${
                          appliedjob?.status === "rejected"
                            ? "bg-red-600 hover:bg-red-600"
                            : appliedjob?.status === "pending"
                            ? "bg-gray-600 hover:bg-gray-600"
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
        )
      )}
    </>
  );
};
export default ApplicationTable;
