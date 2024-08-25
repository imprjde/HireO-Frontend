/* eslint-disable react/prop-types */

const NotificationPermissionPopup = ({ onAllow, onDeny }) => {
  return (
    <div style={popupStyles}>
      <h3>Enable Notifications</h3>
      <p>We&apos;d like to send you notifications for the latest updates.</p>
      <button onClick={onAllow}>Allow</button>
      <button onClick={onDeny}>Deny</button>
    </div>
  );
};

const popupStyles = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  zIndex: 1000,
};

export default NotificationPermissionPopup;
