import { useEffect } from "react";
import Notification from "./Notification";
import BottomNav from "./shared/BottomNav";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
  const { authUser } = useSelector((store) => store.auth);
  const { allNotifications, isFetchingNotifications } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     dispatch(setIsRotated(true));
  //     try {
  //       dispatch(setIsFetchingNotifications(true));
  //       let resp = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
  //         {
  //           params: { userId: authUser?._id },
  //         }
  //       );

  //       if (resp) {
  //         dispatch(setAllNotifications(resp?.data?.data));
  //         dispatch(setIsFetchingNotifications(false));
  //         dispatch(setUnseenNotificationCount(0));
  //         console.log(
  //           "Notifications Fetched Successfully from Noti page",
  //           resp.data.data
  //         );
  //       }
  //     } catch (error) {
  //       dispatch(setIsFetchingNotifications(false));
  //       console.error("Failed to fetch notifications:", error);
  //     }
  //   };

  //   if (authUser?._id) {
  //     fetchNotifications();
  //   } else {
  //     toast.info("Please Login to view your latest Notifications");
  //     let timer = setTimeout(() => {
  //       navigate("/");
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }

  //   return () => {
  //     dispatch(setIsRotated(false));
  //     const updateNotifications = async () => {
  //       try {
  //         await axios.put(
  //           // `http://localhost:8000/api/v1/notification/update-notification`,
  //           `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
  //           {
  //             userId: authUser?._id,
  //           }
  //         );
  //       } catch (error) {
  //         return;
  //       }
  //     };

  //     if (authUser?._id) {
  //       updateNotifications();
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authUser?._id, dispatch]);

  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(setIsRotated(true));
      try {
        dispatch(setIsFetchingNotifications(true));
        const resp = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
          {
            params: { userId: authUser?._id },
          }
        );

        if (resp) {
          dispatch(setAllNotifications(resp.data.data));
          dispatch(setUnseenNotificationCount(0));
          console.log(
            "Notifications Fetched Successfully from Noti page",
            resp.data.data
          );
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        dispatch(setIsFetchingNotifications(false));
      }
    };

    const updateNotifications = async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
          { userId: authUser?._id }
        );
      } catch (error) {
        console.error("Failed to update notifications:", error);
      }
    };

    if (authUser?._id) {
      fetchNotifications();
      // Update notifications when component is unmounting
      return () => {
        dispatch(setIsRotated(false));
        updateNotifications();
      };
    } else {
      toast.info("Please Login to view your latest Notifications");
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?._id, dispatch, navigate]);
  return (
    <div className="bg- text-white min-h-screen py-4 bg-red-5 px2 bg-red-">
      <div className="text-xl font-bold my-4 pl-4">Notifications</div>
      <div className="mb-16">
        {/* Map All Notification Below Here */}

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
