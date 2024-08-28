import { useEffect } from "react";
import Notification from "./Notification";
import BottomNav from "./shared/BottomNav";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotifications,
  setIsFetchingNotifications,
  setUnseenNotificationCount,
} from "@/redux/notificationSlice";
import NotificationsLoader from "./loaders/NotificationsLoader";

function NotificationPage() {
  const { authUser } = useSelector((store) => store.auth);
  const { allNotifications, isFetchingNotifications } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      console.log("FETCH NOTIFICATION FUNCTION RUNNING");
      try {
        dispatch(setIsFetchingNotifications(true));
        let resp = await axios.get(
          // `http://localhost:8000/api/v1/notification/get-notification`,
          `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
          {
            params: { userId: authUser?._id },
          }
        );

        if (resp) {
          dispatch(setAllNotifications(resp?.data?.data));
          dispatch(setIsFetchingNotifications(false));
          dispatch(setUnseenNotificationCount(0));
          console.log(
            "Notifications Fetched Successfully from Noti page",
            resp.data.data
          );
        }
      } catch (error) {
        dispatch(setIsFetchingNotifications(false));
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (authUser?._id) {
      fetchNotifications();
    }

    // Below Fuction Updates the hasSeen filed of notification on the databse while user leaves this page
    return () => {
      const updateNotifications = async () => {
        try {
          await axios.put(
            // `http://localhost:8000/api/v1/notification/update-notification`,
            `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
            {
              userId: authUser?._id,
            }
          );
        } catch (error) {
          return;
        }
      };

      if (authUser?._id) {
        updateNotifications();
      }
    };
  }, [authUser?._id, dispatch]);

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
