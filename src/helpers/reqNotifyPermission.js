// import axios from "axios";
// import { messaging } from "../firebase/firebase";
// import { getToken } from "firebase/messaging";
// import { setAuthUser } from "@/redux/authSlice";
// import { toast } from "sonner";

// export const reqNotifyPermission = async (userId, dispatch) => {
//   let permission = await Notification.requestPermission();
//   console.log("permission:", permission);

//   while (permission === "default") {
//     console.log("DEFAULT BLOCK RUNNING");
//     permission = await Notification.requestPermission();
//     console.log(
//       "User has not yet responded to the permission request. Please wait..."
//     );
//   }

//   if (permission === "granted") {
//     console.log("GRANTED BLOCK RUNNING");

//     try {
//       const token = await getToken(messaging, {
//         vapidKey:
//           "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
//       });

//       console.log("Generated Token:", token);

//       const resp = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/pushNotification/postToken`,
//         {
//           userId,
//           token,
//         }
//       );
//       console.log("Post Token Response:", resp.data);
//       toast.info("FCM Token Posted");
//       dispatch(setAuthUser(resp?.data?.data?.updatedUser));
//     } catch (error) {
//       toast.error("Error Posting FCM");
//       console.error(
//         "Error Posting FCM TOKEN",
//         error.response ? error.response.data : error.message
//       );
//     }
//   } else {
//     return;
//   }
// };

////////////////////// GPT CODE ////////////////////////////////////////////////////////

import axios from "axios";
import { messaging } from "../firebase/firebase";
import { getToken } from "firebase/messaging";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";

export const reqNotifyPermission = async (userId, dispatch, setShowModal) => {
  let permission = Notification.permission;

  if (permission === "granted") {
    return;
  }

  if (permission === "denied") {
    console.log("Upper Denied Running");
    return;
  }

  permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
      });

      console.log("Generated Token:", token);

      const resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/pushNotification/postToken`,
        {
          userId,
          token,
        }
      );
      localStorage.setItem("refToken", token);
      console.log("Post Token Response:", resp.data);
      dispatch(setAuthUser(resp?.data?.data?.updatedUser));
    } catch (error) {
      toast.error("Error Posting FCM");
      console.error(
        "Error Posting FCM TOKEN",
        error.response ? error.response.data : error.message
      );
    }
  } else if (permission === "denied") {
    setShowModal(true);
    console.log("LOWER");
    console.log("Notification permission denied.");
    toast.error("You denied notification permissions.");
  }
};
