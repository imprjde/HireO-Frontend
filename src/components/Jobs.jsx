// import { useEffect, useState } from "react";
// import Job from "./Job";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Jobnotfound from "./Jobnotfound";
// import { AnimatePresence } from "framer-motion";
// import MobileFilterCard from "./MobileFilterCard";
// import DesktopAppliedFilters from "./DesktopAppliedFilters";
// import Navbar from "./shared/Navbar";
// import FilterCard from "./FilterCard";
// import FilterLoader from "./loaders/FilterLoader";
// import MobileAppliedFilters from "./MobileAppliedFilters";
// import BottomNav from "./shared/BottomNav";

// // let jobs = [
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// //   {
// //     _id: "66a68996f988fb1582dc8766",
// //     title: "Graphic Designer",
// //     description:
// //       "Join our team as a Graphic Designer to create stunning visuals.",
// //     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
// //     salary: 9,
// //     location: "Bangalore",
// //     jobType: "Full time",
// //     experienceLevel: "2-4",
// //     position: 56,
// //     company: {
// //       _id: "669f6c54fb5b5b019404699b",
// //       name: "Google  INC.",
// //       userId: "669f5eb2bbfa1e43171507c1",
// //       createdAt: "2024-07-23T08:39:48.421Z",
// //       updatedAt: "2024-08-10T09:10:00.930Z",
// //       __v: 0,
// //       description:
// //         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
// //       location: "Bangalore, India. ",
// //       website: "https://google.in/careers",
// //       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
// //       genre:
// //         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
// //       totalEmployees: 180000,
// //     },
// //     created_by: "669f5eb2bbfa1e43171507c1",
// //     applications: ["66c0c453f97aceb957553377"],
// //     createdAt: "2024-07-28T18:10:30.752Z",
// //     updatedAt: "2024-08-17T15:40:03.635Z",
// //     __v: 1,
// //   },
// // ];

// const Jobs = () => {
//   const [filterObject, setFilterObject] = useState({
//     location: [],
//     industry: [],
//     salary: "",
//   });
//   const [jobs, setJobs] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [viewFilters, SetViewFilters] = useState(false);
//   const [viewFiltersTwo, setViewFiltersTwo] = useState(false);

//   const { authUser } = useSelector((store) => store.auth);

//   console.log("CHIN TAPAK DUM DUM=", jobs);
//   const navigate = useNavigate();
//   // const setJobs = () => {};

//   useEffect(() => {
//     if (authUser?.role === "recruiter") {
//       navigate("/admin/jobs");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authUser?.role]);

//   return (
//     <div className="min-h-screen relative ">
//       <Navbar />
//       <AnimatePresence>
//         {viewFilters && (
//           <DesktopAppliedFilters
//             filterObject={filterObject}
//             SetViewFilters={SetViewFilters}
//           />
//         )}
//       </AnimatePresence>
//       <div className="max-w-7xl relative mx-auto">
//         <div className="flex gap-5">
//           <AnimatePresence>
//             {!showFilter && (
//               <motion.div
//                 onClick={() => setShowFilter(true)}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
//                 className="fixed bottom-[72px] md:hidden right-4 z-40"
//               >
//                 <button className="flex border-[1.5px]   border-gray-600 space-x-1 items-center bg-gradient-to-r from-purple-700 to-gray-900 hover:from-gray-900 hover:to-purple-700 text-white font-semibold text-sm py-1.5 px-4 rounded-full ">
//                   <span>Filters</span>
//                   <span>
//                     {" "}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20px"
//                       height="20px"
//                       fill="currentColor"
//                       viewBox="0 0 256 256"
//                     >
//                       <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
//                     </svg>
//                   </span>
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="hidden md:flex min-w-[20%] pt-7">
//             <FilterCard
//               jobs={jobs}
//               setJobs={setJobs}
//               isLoading={isLoading}
//               setIsLoading={setIsLoading}
//               filterObject={filterObject}
//               setFilterObject={setFilterObject}
//               SetViewFilters={SetViewFilters}
//             />
//           </div>

//           {/* {Side nav bar here } */}
//           <AnimatePresence>
//             {" "}
//             {showFilter && (
//               <MobileFilterCard
//                 setShowFilter={setShowFilter}
//                 filterObject={filterObject}
//                 setFilterObject={setFilterObject}
//                 setViewFiltersTwo={setViewFiltersTwo}
//                 jobs={jobs}
//               />
//             )}
//           </AnimatePresence>

//           {isLoading && <FilterLoader />}

//           {!isLoading && jobs?.length === 0 ? (
//             <Jobnotfound />
//           ) : (
//             <div className="flex-1 mt-12 mb-16 md:mt-0 h-[88vh] overflow-y-auto overflow-x-hidden no-scrollbar pb-5">
//               <div className="mx-3 grid md:grid-cols-3 gap-4">
//                 {!isLoading &&
//                   jobs &&
//                   jobs.map((job, index) => (
//                     <motion.div
//                       key={job._id}
//                       initial={{ opacity: 0, x: 100 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -100 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <Job job={job} index={index} />
//                     </motion.div>
//                   ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <BottomNav />
//       <AnimatePresence className="z-50">
//         {viewFiltersTwo && (
//           <MobileAppliedFilters
//             setViewFiltersTwo={setViewFiltersTwo}
//             filterObject={filterObject}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Jobs;

///////////////////////// FILTER BY EXPERIENCE FEATURE //////////////////////////////////

import { useEffect, useState } from "react";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Jobnotfound from "./Jobnotfound";
import { AnimatePresence } from "framer-motion";
import MobileFilterCard from "./MobileFilterCard";
import DesktopAppliedFilters from "./DesktopAppliedFilters";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import FilterLoader from "./loaders/FilterLoader";
import MobileAppliedFilters from "./MobileAppliedFilters";
import BottomNav from "./shared/BottomNav";

// let jobs = [
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
//   {
//     _id: "66a68996f988fb1582dc8766",
//     title: "Graphic Designer",
//     description:
//       "Join our team as a Graphic Designer to create stunning visuals.",
//     requirements: ["Photoshop", " Illustrator", " InDesign", " Sketch"],
//     salary: 9,
//     location: "Bangalore",
//     jobType: "Full time",
//     experienceLevel: "2-4",
//     position: 56,
//     company: {
//       _id: "669f6c54fb5b5b019404699b",
//       name: "Google  INC.",
//       userId: "669f5eb2bbfa1e43171507c1",
//       createdAt: "2024-07-23T08:39:48.421Z",
//       updatedAt: "2024-08-10T09:10:00.930Z",
//       __v: 0,
//       description:
//         "Google LLC is an American multinational technology company that specializes in internet-related services and products",
//       location: "Bangalore, India. ",
//       website: "https://google.in/careers",
//       logo: "https://res.cloudinary.com/imprjde/image/upload/v1723281000/bxfvpyoj81msbuky8lm6.jpg",
//       genre:
//         "Online advertising, Search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence (AI)",
//       totalEmployees: 180000,
//     },
//     created_by: "669f5eb2bbfa1e43171507c1",
//     applications: ["66c0c453f97aceb957553377"],
//     createdAt: "2024-07-28T18:10:30.752Z",
//     updatedAt: "2024-08-17T15:40:03.635Z",
//     __v: 1,
//   },
// ];

const Jobs = () => {
  const [filterObject, setFilterObject] = useState({
    location: [],
    industry: [],
    experience: [],
    salary: "",
  });
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [viewFilters, SetViewFilters] = useState(false);
  const [viewFiltersTwo, setViewFiltersTwo] = useState(false);

  const { authUser } = useSelector((store) => store.auth);

  // console.log("CHIN TAPAK DUM DUM=", jobs);
  const navigate = useNavigate();
  // const setJobs = () => {};

  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/jobs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.role]);

  return (
    <div className="min-h-screen relative ">
      <Navbar />
      <AnimatePresence>
        {viewFilters && (
          <DesktopAppliedFilters
            filterObject={filterObject}
            SetViewFilters={SetViewFilters}
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl relative mx-auto">
        <div className="flex gap-5">
          <AnimatePresence>
            {!showFilter && (
              <motion.div
                onClick={() => setShowFilter(true)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="fixed bottom-[72px] md:hidden right-4 z-40"
              >
                <button className="flex border-[1.5px]   border-gray-600 space-x-1 items-center bg-gradient-to-r from-purple-700 to-gray-900 hover:from-gray-900 hover:to-purple-700 text-white font-semibold text-sm py-1.5 px-4 rounded-full ">
                  <span>Filters</span>
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
                    </svg>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex min-w-[20%] pt-7">
            <FilterCard
              jobs={jobs}
              setJobs={setJobs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              filterObject={filterObject}
              setFilterObject={setFilterObject}
              SetViewFilters={SetViewFilters}
            />
          </div>

          {/* {Side nav bar here } */}
          <AnimatePresence>
            {" "}
            {showFilter && (
              <MobileFilterCard
                setShowFilter={setShowFilter}
                filterObject={filterObject}
                setFilterObject={setFilterObject}
                setViewFiltersTwo={setViewFiltersTwo}
                jobs={jobs}
              />
            )}
          </AnimatePresence>

          {isLoading && <FilterLoader />}

          {!isLoading && jobs?.length === 0 ? (
            <Jobnotfound />
          ) : (
            <div className="flex-1 mt-12 mb-16 md:mt-0 h-[88vh] overflow-y-auto overflow-x-hidden no-scrollbar pb-5">
              <div className="mx-3 grid md:grid-cols-3 gap-4">
                {!isLoading &&
                  jobs &&
                  jobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} index={index} />
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      <AnimatePresence className="z-50">
        {viewFiltersTwo && (
          <MobileAppliedFilters
            setViewFiltersTwo={setViewFiltersTwo}
            filterObject={filterObject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;
