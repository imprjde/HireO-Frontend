// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuthUser } from "@/redux/authSlice";
// import { toast } from "sonner";
// import Cookies from "js-cookie";
// import { setClearSavedJobs } from "@/redux/jobSlice";
// import { setAllNotifications } from "@/redux/notificationSlice";

// const useTokenExpirationCheck = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { authUser } = useSelector((state) => state.auth); // Get authentication state
//   const [isTokenExpired, setIsTokenExpired] = useState(false);

//   useEffect(() => {
//     if (authUser) {
//       const checkTokenExpiration = () => {
//         const token = Cookies.get("token");
//         console.log("TKN+", token);

//         console.log("useTokenExpirationCheck Hook Running");
//         if (token) {
//           try {
//             const decodedToken = JSON.parse(atob(token.split(".")[1]));
//             const currentTime = Date.now() / 1000;
//             console.log({
//               "decodedToken.exp": decodedToken?.exp,
//               currentTime: currentTime,
//             });

//             if (decodedToken.exp < currentTime) {
//               console.log("OH NOOOO!! Your session has expired");
//               dispatch(setAuthUser(null));
//               setIsTokenExpired(true);
//               dispatch(setAuthUser(null));
//               dispatch(setClearSavedJobs([]));
//               dispatch(setAllNotifications([]));
//               navigate("/login");
//               toast.info("Your session has expired. Please Login again.");
//             }
//           } catch (error) {
//             dispatch(setAuthUser(null));
//             navigate("/login");
//             toast.error("Failed to verify session. Please log in again.");
//           }
//         } else {
//           console.log("No token found!");
//         }
//       };

//       checkTokenExpiration();
//     }
//   }, [authUser, dispatch, navigate]);

//   return isTokenExpired;
// };

// export default useTokenExpirationCheck;

//////////////////////////////////// JWT VERIFY /////////////////////////////////////

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
// import Cookies from "js-cookie";
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
        // const token = Cookies.get("token");
        const token = localStorage.getItem("token");
        console.log("LC TOKEN+", token);

        console.log("useTokenExpirationCheck Hook Running");
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;
            console.log({
              "decodedToken.exp": decodedToken?.exp,
              currentTime: currentTime,
            });

            if (decodedToken.exp < currentTime) {
              console.error("OH NOOOO!! Your session has expired");
              dispatch(setAuthUser(null));
              setIsTokenExpired(true);
              dispatch(setAuthUser(null));
              dispatch(setClearSavedJobs([]));
              dispatch(setAllNotifications([]));
              navigate("/login");
              toast.info("Your session has expired. Please Login again.");
            } else {
              console.warn("LC TOKEN IS VALID");
            }
          } catch (error) {
            dispatch(setAuthUser(null));
            navigate("/login");
            toast.error("Failed to verify session. Please log in again.");
          }
        } else {
          console.log("No token found!");
        }
      };

      checkTokenExpiration();
    }
  }, [authUser, dispatch, navigate]);

  return isTokenExpired;
};

export default useTokenExpirationCheck;
