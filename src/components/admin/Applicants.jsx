// import axios from "axios";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import ApplicantsTable from "./ApplicantsTable";
// import {
//   setAllApplicants,
//   setIsFetchingApplicants,
// } from "@/redux/applicationSlice";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";

// const Applicants = () => {
//   const params = useParams();
//   const id = params.id;
//   const dispatch = useDispatch();
//   const { applicants } = useSelector((store) => store.application);

//   useEffect(() => {
//     const fetchAllApplicants = async () => {
//       try {
//         dispatch(setIsFetchingApplicants(true));
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(
//           `http://localhost:8000/api/v1/application/${id}/applicants`
//         );
//         if (res.data.success) {
//           console.log("PANKUUUU", res.data);
//           dispatch(setAllApplicants(res.data.job));
//           // dispatch(setAllApplicants(res.data.job.applications)); //Changes Made here
//           dispatch(setIsFetchingApplicants(false));
//         }
//       } catch (error) {
//         console.log(error);
//         dispatch(setIsFetchingApplicants(false));
//         toast.error(error.response.data.message);
//       }
//     };
//     fetchAllApplicants();
//   }, []);
//   return (
//     <>
//       <div className=" md:block">
//         <Navbar />
//         <div className="max-w-7xl mx-auto">
//           <h1 className="font-medium text-gray-100 text-xl my-5">
//             Applicants ({applicants?.applications?.length})
//           </h1>
//           <ApplicantsTable />
//         </div>
//       </div>

//       <div className="min-h-screen md:hidden px-4 space-y-2 m-auto flex flex-col justify-center text-center">
//         <span className="text-sm text-red-500">
//           Admin pages are optimized for Desktop and Laptop viewing *
//         </span>
//         <span className="text-sm  text-white">
//           For the best experience, please access them from a computer.
//         </span>
//       </div>
//     </>
//   );
// };

// export default Applicants;

//////////// UPDATE APPLICATION STATUS LOCALLY //////////////////////////

import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import {
  setAllApplicants,
  setIsFetchingApplicants,
} from "@/redux/applicationSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const Applicants = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        dispatch(setIsFetchingApplicants(true));
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/application/${id}/applicants`
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
          dispatch(setIsFetchingApplicants(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setIsFetchingApplicants(false));
        toast.error(error.response.data.message);
      }
    };
    fetchAllApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <h1 className="font-medium text-gray-100 text-xl my-5">
            Applicants ({applicants?.applications?.length})
          </h1>
          <ApplicantsTable />
        </div>
      </div>

      <div className="min-h-screen md:hidden px-4 space-y-2 m-auto flex flex-col justify-center text-center">
        <span className="text-sm text-red-500">
          Admin pages are optimized for Desktop and Laptop viewing *
        </span>
        <span className="text-sm  text-white">
          For the best experience, please access them from a computer.
        </span>
      </div>
    </>
  );
};

export default Applicants;
