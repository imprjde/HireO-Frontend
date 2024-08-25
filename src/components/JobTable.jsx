import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import TableDataLoader from "./loaders/TableDataLoader";
import DeleteJobConfirmation from "./DeleteJobConfirmation";
import { setJobEditData } from "@/redux/jobSlice";
const noLogoDefault =
  "https://novanym.com/cdn/shop/products/No-Logo_3d1beee0-0b40-48f0-b7c9-f19e8e397ea1.png?v=1614178247";
const JobTable = () => {
  const { adminJobs, searchAdminJobs, isFetchingAdminJobs } = useSelector(
    (store) => store.job
  );

  const [filterJob, setFilterJob] = useState(adminJobs);
  const [popup, setPopup] = useState(false);
  const [jobId, setJobId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filterData =
      adminJobs &&
      adminJobs.filter((job) => {
        if (!searchAdminJobs) return true;
        return (
          job.company?.name
            .toLowerCase()
            .includes(searchAdminJobs.toLowerCase()) ||
          job?.title.toLowerCase().includes(searchAdminJobs.toLowerCase())
        );
      });
    setFilterJob(filterData);
  }, [adminJobs, searchAdminJobs]);

  return (
    <>
      <AnimatePresence>
        {popup && (
          <DeleteJobConfirmation
            popup={popup}
            setPopup={setPopup}
            jobId={jobId}
            setJobId={setJobId}
          />
        )}
      </AnimatePresence>
      {!isFetchingAdminJobs && adminJobs?.length === 0 && (
        <div className="flex flex-col space-y-5 text-center text-gray-100 m-auto justify-center mt-32">
          <span className="font- text-lg font-semibold">
            You haven&#39;t posted any jobs yet.
          </span>
          <span>
            <button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-white text-gray-950 font-semibold px-5 py-1 rounded-3xl"
            >
              Post a Job Here
            </button>
          </span>
        </div>
      )}
      {isFetchingAdminJobs ? (
        <>
          <TableDataLoader />
        </>
      ) : (
        <>
          {!isFetchingAdminJobs && adminJobs?.length > 0 && (
            <Table>
              <TableCaption>A list of your recent posted jobs</TableCaption>
              <TableHeader>
                <TableRow className=" hover:bg-black ">
                  <TableHead className="text-gray-100">Company Name</TableHead>
                  <TableHead className="text-gray-100">Role</TableHead>
                  <TableHead className="text-gray-100">Date</TableHead>
                  <TableHead className="text-right text-white">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white font-semibold tracking-wider ">
                {filterJob &&
                  filterJob?.map((job) => (
                    <motion.tr
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      exit={{ x: -100 }}
                      transition={{ duration: 0.5 }}
                      key={job?._id}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {" "}
                          <Avatar>
                            <AvatarImage
                              className="w-10 h-10 rounded-full"
                              src={job?.company?.logo || noLogoDefault}
                            />
                          </Avatar>
                          <span>{job?.company?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{job?.title}</TableCell>
                      <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="float-right cursor-pointer">
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>

                          <PopoverContent className="w-32 h-auto space-y-2 flex flex-col items-center z-10 justify-center m-auto bg-stone-800 border-0 text-white">
                            <div
                              onClick={() => {
                                dispatch(setJobEditData(job));
                                navigate(`/admin/jobs/${job?._id}/edit`);
                              }}
                              className="flex w-full text-green-500 font-semibold items-center justify-start space-x-1 gap-1 cursor-pointer"
                            >
                              <FaPen size={14} />
                              <span className="text-sm">Edit</span>
                            </div>
                            <div
                              onClick={() => {
                                navigate(`/admin/jobs/${job?._id}/applicants`);
                              }}
                              className="flex w-full items-center text-sky-500 font-semibold justify-start space-x-1 gap-1 cursor-pointer"
                            >
                              <FaEye size={14} />
                              <span className="text-sm">Applicants</span>
                            </div>
                            <div
                              onClick={() => {
                                setPopup(true);
                                setJobId(job?._id);
                              }}
                              className="flex w-full text-rose-500 font-semibold items-center justify-start space-x-1 gap-1 cursor-pointer"
                            >
                              <MdDelete size={14} />
                              <span className="text-sm">Delete </span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </motion.tr>
                  ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};
export default JobTable;
