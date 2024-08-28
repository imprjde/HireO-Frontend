// /* eslint-disable react/prop-types */
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { FaCheckCircle } from "react-icons/fa";
// import { setSaveJobLocally } from "@/redux/jobSlice";
// import { useState } from "react";
// import ApplyJobLoader from "./loaders/ApplyJobLoader";

// const Job = ({ job }) => {
//   const { savedJobs } = useSelector((store) => store.job);
//   const { authUser } = useSelector((store) => store.auth);
//   const [isLoading, setIsLoading] = useState(false);

//   // const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentDate = new Date();
//     const timeDifference = currentDate - createdAt;
//     return Math.floor(timeDifference / (1000 * 24 * 3600));
//   };

//   const saveJob = async (jobId) => {
//     if (!authUser?._id) {
//       return toast.error("Please Login First");
//     }
//     dispatch(setSaveJobLocally(job));
//     if (savedJobs.some((savedJob) => savedJob?._id === job?._id)) {
//       toast("This job has already been saved.");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       await axios.post(
//         `http://localhost:8000/api/v1/saved/saveJob?jobId=${jobId}&created_by=${authUser?._id}`
//       );
//       setIsLoading(false);
//       toast.success("Job Saved Successfully");
//     } catch (error) {
//       setIsLoading(false);
//       toast.error("Failed to save this job");
//       console.log(error);
//     }
//   };

//   const hasApplied = (jobId) => {
//     return savedJobs?.some((savedJob) => savedJob?.jobId?._id == jobId);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <ApplyJobLoader />
//       ) : (
//         <div className="px-5 py-3 rounded-md text-white bg-black md:shadow-md md:shadow-stone-500 border border-gray-700">
//           <div className=" w-full">
//             <p className="text-xs text-left text-gray-100">
//               {daysAgoFunction(job?.createdAt) === 0
//                 ? "Today"
//                 : `${daysAgoFunction(job?.createdAt)} days ago`}
//             </p>
//           </div>
//           <div className="flex items-center gap-2 my-2">
//             <Button size="icon" variant="outline" className="p-6">
//               <Avatar>
//                 <AvatarImage src={job?.company?.logo} />
//               </Avatar>
//             </Button>
//             <div>
//               <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//               <p className="text-sm text-gray-100">{job?.location}, India</p>
//             </div>
//           </div>
//           <div>
//             <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//             <p className="text-sm text-gray-200 hidden md:block  truncate">
//               {job?.description}
//             </p>
//             <p className="text-sm text-gray-200 md:hidden w-full">
//               {job?.description.slice(0, 45) + "..."}
//             </p>
//           </div>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge
//               className="text-fuchsia-500 border border-fuchsia-400 font-bold"
//               variant={"ghost"}
//             >
//               {job?.position} positons
//             </Badge>
//             <Badge
//               className="text-sky-500 border border-sky-400 font-bold"
//               variant={"ghost"}
//             >
//               {job?.jobType}
//             </Badge>
//             <Badge
//               className="text-purple-500 border border-purple-400 font-bold"
//               variant={"ghost"}
//             >
//               {job?.salary}LPA
//             </Badge>
//           </div>
//           <div className="flex items-center justify-end text-black gap-4 mt-4">
//             <button
//               onClick={() => navigate(`/description/${job?._id}`)}
//               className="bg-white text-black px-4 rounded-md font-semibold py-1"
//             >
//               Details
//             </button>

//             {hasApplied(job?._id) ? (
//               <button
//                 disabled
//                 className="bg-gray-600 cursor-not-allowed text-white flex items-center space-x-1 tracking-wide font-semibold text-sm px-4 py-1.5 rounded-md"
//               >
//                 <span>Saved</span>
//                 <span className="text-green-500">
//                   <FaCheckCircle size={16} />
//                 </span>
//               </button>
//             ) : (
//               <button
//                 onClick={() => saveJob(job?._id)}
//                 className="bg-[#7209b7] text-white tracking-wide font-semibold text-sm px-4 py-1.5 rounded-md hover:bg-[#6207b0]"
//               >
//                 Save Job
//               </button>
//             )}
//           </div>
//           <div>{/* <ApplyJobDialog open={open} setOpen={setOpen} /> */}</div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Job;

/////////////////////////  JERK FIX ////////////////////////////////////////////////////////////////////

/* eslint-disable react/prop-types */
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import { setSaveJobLocally } from "@/redux/jobSlice";
import { useState } from "react";
import ApplyJobLoader from "./loaders/ApplyJobLoader";

const Job = ({ job }) => {
  const { savedJobs } = useSelector((store) => store.job);
  const { authUser } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);

  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 3600));
  };

  const saveJob = async (jobId) => {
    if (!authUser?._id) {
      return toast.error("Please Login First");
    }
    dispatch(setSaveJobLocally(job));
    if (savedJobs.some((savedJob) => savedJob?._id === job?._id)) {
      toast("This job has already been saved.");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post(
        // `http://localhost:8000/api/v1/saved/saveJob?jobId=${jobId}&created_by=${authUser?._id}`
        `${
          import.meta.env.VITE_BASE_URL
        }/saved/saveJob?jobId=${jobId}&created_by=${authUser?._id}`
      );
      setIsLoading(false);
      toast.success("Job Saved Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to save this job");
      console.log(error);
    }
  };

  const hasApplied = (jobId) => {
    return savedJobs?.some((savedJob) => savedJob?.jobId?._id == jobId);
  };

  return (
    <>
      {isLoading ? (
        <ApplyJobLoader />
      ) : (
        <div className="px-5 py-3 rounded-md text-white bg-black md:shadow-md md:shadow-stone-500 border border-gray-700">
          <div className=" w-full">
            <p className="text-xs text-left text-gray-100">
              {daysAgoFunction(job?.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job?.createdAt)} days ago`}
            </p>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Button size="icon" variant="outline" className="p-6">
              <Avatar>
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
            </Button>
            <div>
              <h1 className="font-medium text-lg">{job?.company?.name}</h1>
              <p className="text-sm text-gray-100">{job?.location}, India</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-200 hidden md:block  truncate">
              {job?.description}
            </p>
            <p className="text-sm text-gray-200 md:hidden w-full">
              {job?.description.slice(0, 45) + "..."}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge
              className="text-fuchsia-500 border border-fuchsia-400 font-bold"
              variant={"ghost"}
            >
              {job?.position} positons
            </Badge>
            <Badge
              className="text-sky-500 border border-sky-400 font-bold"
              variant={"ghost"}
            >
              {job?.jobType}
              {/* {job?.experienceLevel} */}
            </Badge>
            <Badge
              className="text-purple-500 border border-purple-400 font-bold"
              variant={"ghost"}
            >
              {job?.salary}LPA
            </Badge>
          </div>
          <div className="flex items-center justify-end text-black gap-4 mt-4">
            <button
              onClick={() => navigate(`/description/${job?._id}`)}
              className="bg-white text-black px-4 rounded-md font-semibold py-1"
            >
              Details
            </button>

            {hasApplied(job?._id) ? (
              <button
                disabled
                className="bg-gray-600 cursor-not-allowed text-white flex items-center space-x-1 tracking-wide font-semibold text-sm px-4 py-1.5 rounded-md"
              >
                <span>Saved</span>
                <span className="text-green-500">
                  <FaCheckCircle size={16} />
                </span>
              </button>
            ) : (
              <button
                onClick={() => saveJob(job?._id)}
                className="bg-[#7209b7] text-white tracking-wide font-semibold text-sm px-4 py-1.5 rounded-md hover:bg-[#6207b0]"
              >
                Save Job
              </button>
            )}
          </div>
          <div>{/* <ApplyJobDialog open={open} setOpen={setOpen} /> */}</div>
        </div>
      )}
    </>
  );
};

export default Job;
