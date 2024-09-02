import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";

const useTokenExpirationCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth); // Get authentication state
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (authUser) {
      const checkTokenExpiration = () => {
        const token = Cookies.get("token");

        if (token) {
          console.log("CHECK EXP HOOK RUNNING", token);
          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
              console.log("OOPSIEEE!! Session Expired");
              dispatch(setAuthUser(null));
              setIsTokenExpired(true);
              navigate("/login");
              toast.info("Your session has expired. Please Login again.");
            }
          } catch (error) {
            console.error("Failed to decode token", error);
            dispatch(setAuthUser(null));
            navigate("/login");
            toast.error("Failed to verify session. Please log in again.");
          }
        }
      };

      checkTokenExpiration();
    }
  }, [authUser, dispatch, navigate]);

  return isTokenExpired;
};

export default useTokenExpirationCheck;
