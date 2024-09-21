/* eslint-disable react/prop-types */
import { BsBookmarkXFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { HiOfficeBuilding } from "react-icons/hi";
import { HiBriefcase } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SavedJobCard({ job, setIsRemoving }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (Id) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/saved/removeSaved?Id=${Id}`
      );
    },
    onMutate: () => {
      setIsRemoving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]);
      toast.success("Job removed from your saved");
    },
    onError: (error) => {
      toast.error("Failed To Remove This Job");
      console.log(error);
    },
    onSettled: () => {
      setIsRemoving(false);
    },
  });

  const removeSavedJob = (Id) => {
    mutation.mutate(Id);
  };

  return (
    <div>
      <div
        id="card"
        className="bg-black shadow-sm md:shadow-md md:shadow-gray-100 border border-b-0 border-gray-700 shadow-gray-100 space-y-4 mx-4 p-4 rounded-md"
      >
        <div className="flex  items-center w-full  m-auto justify-between">
          <div className="flex flex-col space-y-1  w-[70%]">
            <span className="flex items-center space-x-1">
              <p>
                <HiBriefcase />
              </p>
              <p className="font-bold truncate">{job?.jobId?.title}</p>
            </span>
            <span className="flex items-center space-x-1">
              <p>
                <HiOfficeBuilding />
              </p>
              <p className="font-semibold truncate">
                {job?.jobId?.company?.name}
              </p>
            </span>
            <span className="flex items-center space-x-1">
              <p>
                <CiLocationOn />
              </p>

              <p className="font-medium text-sm text-gray-200 truncate">
                {job?.jobId?.location?.toLowerCase()?.includes("india")
                  ? job?.jobId?.location
                  : job?.jobId?.location + ", India"}
              </p>
            </span>
          </div>
          <div className="bg-rd-500 mb-7 justify-end ">
            <img
              src={job?.jobId?.company?.logo}
              className="w-12 rounded-full"
              alt="logo"
            />
          </div>
        </div>
        <div id="button" className=" flex w-full justify-end space-x-4">
          <Link
            to={`/description/${job?.jobId?._id}`}
            className=" text-sm text-sky-100 font-semibold"
          >
            <FaEye size={20} />
          </Link>
          <button
            onClick={() => removeSavedJob(job?._id)}
            className="text-rose-300"
          >
            <BsBookmarkXFill size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
