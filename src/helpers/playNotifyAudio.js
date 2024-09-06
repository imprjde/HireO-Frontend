import notificationAudio from "../assets/Notification-audio.mp3";

const playNotifyAudio = () => {
  const audio = new Audio(notificationAudio);
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
};

export default playNotifyAudio;
