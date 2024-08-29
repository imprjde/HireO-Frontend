import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: "AIzaSyBSP4wtUYyJonWGfojlWacXwuIiPK5f9y8",
  authDomain: "hireo-a8e35.firebaseapp.com",
  projectId: "hireo-a8e35",
  storageBucket: "hireo-a8e35.appspot.com",
  messagingSenderId: "592885185223",
  appId: "1:592885185223:web:f1b33d5e01d309d7709ce2",
  measurementId: "G-MJQT5THP41",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
export const messaging = getMessaging(app);

// Handle incoming messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  toast.info("New Notification Received");
  // Optionally show a notification or update UI
});
