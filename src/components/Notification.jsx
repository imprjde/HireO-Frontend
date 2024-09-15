/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { setNotificationDetails } from "@/redux/notificationSlice";
import HireoLogo from "../../src/assets/notify-dp.png";

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
                  <span className="pt- text-green-400 text-end">
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
                  <span className="pt- text-green-400 text-end">
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
                    <span className="pt- text-green-400 text-end">
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
                    <span className="pt- text-green-400 text-end">
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
                <img
                  src={HireoLogo}
                  alt="Logo"
                  className="w-10 h-10 rounded-full"
                />
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
                    <span className="pt- text-green-400 text-end">
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
