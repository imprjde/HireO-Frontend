/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { setNotificationDetails } from "@/redux/notificationSlice";

let logo =
  "data:image/png;base64,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";

export default function Notification({ notification }) {
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (notification) => {
    dispatch(
      setNotificationDetails({
        jobId: notification?.jobId?._id,
        jobTitle: notification?.jobId?.title,
        companyName: notification?.companyId?.name,
        type: notification?.type,
      })
    );
    navigate("/view-notification");
  };

  function timeAgo(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffInMs = now - pastDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return `${Math.floor(diffInDays / 7)}w ago`;
    }
  }

  const defaultProfilePhoto =
    "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png";

  // console.log("notification Type=", notification?.createdAt);
  return (
    <div>
      {notification?.type === "accept" ? (
        <div
          onClick={() => handleNavigate(notification)}
          className={`items-center cursor-pointer ${
            notification?.hasSeen ? "bg-slate-950" : "bg-slate-900"
          } border-[0.5px] border-slate-700 mx-2 my-1.5 rounded-sm py-3 px-3 shadow-md transition duration-300`}
        >
          <div className=" font-medium mb-1 flex text-xs text-gray-300 m-auto justify-between">
            <span className="flex items-center">
              {!notification?.hasSeen && (
                <span className="flex items-center">
                  <span className="text-white">New</span>
                  <span className="pt-1 text-green-400 text-end">
                    <GoDotFill size={15} />
                  </span>
                </span>
              )}
            </span>
            <span className="ml-auto">
              {" "}
              {notification?.createdAt && timeAgo(notification?.createdAt)}
            </span>
          </div>
          <div className="flex m-auto items-center ">
            <div className="w-[15%] flex-shrink-0 ">
              <img
                src={notification?.companyId?.logo}
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="w-[85%] pl-2 leading-tight">
              <span className="font-medium text-[13px] text-justify">
                <span className="font-bold text-sm text-purple-500">
                  Congratulations ! 🥳.
                </span>{" "}
                Your application for{" "}
                <span className="text-sky-400 font-medium">
                  {notification?.jobId?.title}{" "}
                </span>
                at{" "}
                <span className="text- font-medium ">
                  {notification?.companyId?.name}
                </span>{" "}
                has been <span className="text-teal-400">Accepted.</span>
              </span>
            </div>
          </div>
        </div>
      ) : notification?.type === "reject" ? (
        <div
          onClick={() => handleNavigate(notification)}
          className={`items-center cursor-pointer ${
            notification?.hasSeen ? "bg-slate-950" : "bg-slate-900"
          } border-[0.5px] border-slate-700 mx-2 my-1.5 rounded-sm py-3 px-3 shadow-md transition duration-300`}
        >
          <div className=" font-medium mb-1 flex text-xs text-gray-300 m-auto justify-between">
            <span className="flex items-center">
              {!notification?.hasSeen && (
                <span className="flex items-center">
                  <span className="text-white">New</span>
                  <span className="pt-1 text-green-400 text-end">
                    <GoDotFill size={15} />
                  </span>
                </span>
              )}
            </span>
            <span className="ml-auto">
              {" "}
              {notification?.createdAt && timeAgo(notification?.createdAt)}
            </span>
          </div>
          <div className=" flex m-auto items-center ">
            <div className="w-[15%] flex-shrink-0 ">
              <img
                src={notification?.companyId?.logo}
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="w-[85%] pl-2 leading-tight">
              <span className="font-medium  text-[13px] text-justify">
                Thanks for applying! While we didn&apos;t move forward with your
                application for{" "}
                <span className="text-sky-400 font-medium">
                  {notification?.jobId?.title}{" "}
                </span>
                at{" "}
                <span className="text- font-medium">
                  {" "}
                  {notification?.companyId?.name}
                </span>{" "}
                , we appreciate your effort! 🌟
              </span>
            </div>
          </div>
        </div>
      ) : notification?.type === "welcome" ? (
        <Link to="/">
          {" "}
          <div
            className={`items-center cursor-pointer ${
              notification?.hasSeen ? "bg-slate-950" : "bg-slate-900"
            } border-[0.5px] border-slate-700 mx-2 my-1.5 rounded-sm py-3 px-3 shadow-md transition duration-300`}
          >
            <div className=" font-medium mb-1 flex text-xs text-gray-300 m-auto justify-between">
              <span className="flex items-center">
                {!notification?.hasSeen && (
                  <span className="flex items-center">
                    <span className="text-white">New</span>
                    <span className="pt-1 text-green-400 text-end">
                      <GoDotFill size={15} />
                    </span>
                  </span>
                )}
              </span>
              <span className="ml-auto">
                {" "}
                {notification?.createdAt && timeAgo(notification?.createdAt)}
              </span>
            </div>
            <div className=" flex m-auto items-center ">
              <div className="w-[15%] flex-shrink-0 ">
                <img
                  src={authUser?.profile?.profilePhoto || defaultProfilePhoto}
                  alt="Logo"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="w-[85%] pl-2 leading-tight">
                <span className="font-medium text-[13px] text-justify">
                  🎉 Welcome to Hireo Dear {notification?.fullname}! We&apos;re
                  thrilled to have you here. Let&apos;s get you started on
                  finding your dream job! 🌟
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : notification?.type === "setup" ? (
        <Link to="/profile">
          <div
            className={`items-center cursor-pointer ${
              notification?.hasSeen ? "bg-slate-950" : "bg-slate-900"
            } border-[0.5px] border-slate-700 mx-2 my-1.5 rounded-sm py-3 px-3 shadow-md transition duration-300`}
          >
            <div className=" font-medium mb-1 flex text-xs text-gray-300 m-auto justify-between">
              <span className="flex items-center">
                {!notification?.hasSeen && (
                  <span className="flex items-center">
                    <span className="text-white">New</span>
                    <span className="pt-1 text-green-400 text-end">
                      <GoDotFill size={15} />
                    </span>
                  </span>
                )}
              </span>
              <span className="ml-auto">
                {" "}
                {notification?.createdAt && timeAgo(notification?.createdAt)}
              </span>
            </div>
            <div className=" flex m-auto items-center ">
              <div className="w-[15%] flex-shrink-0 ">
                {/* Put Hireo Logo Here  */}
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              </div>
              <div className="w-[85%] pl-2 leading-tight">
                <span className="font-medium  text-[13px] text-justify">
                  🚀 Let&apos;s make your profile shine! Take a moment to set up
                  your profile, and you&apos;ll be one step closer to your next
                  career adventure! ✨
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/admin/jobs/${notification?.jobId?._id}/applicants`}>
          <div
            className={`items-center cursor-pointer ${
              notification?.hasSeen ? "bg-slate-950" : "bg-slate-900"
            } border-[0.5px] border-slate-700 mx-2 my-1.5 rounded-sm py-3 px-3 shadow-md transition duration-300`}
          >
            <div className=" font-medium mb-1 flex text-xs text-gray-300 m-auto justify-between">
              <span className="flex items-center">
                {!notification?.hasSeen && (
                  <span className="flex items-center">
                    <span className="text-white">New</span>
                    <span className="pt-1 text-green-400 text-end">
                      <GoDotFill size={15} />
                    </span>
                  </span>
                )}
              </span>
              <span className="ml-auto">
                {" "}
                {notification?.createdAt && timeAgo(notification?.createdAt)}
              </span>
            </div>

            <div className="flex m-auto items-center ">
              <div className="w-[100%] pl-2 leading-tight">
                <span className="font-medium  text-[13px] text-justify">
                  📂 A new application alert! {notification?.fullname} has just
                  applied for your job posting{" "}
                  <span className="text-sky-600">
                    {notification?.jobId?.title}
                  </span>{" "}
                  at{" "}
                  <span className="text-sky-600">
                    {notification?.companyId?.name}.
                  </span>{" "}
                  Click to view !
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
