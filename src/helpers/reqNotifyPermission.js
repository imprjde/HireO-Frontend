// // import axios from "axios";
// // import { messaging } from "../firebase/firebase";
// // import { getToken } from "firebase/messaging";

// // export const reqNotifyPermission = async (userId) => {
// //   let permission = await Notification.requestPermission();

// //   // Limit the number of attempts to request permission
// //   const maxAttempts = 3;
// //   let attempts = 0;

// //   while (permission === "default" && attempts < maxAttempts) {
// //     console.log(
// //       "User has not yet responded to the permission request. Please wait..."
// //     );

// //     // Wait for a few seconds before re-requesting permission
// //     await new Promise((resolve) => setTimeout(resolve, 5000));

// //     permission = await Notification.requestPermission();
// //     attempts++;
// //   }

// //   if (permission === "granted") {
// //     console.log("Notification permission granted.");

// //     try {
// //       console.log("TRY CATCH");

// //       const token = await getToken(messaging, {
// //         vapidKey:
// //           "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
// //       });

// //       console.log("The Generated Token :", token);
// //       const resp = await axios.post(
// // "http://localhost:8000/api/v1/pushNotification/postToken",
// // `${import.meta.env.VITE_BASE_URL}/pushNotification/postToken`,
// //         {
// //           userId,
// //           token, // Consider generating this dynamically
// //         }
// //       );
// //       console.log("Post Token Response:", resp.data);
// //     } catch (error) {
// //       console.error(
// //         "Error Posting FCM TOKEN",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   } else {
// //     console.log("Notification permission denied.");
// //     // Implement user feedback for denied permission
// //     alert(
// //       "You have denied notification permissions. Please enable them in your browser settings to receive updates."
// //     );
// //   }
// // };

// ////////////////////////////////////////////////////////////////////////////////////////

// // import axios from "axios";
// // import { messaging } from "../firebase/firebase";
// // import { getToken } from "firebase/messaging";

// // export const reqNotifyPermission = async (userId) => {
// //   // Check local storage for a flag indicating if the token has already been posted
// //   const isTokenPosted = localStorage.getItem("isTokenPosted");

// //   if (isTokenPosted === "true") {
// //     console.log("Token has already been posted. Exiting function.");
// //     return;
// //   }

// //   let permission = await Notification.requestPermission();

// //   // Limit the number of attempts to request permission
// //   const maxAttempts = 3;
// //   let attempts = 0;

// //   while (permission === "default" && attempts < maxAttempts) {
// //     console.log(
// //       "User has not yet responded to the permission request. Please wait..."
// //     );

// //     // Wait for a few seconds before re-requesting permission
// //     await new Promise((resolve) => setTimeout(resolve, 5000));

// //     permission = await Notification.requestPermission();
// //     attempts++;
// //   }

// //   if (permission === "granted") {
// //     console.log("Notification permission granted.");

// //     try {
// //       console.log("TRY CATCH");

// //       const token = await getToken(messaging, {
// //         vapidKey:
// //           "BBN_wOv4FUfbUGbsau251mWz050ZDyUe73CD_EFgN9kFEA4uUl-aIdTGQrbud9HXIeJ4k20pj7KCW9CW2r-WD8M",
// //       });

// //       console.log("The Generated Token :", token);
// //       const resp = await axios.post(
// //         `${import.meta.env.VITE_BASE_URL}/pushNotification/postToken`,
// //         {
// //           userId,
// //           token, // Consider generating this dynamically
// //         }
// //       );
// //       console.log("Post Token Response:", resp.data);

// //       // If the token is successfully posted, set the flag in local storage
// //       localStorage.setItem("isTokenPosted", "true");
// //     } catch (error) {
// //       console.error(
// //         "Error Posting FCM TOKEN",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   } else {
// //     console.log("Notification permission denied.");
// //     // Implement user feedback for denied permission
// //     alert(
// //       "You have denied notification permissions. Please enable them in your browser settings to receive updates."
// //     );
// //   }
// // };

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import axios from "axios";
// import { messaging } from "../firebase/firebase";
// import { getToken } from "firebase/messaging";
// import { setAuthUser } from "@/redux/authSlice";

// export const reqNotifyPermission = async (userId, dispatch) => {
//   let permission = await Notification.requestPermission();

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

//       const resp = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/pushNotification/postToken`,
//         {
//           userId,
//           token,
//         }
//       );
//       console.log("Post Token Response:", resp.data);
//       dispatch(setAuthUser(resp?.data?.data?.updatedUser));
//     } catch (error) {
//       console.error(
//         "Error Posting FCM TOKEN",
//         error.response ? error.response.data : error.message
//       );
//     }
//   } else {
//     console.log("Notification permission denied.");
//     alert(
//       "You have denied notification permissions. Please enable them in your browser settings to receive updates."
//     );
//   }
// };
