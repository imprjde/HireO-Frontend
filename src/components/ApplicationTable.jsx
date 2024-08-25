import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import AppliedJobsLoader from "./loaders/AppliedJobsLoader";

const ApplicationTable = () => {
  const { allAppliedJobs, isFetchingAppliedJobs } = useSelector(
    (store) => store.application
  );

  return (
    <>
      {isFetchingAppliedJobs && <AppliedJobsLoader />}
      {!isFetchingAppliedJobs &&
      allAppliedJobs &&
      allAppliedJobs.length === 0 ? (
        <>
          <span className="flex m-auto justify-center ">
            <p className="py-5 text-center text-sm md:text-base font- tracking-">
              It looks like you haven&#39;t applied to any jobs yet.
            </p>
          </span>
        </>
      ) : (
        <>
          {!isFetchingAppliedJobs && (
            <Table className="bg-gray-950  ">
              <TableCaption className="my-2">
                A list of your recent applied jobs
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
                          {appliedjob?.createdAt.split("T")[0]}
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
