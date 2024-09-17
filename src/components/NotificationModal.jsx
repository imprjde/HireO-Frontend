/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import Notification from "./Notification";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsLoader from "./loaders/NotificationsLoader";
import {
  setAllNotifications,
  setIsFetchingNotifications,
  setUnseenNotificationCount,
} from "@/redux/notificationSlice";
import axios from "axios";

export default function NotificationModal({
  showNotificationModal,
  setShowNotificationModal,
}) {
  const modalRef = useClickOutside(() => setShowNotificationModal(false));
  const { authUser } = useSelector((store) => store.auth);
  const { allNotifications, isFetchingNotifications } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        dispatch(setIsFetchingNotifications(true));
        let resp = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/notification/get-notification`,
          {
            params: { userId: authUser?._id },
          }
        );

        if (resp) {
          dispatch(setAllNotifications(resp?.data?.data));
          dispatch(setIsFetchingNotifications(false));
          dispatch(setUnseenNotificationCount(0));
        }
      } catch (error) {
        dispatch(setIsFetchingNotifications(false));
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (authUser?._id) {
      fetchNotifications();
    }

    return () => {
      const updateNotifications = async () => {
        try {
          await axios.put(
            `${import.meta.env.VITE_BASE_URL}/notification/update-notification`,
            {
              userId: authUser?._id,
            },
            {
              withCredentials: true,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={modalRef}>
        {showNotificationModal && (
          <div
            className="fixed inset-0 bg-white opacity-30 z-40"
            onClick={() => setShowNotificationModal(false)}
          />
        )}

        <div
          className={`fixed top-0 z-50 left-0 w-[500px] h-full bg-black overflow-y-auto pb-10  transition-transform duration-300 ${
            showNotificationModal ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex m-auto w-full justify-between">
              <h2 className="text-lg px-4 pt-4 font-bold text-white">
                Notifications
              </h2>
              <span
                onClick={() => setShowNotificationModal(false)}
                className="text-lg px-4 pt-4 font-bold text-white"
              >
                <IoClose size={22} className="text-rose-500 cursor-pointer" />
              </span>
            </div>
            <div className="mt-5 px-4">
              {isFetchingNotifications && <NotificationsLoader />}
              {!isFetchingNotifications &&
                allNotifications?.map((notification) => {
                  return (
                    <div
                      key={notification?._id}
                      onClick={() => setShowNotificationModal(false)}
                    >
                      <Notification notification={notification} />
                    </div>
                  );
                })}
            </div>

            {!isFetchingNotifications && !allNotifications && (
              <div className="bg-red-5 m-auto  text-lg font-serif flex justify-center h-[300px] items-center">
                <span>No new notifications available!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
