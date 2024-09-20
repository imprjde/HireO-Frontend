/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBSP4wtUYyJonWGfojlWacXwuIiPK5f9y8",
  authDomain: "hireo-a8e35.firebaseapp.com",
  projectId: "hireo-a8e35",
  storageBucket: "hireo-a8e35.appspot.com",
  messagingSenderId: "592885185223",
  appId: "1:592885185223:web:f1b33d5e01d309d7709ce2",
  measurementId: "G-MJQT5THP41",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://res.cloudinary.com/imprjde/image/upload/v1722672813/tsaosuood2dsnm9bhigy.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
