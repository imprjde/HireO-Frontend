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
    try {
      dispatch(setIsFetchingNotifications(true));
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
        {
          params: { userId: authUser?._id },
        }
      );
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
      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
          { userId: authUser?._id },
          {
            withCredentials: true,
          }
        );
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
    staleTime: 90000,
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
