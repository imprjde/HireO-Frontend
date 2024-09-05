// import { useEffect, useState } from "react";
// import Notification from "./Notification";
// import BottomNav from "./shared/BottomNav";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   setAllNotifications,
//   setIsFetchingNotifications,
//   setIsRotated,
//   setUnseenNotificationCount,
// } from "@/redux/notificationSlice";
// import NotificationsLoader from "./loaders/NotificationsLoader";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// function NotificationPage() {
//   const [isVisible, setIsVisible] = useState(true);
//   const { authUser } = useSelector((store) => store.auth);
//   const { allNotifications, isFetchingNotifications } = useSelector(
//     (store) => store.notification
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchNotifications = async () => {
//   //     dispatch(setIsRotated(true));
//   //     try {
//   //       dispatch(setIsFetchingNotifications(true));
//   //       let resp = await axios.get(
//   //         `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
//   //         {
//   //           params: { userId: authUser?._id },
//   //         }
//   //       );

//   //       if (resp) {
//   //         dispatch(setAllNotifications(resp?.data?.data));
//   //         dispatch(setIsFetchingNotifications(false));
//   //         dispatch(setUnseenNotificationCount(0));
//   //         console.log(
//   //           "Notifications Fetched Successfully from Noti page",
//   //           resp.data.data
//   //         );
//   //       }
//   //     } catch (error) {
//   //       dispatch(setIsFetchingNotifications(false));
//   //       console.error("Failed to fetch notifications:", error);
//   //     }
//   //   };

//   //   if (authUser?._id) {
//   //     fetchNotifications();
//   //   } else {
//   //     toast.info("Please Login to view your latest Notifications");
//   //     let timer = setTimeout(() => {
//   //       navigate("/");
//   //     }, 2000);
//   //     return () => clearTimeout(timer);
//   //   }

//   //   return () => {
//   //     dispatch(setIsRotated(false));
//   //     const updateNotifications = async () => {
//   //       try {
//   //         await axios.put(
//   //           // `http://localhost:8000/api/v1/notification/update-notification`,
//   //           `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
//   //           {
//   //             userId: authUser?._id,
//   //           }
//   //         );
//   //       } catch (error) {
//   //         return;
//   //       }
//   //     };

//   //     if (authUser?._id) {
//   //       updateNotifications();
//   //     }
//   //   };
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [authUser?._id, dispatch]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       console.log("fetchNotifications Running in bottom nav");
//       dispatch(setIsRotated(true));
//       try {
//         dispatch(setIsFetchingNotifications(true));
//         const resp = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
//           {
//             params: { userId: authUser?._id },
//           }
//         );

//         if (resp) {
//           dispatch(setAllNotifications(resp.data.data));
//           dispatch(setUnseenNotificationCount(0));
//         }
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       } finally {
//         dispatch(setUnseenNotificationCount(0));
//         dispatch(setIsFetchingNotifications(false));
//       }
//     };

//     const updateNotifications = async () => {
//       dispatch(setUnseenNotificationCount(0));
//       console.log("-------------------updateNotifications ------------------");
//       try {
//         await axios.put(
//           `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
//           { userId: authUser?._id }
//         );
//         dispatch(setUnseenNotificationCount(0));
//       } catch (error) {
//         dispatch(setUnseenNotificationCount(0));
//         console.error("Failed to update notifications:", error);
//       }
//     };

//     if (authUser?._id) {
//       dispatch(setUnseenNotificationCount(0));
//       fetchNotifications();
//       return () => {
//         dispatch(setUnseenNotificationCount(0));
//         dispatch(setIsRotated(false));
//         updateNotifications();
//       };
//     } else {
//       toast.info("Please Login to view your latest Notifications");
//       const timer = setTimeout(() => {
//         navigate("/");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authUser?._id, dispatch, navigate]);

//   useEffect(() => {
//     let clearInfo = setTimeout(() => {
//       setIsVisible(false);
//     }, 5000);
//     return () => clearTimeout(clearInfo);
//   }, []);
//   return (
//     <div className="bg- text-white min-h-screen py-4 bg-red-5 px2 bg-red-">
//       {/* {authUser?._id && ( */}
//       <div className="text-xl font-bold my-4 pl-4">
//         Notifications{" "}
//         <AnimatePresence>
//           {isVisible && (
//             <motion.span
//               exit={{ opacity: 0 }}
//               transition={{ duration: 2 }}
//               className="text-sm font-medium text-gray-300"
//             >
//               ( Notifications auto-delete after 3 days )
//             </motion.span>
//           )}
//         </AnimatePresence>
//       </div>
//       {/* )} */}
//       <div className="mb-16">
//         {isFetchingNotifications && <NotificationsLoader />}

//         {!isFetchingNotifications &&
//           allNotifications?.map((notification) => {
//             return (
//               <div key={notification?._id}>
//                 <Notification notification={notification} />
//               </div>
//             );
//           })}

//         {!isFetchingNotifications && !allNotifications && (
//           <div className="bg-red-5 m-auto  text-lg font-serif flex justify-center h-[300px] items-center">
//             <span>No new notifications available!</span>
//           </div>
//         )}
//       </div>
//       <BottomNav />
//     </div>
//   );
// }

// export default NotificationPage;

////////////////////////// TANSTACK OPTIMIZATION  ////////////////////////////////////

// CODE-2
// NOTE: HERE IA M TRYING TO IMPLEMENT UPDATE NOTIFICATION USING TSQ , FETCH IS ALREDY WORKING FINE IN THE ABOVE BLOCK OF (CODE-2)

// import { useEffect, useState } from "react";
// import Notification from "./Notification";
// import BottomNav from "./shared/BottomNav";
// import axios from "axios";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   setAllNotifications,
//   setIsFetchingNotifications,
//   setIsRotated,
//   setUnseenNotificationCount,
// } from "@/redux/notificationSlice";
// import NotificationsLoader from "./loaders/NotificationsLoader";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// function NotificationPage() {
//   const [isVisible, setIsVisible] = useState(true);
//   const { authUser } = useSelector((store) => store.auth);
//   const { allNotifications, isFetchingNotifications } = useSelector(
//     (store) => store.notification
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchNotifications = async () => {
//     console.log("FETCH NOTIFCATION FN RUNNING>>>");
//     try {
//       dispatch(setIsFetchingNotifications(true));
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
//         {
//           params: { userId: authUser?._id },
//         }
//       );
//       console.log("FETCH NOTIFCATION::", data.data);
//       dispatch(setAllNotifications(data.data));
//       dispatch(setUnseenNotificationCount(0));
//       dispatch(setIsFetchingNotifications(false));

//       return data.data;
//     } catch (error) {
//       console.log("FETCH ERROR:", error);
//     }
//   };

//   const updateNotifications = async () => {
//     console.log("UPDATE NOTIFCATION FN RUNNING>>>");
//     try {
//       let resp = await axios.put(
//         `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
//         { userId: authUser?._id }
//       );

//       console.log("UPDATE NOTIFCATION::", resp.data);
//     } catch (error) {
//       return;
//     }
//   };

//   useQuery({
//     queryKey: ["notifications", authUser?._id],
//     queryFn: fetchNotifications,
//     enabled: !!authUser?._id,
//     staleTime: 30000,
//     onSuccess: (data) => {
//       dispatch(setAllNotifications(data));
//       dispatch(setUnseenNotificationCount(0));
//       dispatch(setIsFetchingNotifications(false));
//     },
//     onError: (error) => {
//       console.error("Failed to fetch notifications:", error.message);
//       toast.error("Failed to fetch your notifications");

//       dispatch(setIsFetchingNotifications(false));
//     },
//   });

//   const updateNotificationsMutation = useMutation({
//     mutationFn: updateNotifications,
//     onSuccess: () => {
//       dispatch(setUnseenNotificationCount(0));
//       dispatch(setIsRotated(false));
//     },
//     onError: (error) => {
//       console.error("Failed to update notifications:", error.message);
//       dispatch(setIsRotated(false));
//     },
//   });

//   useEffect(() => {
//     if (authUser?._id) {
//       dispatch(setUnseenNotificationCount(0));
//       dispatch(setIsRotated(true));

//       return () => {
//         updateNotificationsMutation.mutate();
//       };
//     } else {
//       toast.info("Please Login to view your latest Notifications");
//       const timer = setTimeout(() => {
//         navigate("/");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authUser?._id, dispatch, navigate]);

//   useEffect(() => {
//     let clearInfo = setTimeout(() => {
//       setIsVisible(false);
//     }, 5000);
//     return () => clearTimeout(clearInfo);
//   }, []);
//   return (
//     <div className="bg- text-white min-h-screen py-4 bg-red-5 px2 bg-red-">
//       {authUser?._id && (
//         <div className="text-xl font-bold my-4 pl-4">
//           Notifications{" "}
//           <AnimatePresence>
//             {isVisible && (
//               <motion.span
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 2 }}
//                 className="text-sm font-medium text-gray-300"
//               >
//                 ( Notifications auto-delete after 3 days )
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </div>
//       )}
//       <div className="mb-16">
//         {isFetchingNotifications && <NotificationsLoader />}

//         {!isFetchingNotifications &&
//           allNotifications?.map((notification) => {
//             return (
//               <div key={notification?._id}>
//                 <Notification notification={notification} />
//               </div>
//             );
//           })}

//         {!isFetchingNotifications && !allNotifications && (
//           <div className="bg-red-5 m-auto  text-lg font-serif flex justify-center h-[300px] items-center">
//             <span>No new notifications available!</span>
//           </div>
//         )}
//       </div>
//       <BottomNav />
//     </div>
//   );
// }

// export default NotificationPage;

////////////////////////// MORE TANSTACK OPTIMIZATION  ////////////////////////////////////

import { useEffect, useState } from "react";
import Notification from "./Notification";
import BottomNav from "./shared/BottomNav";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setAllNotifications,
  setIsFetchingNotifications,
  setIsRotated,
  setUnseenNotificationCount,
} from "@/redux/notificationSlice";
import NotificationsLoader from "./loaders/NotificationsLoader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function NotificationPage() {
  const [isVisible, setIsVisible] = useState(true);
  const { authUser } = useSelector((store) => store.auth);
  const { allNotifications, isFetchingNotifications } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    console.log("FETCH NOTIFCATION FN RUNNING>>>");
    try {
      dispatch(setIsFetchingNotifications(true));
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
        {
          params: { userId: authUser?._id },
        }
      );
      console.log("FETCH NOTIFCATION::", data.data);
      dispatch(setAllNotifications(data.data));
      dispatch(setUnseenNotificationCount(0));
      dispatch(setIsFetchingNotifications(false));

      return data.data;
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const updateNotifications = async () => {
    if (
      allNotifications.some((notification) => notification.hasSeen === false)
    ) {
      console.log("UPDATE NOTIFCATION FN RUNNING>>>");
      try {
        let resp = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
          { userId: authUser?._id }
        );
        console.log("UPDATE NOTIFCATION::", resp.data);
      } catch (error) {
        console.log("Failed to update notifications:", error);
      }
    } else {
      console.log("No unseen notifications to update.");
    }
  };

  useQuery({
    queryKey: ["notifications", authUser?._id],
    queryFn: fetchNotifications,
    enabled: !!authUser?._id,
    staleTime: 30000,
    onSuccess: (data) => {
      dispatch(setAllNotifications(data));
      dispatch(setUnseenNotificationCount(0));
      dispatch(setIsFetchingNotifications(false));
    },
    onError: (error) => {
      console.error("Failed to fetch notifications:", error.message);
      toast.error("Failed to fetch your notifications");

      dispatch(setIsFetchingNotifications(false));
    },
  });

  const updateNotificationsMutation = useMutation({
    mutationFn: updateNotifications,
    onSuccess: () => {
      dispatch(setUnseenNotificationCount(0));
      dispatch(setIsRotated(false));
    },
    onError: (error) => {
      console.error("Failed to update notifications:", error.message);
      dispatch(setIsRotated(false));
    },
  });

  useEffect(() => {
    if (authUser?._id) {
      dispatch(setUnseenNotificationCount(0));
      dispatch(setIsRotated(true));

      return () => {
        updateNotificationsMutation.mutate();
      };
    } else {
      toast.info("Please Login to view your latest Notifications");
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?._id, dispatch, navigate]);

  useEffect(() => {
    let clearInfo = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(clearInfo);
  }, []);
  return (
    <div className="bg- text-white min-h-screen py-4 bg-red-5 px2 bg-red-">
      {authUser?._id && (
        <div className="text-xl font-bold my-4 pl-4">
          Notifications{" "}
          <AnimatePresence>
            {isVisible && (
              <motion.span
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="text-sm font-medium text-gray-300"
              >
                ( Notifications auto-delete after 3 days )
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="mb-16">
        {isFetchingNotifications && <NotificationsLoader />}

        {!isFetchingNotifications &&
          allNotifications?.map((notification) => {
            return (
              <div key={notification?._id}>
                <Notification notification={notification} />
              </div>
            );
          })}

        {!isFetchingNotifications && !allNotifications && (
          <div className="bg-red-5 m-auto  text-lg font-serif flex justify-center h-[300px] items-center">
            <span>No new notifications available!</span>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default NotificationPage;
