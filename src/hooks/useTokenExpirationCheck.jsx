import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { setClearSavedJobs } from "@/redux/jobSlice";
import { setAllNotifications } from "@/redux/notificationSlice";

const useTokenExpirationCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth); // Get authentication state
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (authUser) {
      const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
              localStorage.removeItem("token");
              dispatch(setAuthUser(null));
              setIsTokenExpired(true);
              dispatch(setAuthUser(null));
              dispatch(setClearSavedJobs([]));
              dispatch(setAllNotifications([]));
              navigate("/login");
              toast.info("Your session has expired. Please Login again.");
            } else {
              return;
            }
          } catch (error) {
            dispatch(setAuthUser(null));
            navigate("/login");
            toast.error("Failed to verify session. Please log in again.");
          }
        } else {
          return;
        }
      };

      checkTokenExpiration();
    }
  }, [authUser, dispatch, navigate]);

  return isTokenExpired;
};

export default useTokenExpirationCheck;
