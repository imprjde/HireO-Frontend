import notificationAudio from "../assets/Notification-audio.mp3";
export const playNotifyAudio = () => {
  const audio = new Audio(notificationAudio);
  audio.play().catch((error) => {
    console.error("Audio playback JKijIfailed:", error);
  });
};
