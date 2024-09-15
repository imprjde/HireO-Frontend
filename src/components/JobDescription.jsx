// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { setSaveJobLocally, setSingleJobById } from "@/redux/jobSlice";
// import { useParams } from "react-router-dom";
// import { HiInformationCircle } from "react-icons/hi";
// import { FaShareSquare } from "react-icons/fa";
// import JobInfoLoader from "./loaders/JobInfoLoader";
// import CompanyInfoModal from "./CompanyInfoModal";
// import { FaCheckCircle } from "react-icons/fa";
// import ApplyJobLoader from "./loaders/ApplyJobLoader";
// import ShareJobModal from "./ShareJobModal";
// import { AnimatePresence } from "framer-motion";

// const JobDescription = () => {
//   const { singleJobById } = useSelector((store) => store.job);
//   const { savedJobs } = useSelector((store) => store.job);
//   const { authUser } = useSelector((store) => store.auth);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [link, setLink] = useState(null);

//   const isInitiallyApplied =
//     singleJobById?.applications?.some(
//       (application) => application.applicant === authUser?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);
//   const [isSaved, setIsSaved] = useState(false);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     return () => {
//       setIsApplied(false);
//       dispatch(setSingleJobById([]));
//     };
//   }, [dispatch]);

//   const applyJobHandler = async () => {
//     if (!authUser) {
//       toast.error("Please Login to Apply");
//     } else {
//       setIsApplying(true);
//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/application/apply/${params.id}`,
//           {
//             fullname: authUser?.fullname,
//             created_By: singleJobById?.created_by,
//             jobId: singleJobById?._id,
//             companyId: singleJobById?.company?._id,
//           },
//           { withCredentials: true }
//         );
//         if (res.data.success) {
//           setIsApplied(true);
//           setIsApplying(false);
//           const updatedJob = {
//             ...singleJobById,
//             applications: [
//               ...singleJobById.applications,
//               { applicant: authUser._id },
//             ],
//           };
//           dispatch(setSingleJobById(updatedJob));
//           toast.success(res.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.response.data.message);
//         setIsApplying(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         setIsLoading(true);
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/job/getjob/${params.id}`
//         );
//         if (res.data.success) {
//           dispatch(setSingleJobById(res.data.job));
//           setIsLoading(false);
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === authUser?._id
//             )
//           );
//         }
//       } catch (error) {
//         setIsLoading(false);
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [params.id, dispatch, authUser?._id]);

//   const formatDate = (date) => {
//     const [year, month, day] = date.split("-");
//     const formattedDate = `${day}-${month}-${year}`;
//     return formattedDate;
//   };

//   const saveJob = async () => {
//     if (!authUser?._id) {
//       toast.error("Please Login First");
//       return;
//     }

//     if (isAlreadySaved()) {
//       toast("This job has already been saved.");
//       return;
//     }
//     setIsApplying(true);
//     try {
//       dispatch(setSaveJobLocally(singleJobById));

//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/saved/saveJob?jobId=${
//           singleJobById?._id
//         }&created_by=${authUser?._id}`
//       );

//       setIsSaved(true);
//       toast.success("Job Saved Successfully");
//     } catch (error) {
//       console.error("Error saving job:", error);
//       setIsSaved(false);
//       toast.error("Failed to save this job");
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const isAlreadySaved = () => {
//     return savedJobs?.some((job) => job?.jobId?._id === singleJobById?._id);
//   };

//   useEffect(() => {
//     setIsSaved(isAlreadySaved());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [savedJobs, singleJobById?._id]);

//   const handleShare = () => {
//     setShowShareModal(true);
//     setLink(window?.location?.href);
//   };

//   const randomApplicantNumber = () => {
//     return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {showShareModal && (
//           <ShareJobModal
//             link={link}
//             setLink={setLink}
//             setShowShareModal={setShowShareModal}
//           />
//         )}
//       </AnimatePresence>
//       {isApplying && <ApplyJobLoader />}
//       <AnimatePresence>
//         {showModal && (
//           <CompanyInfoModal
//             companyInfo={singleJobById?.company}
//             showModal={showModal}
//             setShowModal={setShowModal}
//           />
//         )}
//       </AnimatePresence>

//       {isLoading ? (
//         <JobInfoLoader />
//       ) : (
//         <>
//           <div
//             className="relative pb-20 flex size-full min-h-screen h-auto flex-col bg-black dark justify-between group/design-root overflow-x-hidden"
//             style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
//           >
//             <div>
//               <div className="flex m-aut items-center bg-black  p-4 pb-2 justify-between">
//                 <h2 className="text-[#FFFFFF]  text-lg font-bold leading-tight text-left ">
//                   {singleJobById?.title} at{" "}
//                   {singleJobById?.company?.name.charAt(0).toUpperCase() +
//                     singleJobById?.company?.name.slice(1)}
//                 </h2>
//                 <div className="flex w-12 items-center justify-end">
//                   <button
//                     onClick={handleShare}
//                     className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-transparent text-[#FFFFFF] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
//                   >
//                     <FaShareSquare size={18} />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex border-[3px]  border-x-0 border-t-0 border-b-[#303030]  w-full p-4 0 m-auto justify-center @container">
//                 <div className="flex w-full m-auto justify-center flex-col gap-4">
//                   <div className="flex gap-4 flex-col  w-full m-auto justify-center  text-center">
//                     <img
//                       className="bg-center bg-no-repeat m-auto aspect-square bg-cover rounded-full min-h-32 w-32"
//                       src={singleJobById?.company?.logo}
//                       alt={singleJobById?.company?.name}
//                     />

//                     <div className="flex flex-col justify-center text-center w-fit m-auto">
//                       <p className="text-[#FFFFFF] text-[22px] font-bold leading-tight tracking-[-0.015em]">
//                         {singleJobById?.company?.name.charAt(0).toUpperCase() +
//                           singleJobById?.company?.name.slice(1)}
//                       </p>
//                       <p className="text-[#ABABAB] text-base font-normal leading-normal">
//                         {singleJobById?.company?.genre}
//                       </p>
//                       <p className="text-[#ABABAB] text-base font-normal leading-normal">
//                         {singleJobById?.company?.totalEmployees} Employees
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="text-white mb-2 flex bg-[#292929]  rounded-3xl w-fit m-auto items-center space-x-2 h-10 px-20"
//                   >
//                     <span>View Company Info</span>
//                     <span>
//                       <HiInformationCircle />
//                     </span>
//                   </button>
//                 </div>
//               </div>
//               <h2 className="text-[#FFFFFF]  text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
//                 Job Info
//               </h2>
//               <div className="py-4 px-4 md:px-10 grid md:grid-cols-[20%_1fr] gap-x-6 bg-pink 400">
//                 <div className="col-span-2 grid grid-cols-subgrid border-t- border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Title
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.title}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Posted On
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.createdAt &&
//                       formatDate(singleJobById?.createdAt?.split("T")[0])}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Description
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.description}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Experience Level
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.experienceLevel
//                       ?.toLowerCase()
//                       .includes("years")
//                       ? singleJobById?.experienceLevel
//                       : singleJobById?.experienceLevel + " Years"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Job Type
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.jobType}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Location
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.location?.toLowerCase()?.includes("india")
//                       ? singleJobById?.location
//                       : singleJobById?.location + ", India"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Open Positions
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.position}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Salary
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.salary} LPA
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Total Applicants
//                   </p>
//                   <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
//                     {singleJobById?.applications?.length < 10
//                       ? randomApplicantNumber()
//                       : singleJobById?.applications?.length}
//                   </p>
//                 </div>
//                 <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
//                   <p className="text-[#ABABAB] text-sm font-normal leading-normal">
//                     Skills Required
//                   </p>
//                   <p className="text-white b text-sm  font-normal  leading-normal">
//                     {singleJobById?.requirements?.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="bg-gray-800 text-center w-auto mx-[1px] md:mx-2 my-1 inline-grid px-2 rounded-xl"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex px-4 py-3 space-x-2 md:justify-end">
//                 {isAlreadySaved() || isSaved ? (
//                   <button className="bg-gray-600 cursor-not-allowed flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 md:px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]">
//                     <span className="flex  items-center space-x-2">
//                       <span> Saved</span>
//                       <span className="text-green-500">
//                         <FaCheckCircle />
//                       </span>
//                     </span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={saveJob}
//                     className="bg-[#09b757] cursor-pointer flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 md:px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
//                   >
//                     Save For Later
//                   </button>
//                 )}

//                 {!isLoading && (
//                   <button
//                     disabled={isLoading || isApplied}
//                     onClick={applyJobHandler}
//                     className={`${
//                       isApplied
//                         ? "bg-gray-600 cursor-not-allowed"
//                         : "bg-[#7209b7] cursor-pointer"
//                     } flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]`}
//                   >
//                     {!isApplied ? (
//                       <span className="truncate">Apply Job</span>
//                     ) : (
//                       <span className="flex  items-center space-x-2">
//                         <span>Already Applied</span>
//                         <span className="text-green-500">
//                           <FaCheckCircle />
//                         </span>
//                       </span>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       {/* <BottomNav /> */}
//     </>
//   );
// };

// export default JobDescription;

///////////////////////////////// NAVIGATOR SHARE //////////////////////////////////////////
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setSaveJobLocally, setSingleJobById } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { FaShareSquare } from "react-icons/fa";
import JobInfoLoader from "./loaders/JobInfoLoader";
import CompanyInfoModal from "./CompanyInfoModal";
import { FaCheckCircle } from "react-icons/fa";
import ApplyJobLoader from "./loaders/ApplyJobLoader";
import { AnimatePresence } from "framer-motion";

const JobDescription = () => {
  const { singleJobById } = useSelector((store) => store.job);
  const { savedJobs } = useSelector((store) => store.job);
  const { authUser } = useSelector((store) => store.auth);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const isInitiallyApplied =
    singleJobById?.applications?.some(
      (application) => application.applicant === authUser?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    return () => {
      setIsApplied(false);
      dispatch(setSingleJobById([]));
    };
  }, [dispatch]);

  const applyJobHandler = async () => {
    if (!authUser) {
      toast.error("Please Login to Apply");
    } else {
      setIsApplying(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/application/apply/${params.id}`,
          {
            fullname: authUser?.fullname,
            created_By: singleJobById?.created_by,
            jobId: singleJobById?._id,
            companyId: singleJobById?.company?._id,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          setIsApplied(true);
          setIsApplying(false);
          const updatedJob = {
            ...singleJobById,
            applications: [
              ...singleJobById.applications,
              { applicant: authUser._id },
            ],
          };
          dispatch(setSingleJobById(updatedJob));
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setIsApplying(false);
      }
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/job/getjob/${params.id}`
        );
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsLoading(false);
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === authUser?._id
            )
          );
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const saveJob = async () => {
    if (!authUser?._id) {
      toast.error("Please Login First");
      return;
    }

    if (isAlreadySaved()) {
      toast("This job has already been saved.");
      return;
    }
    setIsApplying(true);
    try {
      dispatch(setSaveJobLocally(singleJobById));

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/saved/saveJob?jobId=${
          singleJobById?._id
        }&created_by=${authUser?._id}`
      );

      setIsSaved(true);
      toast.success("Job Saved Successfully");
    } catch (error) {
      console.error("Error saving job:", error);
      setIsSaved(false);
      toast.error("Failed to save this job");
    } finally {
      setIsApplying(false);
    }
  };

  const isAlreadySaved = () => {
    return savedJobs?.some((job) => job?.jobId?._id === singleJobById?._id);
  };

  useEffect(() => {
    setIsSaved(isAlreadySaved());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJobs, singleJobById?._id]);

  const randomApplicantNumber = () => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  };

  const handleNavigatorShare = async () => {
    const shareDetails = {
      title: "Check out this New Job Posting on HierO !",
      text: "Check out this New Job Posting on HierO !",
      url: window?.location?.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
      } catch (error) {
        return;
      }
    } else {
      console.log("Share feature unavailable for your browser.");
    }
  };
  return (
    <>
      <Helmet>
        <title>{singleJobById?.title || "Job Description"}</title>
        <meta
          name="description"
          content={`Find out more about the job titled "${
            singleJobById?.title || ""
          }" at HierO.`}
        />
        <meta
          property="og:title"
          content={singleJobById?.title || "HierO Job Posting"}
        />
        <meta
          property="og:description"
          content={`Find out more about the job titled "${
            singleJobById?.title || ""
          }" at HierO.`}
        />
        <meta
          property="og:image"
          content={singleJobById?.company?.logo || "default-image-url.jpg"}
        />
        <meta property="og:url" content={window?.location?.href} />
        <meta property="og:type" content="website" />
      </Helmet>
      {isApplying && <ApplyJobLoader />}
      <AnimatePresence>
        {showModal && (
          <CompanyInfoModal
            companyInfo={singleJobById?.company}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <JobInfoLoader />
      ) : (
        <>
          <div
            className="relative pb-20 flex size-full min-h-screen h-auto flex-col bg-black dark justify-between group/design-root overflow-x-hidden"
            style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
          >
            <div>
              <div className="flex m-aut items-center bg-black  p-4 pb-2 justify-between">
                <h2 className="text-[#FFFFFF]  text-lg font-bold leading-tight text-left ">
                  {singleJobById?.title} at{" "}
                  {singleJobById?.company?.name.charAt(0).toUpperCase() +
                    singleJobById?.company?.name.slice(1)}
                </h2>
                <div className="flex w-12 items-center justify-end">
                  <button
                    onClick={handleNavigatorShare}
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-transparent text-[#FFFFFF] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
                  >
                    <FaShareSquare size={18} />
                  </button>
                </div>
              </div>
              <div className="flex border-[3px]  border-x-0 border-t-0 border-b-[#303030]  w-full p-4 0 m-auto justify-center @container">
                <div className="flex w-full m-auto justify-center flex-col gap-4">
                  <div className="flex gap-4 flex-col  w-full m-auto justify-center  text-center">
                    <img
                      className="bg-center bg-no-repeat m-auto aspect-square bg-cover rounded-full min-h-32 w-32"
                      src={singleJobById?.company?.logo}
                      alt={singleJobById?.company?.name}
                    />

                    <div className="flex flex-col justify-center text-center w-fit m-auto">
                      <p className="text-[#FFFFFF] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                        {singleJobById?.company?.name.charAt(0).toUpperCase() +
                          singleJobById?.company?.name.slice(1)}
                      </p>
                      <p className="text-[#ABABAB] text-base font-normal leading-normal">
                        {singleJobById?.company?.genre}
                      </p>
                      <p className="text-[#ABABAB] text-base font-normal leading-normal">
                        {singleJobById?.company?.totalEmployees} Employees
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white mb-2 flex bg-[#292929]  rounded-3xl w-fit m-auto items-center space-x-2 h-10 px-20"
                  >
                    <span>View Company Info</span>
                    <span>
                      <HiInformationCircle />
                    </span>
                  </button>
                </div>
              </div>
              <h2 className="text-[#FFFFFF]  text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Job Info
              </h2>
              <div className="py-4 px-4 md:px-10 grid md:grid-cols-[20%_1fr] gap-x-6 bg-pink 400">
                <div className="col-span-2 grid grid-cols-subgrid border-t- border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Title
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.title}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Posted On
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.createdAt &&
                      formatDate(singleJobById?.createdAt?.split("T")[0])}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Description
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.description}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Experience Level
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.experienceLevel
                      ?.toLowerCase()
                      .includes("years")
                      ? singleJobById?.experienceLevel
                      : singleJobById?.experienceLevel + " Years"}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Job Type
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.jobType}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Location
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.location?.toLowerCase()?.includes("india")
                      ? singleJobById?.location
                      : singleJobById?.location + ", India"}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Open Positions
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.position}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Salary
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.salary} LPA
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Total Applicants
                  </p>
                  <p className="text-[#FFFFFF] text-sm font-normal leading-normal">
                    {singleJobById?.applications?.length < 10
                      ? randomApplicantNumber()
                      : singleJobById?.applications?.length}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-5">
                  <p className="text-[#ABABAB] text-sm font-normal leading-normal">
                    Skills Required
                  </p>
                  <p className="text-white b text-sm  font-normal  leading-normal">
                    {singleJobById?.requirements?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-800 text-center w-auto mx-[1px] md:mx-2 my-1 inline-grid px-2 rounded-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex px-4 py-3 space-x-2 md:justify-end">
                {isAlreadySaved() || isSaved ? (
                  <button className="bg-gray-600 cursor-not-allowed flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 md:px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]">
                    <span className="flex  items-center space-x-2">
                      <span> Saved</span>
                      <span className="text-green-500">
                        <FaCheckCircle />
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={saveJob}
                    className="bg-[#09b757] cursor-pointer flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 md:px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
                  >
                    Save For Later
                  </button>
                )}

                {!isLoading && (
                  <button
                    disabled={isLoading || isApplied}
                    onClick={applyJobHandler}
                    className={`${
                      isApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#7209b7] cursor-pointer"
                    } flex min-w-[84px] w-full  md:max-w-[300px]  items-center justify-center overflow-hidden rounded-md h-10 md:h-12 px-5 mx-1 md:mx-0 flex-1 text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]`}
                  >
                    {!isApplied ? (
                      <span className="truncate">Apply Job</span>
                    ) : (
                      <span className="flex  items-center space-x-2">
                        <span>Already Applied</span>
                        <span className="text-green-500">
                          <FaCheckCircle />
                        </span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobDescription;
