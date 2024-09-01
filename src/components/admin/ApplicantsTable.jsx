// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { MoreHorizontal } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast } from "sonner";
// import TableDataLoader from "../loaders/TableDataLoader";
// import { IoClose } from "react-icons/io5";
// import { FaCheck } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import UpdateLoader from "../loaders/UpdateLoader";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { setApplicantStatusLocally } from "@/redux/applicationSlice";
// import useClickOutside from "@/helpers/useClickOutside";

// const shortlistingStatus = [
//   { id: 1, status: "Accepted", value: "Accept", icon: <FaCheck /> },
//   { id: 2, status: "Rejected", value: "Reject", icon: <IoClose size={22} /> },
// ];

// const ApplicantsTable = () => {
//   const { authUser } = useSelector((store) => store.auth);
//   const [isStatusUpdating, setIsStatusUpdating] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [object, setObject] = useState({
//     id: "",
//     status: "",
//     applicantEmail: "",
//     applicantName: "",
//     belongsToUserId: "",
//     jobId: "",
//     type: "",
//     companyId: "",
//   });

//   const [modalStatus, setModalStatus] = useState("");
//   const { applicants, isFetchingApplicants } = useSelector(
//     (store) => store.application
//   );
//   const dispatch = useDispatch();
//   const modalRef = useClickOutside(() => setModal(false));

//   const statusHandler = async () => {
//     dispatch(
//       setApplicantStatusLocally({
//         applicantId: object?.id,
//         status: object?.status,
//       })
//     );
//     console.log("Object=", object);
//     try {
//       setModal(false);
//       setIsStatusUpdating(true);
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/application/status/${object?.id}/update`,
//         object,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message, {
//           closeButton: true,
//           onAutoClose: false,
//         });
//         setIsStatusUpdating(false);
//         setObject({
//           id: "",
//           status: "",
//           applicantEmail: "",
//           applicantName: "",
//         });
//       }
//     } catch (error) {
//       setIsStatusUpdating(false);
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };
//   // useEffect(() => {
//   //   console.log("THE notifyObject=", notifyObject);
//   // }, [notifyObject]);
//   return (
//     <>
//       {isStatusUpdating && (
//         <div className="text-white">
//           <UpdateLoader message={"Updating Status. Please Wait..."} />
//         </div>
//       )}
//       {isFetchingApplicants ? (
//         <>
//           <TableDataLoader />
//         </>
//       ) : (
//         <>
//           <Table>
//             {!isFetchingApplicants && applicants?.applications?.length === 0 ? (
//               <>
//                 <TableCaption className="text-gray-300 pt-10 text-lg">
//                   No Applicants found for this job.
//                 </TableCaption>
//               </>
//             ) : (
//               <>
//                 <TableCaption className="text-gray-300">
//                   A list of your recent applied user
//                 </TableCaption>
//               </>
//             )}
//             <TableHeader>
//               <TableRow className=" hover:bg-black ">
//                 <TableHead className="text-gray-100">Full Name</TableHead>
//                 <TableHead className="text-gray-100">Email</TableHead>
//                 <TableHead className="text-gray-100">Contact</TableHead>
//                 <TableHead className="text-gray-100">Resume</TableHead>
//                 <TableHead className="text-gray-100">Date</TableHead>
//                 <TableHead className="text-right text-gray-100">
//                   Action
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className="text-white font-semibold tracking-wider ">
//               {applicants &&
//                 applicants?.applications?.map((item) => (
//                   <motion.tr
//                     key={item?._id}
//                     initial={{ x: -100 }}
//                     animate={{ x: 0 }}
//                     exit={{ x: -100 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <TableCell>{item?.applicant?.fullname}</TableCell>
//                     <TableCell>{item?.applicant?.email}</TableCell>
//                     <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                     <TableCell className="text-blue-600 cursor-pointer">
//                       {item?.applicant?.profile?.resume ? (
//                         <a
//                           href={item?.applicant?.profile?.resume}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {item?.applicant?.profile?.resumeOriginalName}
//                         </a>
//                       ) : (
//                         <div className="text-white">NA</div>
//                       )}
//                     </TableCell>
//                     <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
//                     <TableCell className="float-right ">
//                       {item?.status === "pending" ? (
//                         <>
//                           <Popover>
//                             <PopoverTrigger>
//                               <MoreHorizontal />
//                             </PopoverTrigger>
//                             <PopoverContent className="w-28  bg-stone-800 border-0 ">
//                               {shortlistingStatus.map(
//                                 ({ status, value, icon, id }) => {
//                                   return (
//                                     <div
//                                       key={id}
//                                       onClick={() => {
//                                         setModal(true);
//                                         setModalStatus(value);
//                                         setObject({
//                                           userId: authUser?._id,
//                                           id: item?._id,
//                                           status: status,
//                                           applicantEmail:
//                                             item?.applicant?.email,
//                                           applicantName:
//                                             item?.applicant?.fullname,
//                                           belongsToUserId: item?.applicant?._id,
//                                           jobId: item?.job,
//                                           type: value,
//                                           companyId: applicants?.company,
//                                         });
//                                       }}
//                                       className={`${
//                                         status == "Rejected"
//                                           ? "text-rose-500 mr-2 "
//                                           : "text-green-500 "
//                                       } cursor-pointer text-justify text-sm my-1 flex justify-center items-center space-x-1 `}
//                                     >
//                                       <span>{icon}</span>
//                                       <span className="font-bold">{value}</span>
//                                     </div>
//                                   );
//                                 }
//                               )}
//                             </PopoverContent>
//                           </Popover>
//                         </>
//                       ) : (
//                         <>
//                           <div className="flex m-auto justify-center items-center">
//                             {item?.status === "rejected" ? (
//                               <>
//                                 <span className="bg-red-600 px-3 py-0.5 rounded-3xl ">
//                                   Rejected
//                                 </span>
//                               </>
//                             ) : (
//                               <>
//                                 {" "}
//                                 <span className="bg-emerald-600 px-3 py-0.5 rounded-3xl ">
//                                   Accepted
//                                 </span>
//                               </>
//                             )}
//                           </div>
//                         </>
//                       )}
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//             </TableBody>
//           </Table>

//           {/* ////////////////// MODAL ///////////////////////// */}

//           <AlertDialog open={modal}>
//             <AlertDialogContent
//               ref={modalRef}
//               onInteractOutside={() => setModal(false)}
//             >
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   Are you sure you want to proceed? This action will notify the
//                   user via email and send a notification.
//                 </AlertDialogTitle>
//                 <AlertDialogDescription className="text-red-500">
//                   *This action cannot be undone. Make sure you choose the right
//                   option.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel
//                   onClick={() => setModal(false)}
//                   className="text-gray-900 font-semibold"
//                 >
//                   Cancel
//                 </AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={() => statusHandler()}
//                   // className="bg-green-600"
//                   className={`${
//                     modalStatus === "Accept"
//                       ? "bg-green-600 hover:bg-green-600"
//                       : "bg-red-600 hover:bg-red-600"
//                   }`}
//                 >
//                   {modalStatus === "Accept"
//                     ? "Accept Application"
//                     : "Reject Application"}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>

//           {/* ////////////////// MODAL ///////////////////////// */}
//         </>
//       )}
//     </>
//   );
// };
// export default ApplicantsTable;

///////////////////////////////////////////////////////////////////////////////////////////////

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
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import TableDataLoader from "../loaders/TableDataLoader";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import UpdateLoader from "../loaders/UpdateLoader";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { setApplicantStatusLocally } from "@/redux/applicationSlice";

import useClickOutside from "@/helpers/useClickOutside";
// import { useDispatch } from "react-redux";

const shortlistingStatus = [
  { id: 1, status: "Accepted", value: "Accept", icon: <FaCheck /> },
  { id: 2, status: "Rejected", value: "Reject", icon: <IoClose size={22} /> },
];

const ApplicantsTable = () => {
  const { authUser } = useSelector((store) => store.auth);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [modal, setModal] = useState(false);
  const [object, setObject] = useState({
    id: "",
    status: "",
    applicantEmail: "",
    applicantName: "",
    belongsToUserId: "",
    jobId: "",
    type: "",
    companyId: "",
  });

  const [modalStatus, setModalStatus] = useState("");
  const { applicants, isFetchingApplicants } = useSelector(
    (store) => store.application
  );
  // const dispatch = useDispatch();
  const modalRef = useClickOutside(() => setModal(false));

  const statusHandler = async () => {
    try {
      setModal(false);
      setIsStatusUpdating(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/application/status/${
          object?.id
        }/update`,
        object,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          closeButton: true,
          onAutoClose: false,
        });
        setIsStatusUpdating(false);

        // Uncommnet Below Code to update status Locally

        // dispatch(
        //   setApplicantStatusLocally({
        //     applicantId: object?.id,
        //     newStatus: object?.status?.toLowerCase(),
        //   })
        // );

        setObject({
          id: "",
          status: "",
          applicantEmail: "",
          applicantName: "",
        });
      }
    } catch (error) {
      setIsStatusUpdating(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {}, [applicants]);
  return (
    <>
      {isStatusUpdating && (
        <div className="text-white">
          <UpdateLoader message={"Updating Status. Please Wait..."} />
        </div>
      )}
      {isFetchingApplicants ? (
        <>
          <TableDataLoader />
        </>
      ) : (
        <>
          <Table>
            {!isFetchingApplicants && applicants?.applications?.length === 0 ? (
              <>
                <TableCaption className="text-gray-300 pt-10 text-lg">
                  No Applicants found for this job.
                </TableCaption>
              </>
            ) : (
              <>
                <TableCaption className="text-gray-300">
                  A list of your recent applied user
                </TableCaption>
              </>
            )}
            <TableHeader>
              <TableRow className=" hover:bg-black ">
                <TableHead className="text-gray-100">Full Name</TableHead>
                <TableHead className="text-gray-100">Email</TableHead>
                <TableHead className="text-gray-100">Contact</TableHead>
                <TableHead className="text-gray-100">Resume</TableHead>
                <TableHead className="text-gray-100">Date</TableHead>
                <TableHead className="text-right text-gray-100">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white font-semibold tracking-wider ">
              {applicants &&
                applicants?.applications?.map((item) => (
                  <motion.tr
                    key={item?._id}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TableCell>{item?.applicant?.fullname}</TableCell>
                    <TableCell>{item?.applicant?.email}</TableCell>
                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                    <TableCell className="text-blue-600 cursor-pointer">
                      {item?.applicant?.profile?.resume ? (
                        <a
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.applicant?.profile?.resumeOriginalName}
                        </a>
                      ) : (
                        <div className="text-white">NA</div>
                      )}
                    </TableCell>
                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="float-right ">
                      {item?.status === "pending" ? (
                        <>
                          <Popover>
                            <PopoverTrigger>
                              <MoreHorizontal />
                            </PopoverTrigger>
                            <PopoverContent className="w-28  bg-stone-800 border-0 ">
                              {shortlistingStatus.map(
                                ({ status, value, icon, id }) => {
                                  return (
                                    <div
                                      key={id}
                                      onClick={() => {
                                        setModal(true);
                                        setModalStatus(value);
                                        setObject({
                                          userId: authUser?._id,
                                          id: item?._id,
                                          status: status,
                                          applicantEmail:
                                            item?.applicant?.email,
                                          applicantName:
                                            item?.applicant?.fullname,
                                          belongsToUserId: item?.applicant?._id,
                                          jobId: item?.job,
                                          type: value,
                                          companyId: applicants?.company,
                                        });
                                      }}
                                      className={`${
                                        status == "Rejected"
                                          ? "text-rose-500 mr-2 "
                                          : "text-green-500 "
                                      } cursor-pointer text-justify text-sm my-1 flex justify-center items-center space-x-1 `}
                                    >
                                      <span>{icon}</span>
                                      <span className="font-bold">{value}</span>
                                    </div>
                                  );
                                }
                              )}
                            </PopoverContent>
                          </Popover>
                        </>
                      ) : (
                        <>
                          <div className="flex m-auto justify-center items-center">
                            {item?.status === "rejected" ||
                            item?.status === "Rejected" ? (
                              <>
                                <span className="bg-red-600 px-3 py-0.5 rounded-3xl ">
                                  Rejected
                                </span>
                              </>
                            ) : (
                              <>
                                {" "}
                                <span className="bg-emerald-600 px-3 py-0.5 rounded-3xl ">
                                  Accepted
                                </span>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
            </TableBody>
          </Table>

          {/* ////////////////// MODAL ///////////////////////// */}

          <AlertDialog open={modal}>
            <AlertDialogContent
              ref={modalRef}
              onInteractOutside={() => setModal(false)}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to proceed? This action will notify the
                  user via email and send a notification.
                </AlertDialogTitle>
                <AlertDialogDescription className="text-red-500">
                  *This action cannot be undone. Make sure you choose the right
                  option.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => setModal(false)}
                  className="text-gray-900 font-semibold"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => statusHandler()}
                  // className="bg-green-600"
                  className={`${
                    modalStatus === "Accept"
                      ? "bg-green-600 hover:bg-green-600"
                      : "bg-red-600 hover:bg-red-600"
                  }`}
                >
                  {modalStatus === "Accept"
                    ? "Accept Application"
                    : "Reject Application"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* ////////////////// MODAL ///////////////////////// */}
        </>
      )}
    </>
  );
};
export default ApplicantsTable;
