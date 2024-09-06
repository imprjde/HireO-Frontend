// import { GoHomeFill } from "react-icons/go";
// import { NavLink } from "react-router-dom";
// import { IoBookmark } from "react-icons/io5";
// import { IoIosNotifications } from "react-icons/io";
// import { IoIosBrowsers } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
// import { setUnseenNotificationCount } from "@/redux/notificationSlice";
// import Default from "../../../src/assets/default.jpg";
// import axios from "axios";

// export default function BottomNav() {
//   const { authUser } = useSelector((store) => store.auth);
//   const { isRotated } = useSelector((store) => store.notification);
//   const { unseenNotificationCount } = useSelector(
//     (store) => store.notification
//   );
//   const dispatch = useDispatch();

//   const fetchNotifications = async () => {
//     console.log("Fetching Notification Count in BottomNav");
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/notification/get-notification-count`,
//         {
//           params: { userId: authUser?._id },
//           withCredentials: true,
//         }
//       );

//       // console.log("RETURN:", data);
//       dispatch(setUnseenNotificationCount(data.data));

//       return data?.data;
//     } catch (error) {
//       return null;
//     }
//   };
//   useQuery({
//     queryKey: [authUser?._id],
//     queryFn: fetchNotifications,
//     enabled: !!authUser?._id,
//     staleTime: 90000,
//     // staleTime: 15000, //15 sec
//     refetchInterval: 90000,
//     // refetchInterval: 15000,
//   });

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="z-40 md:hidden bg-black fixed bottom-0 w-full">
//       <div>
//         <div className="flex z-50 gap-2 border-t border-[#292929] bg- px-4 pb-2 pt-2">
//           <NavLink
//             onClick={scrollToTop}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "text-purple-600 font-bold" : "text-white"
//               } just flex flex-1 flex-col items-center justify-end rounded-full `
//             }
//             to="/"
//           >
//             <GoHomeFill size={23} />
//             <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
//               Home
//             </p>
//           </NavLink>
//           <NavLink
//             to="/jobs"
//             className={({ isActive }) =>
//               `${
//                 isActive ? "text-purple-600 font-bold" : "text-white"
//               } just flex flex-1 flex-col items-center justify-end rounded-full text-[#FFFFFF`
//             }
//           >
//             <IoIosBrowsers size={23} />
//             <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
//               Explore
//             </p>
//           </NavLink>
//           <NavLink
//             to="/notifications"
//             className={({ isActive }) =>
//               `${
//                 isActive ? "text-purple-600 font-bold" : "text-white"
//               } just flex flex-1 flex-col items-center relative justify-end rounded-full text-[#FFFFFF`
//             }
//           >
//             <IoIosNotifications
//               size={23}
//               className={`${
//                 isRotated ? "rotate-[15deg]" : "rotate-[0deg]"
//               } transition-transform duration-300`}
//             />
//             {unseenNotificationCount > 0 && (
//               <span className="absolute top-[-5px] right-[16px] w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                 {unseenNotificationCount && unseenNotificationCount}
//               </span>
//             )}
//             <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
//               Notification
//             </p>
//           </NavLink>
//           <NavLink
//             to="/saved"
//             className={({ isActive }) =>
//               `${
//                 isActive ? "text-purple-600 font-bold" : "text-white"
//               } just flex flex-1 flex-col items-center justify-end rounded-full text-[#FFFFFF`
//             }
//           >
//             <IoBookmark size={23} />
//             <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
//               Savedx
//             </p>
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `${
//                 isActive ? "text-purple-600 font-bold" : "text-white"
//               } flex flex-1 flex-col items-center justify-end rounded-full`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 {authUser?.profile?.profilePhoto ? (
//                   <img
//                     className={`w-6 h-6 border-2 rounded-full object-cover ${
//                       isActive ? "border-purple-600" : "border-white"
//                     }`}
//                     src={authUser?.profile?.profilePhoto}
//                     alt="Profile Picture"
//                   />
//                 ) : (
//                   <img
//                     className={`w-6 h-6 border-2 rounded-full object-cover ${
//                       isActive ? "border-purple-600" : "border-purple-400"
//                     }`}
//                     src={Default}
//                     alt="Default Profile Picture"
//                   />
//                 )}

//                 <p className="text-xs font-medium leading-normal tracking-[0.015em]">
//                   Profile
//                 </p>
//               </>
//             )}
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////// CONDITIONAL SCROLL TO TOP //////////////////////////////////////////

import { GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { IoBookmark } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoIosBrowsers } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setUnseenNotificationCount } from "@/redux/notificationSlice";
import Default from "../../../src/assets/default.jpg";
import axios from "axios";

export default function BottomNav() {
  const { authUser } = useSelector((store) => store.auth);
  const { isRotated } = useSelector((store) => store.notification);
  const { unseenNotificationCount } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    console.log("Fetching Notification Count in BottomNav");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/notification/get-notification-count`,
        {
          params: { userId: authUser?._id },
          withCredentials: true,
        }
      );

      // console.log("RETURN:", data);
      dispatch(setUnseenNotificationCount(data.data));

      return data?.data;
    } catch (error) {
      return null;
    }
  };
  useQuery({
    queryKey: [authUser?._id],
    queryFn: fetchNotifications,
    enabled: !!authUser?._id,
    staleTime: 90000,
    // staleTime: 15000, //15 sec
    refetchInterval: 90000,
    // refetchInterval: 15000,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="z-40 md:hidden bg-black fixed bottom-0 w-full">
      <div>
        <div className="flex z-50 gap-2 border-t border-[#292929] bg- px-4 pb-2 pt-2">
          <NavLink
            onClick={scrollToTop}
            className={({ isActive }) =>
              `${
                isActive ? "text-purple-600 font-bold" : "text-white"
              } just flex flex-1 flex-col items-center justify-end rounded-full `
            }
            to="/"
          >
            <GoHomeFill size={23} />
            <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
              Home
            </p>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `${
                isActive ? "text-purple-600 font-bold" : "text-white"
              } just flex flex-1 flex-col items-center justify-end rounded-full text-[#FFFFFF`
            }
          >
            <IoIosBrowsers size={23} />
            <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
              Explore
            </p>
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `${
                isActive ? "text-purple-600 font-bold" : "text-white"
              } just flex flex-1 flex-col items-center relative justify-end rounded-full text-[#FFFFFF`
            }
          >
            <IoIosNotifications
              size={23}
              className={`${
                isRotated ? "rotate-[15deg]" : "rotate-[0deg]"
              } transition-transform duration-300`}
            />
            {unseenNotificationCount > 0 && (
              <span className="absolute top-[-5px] right-[16px] w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unseenNotificationCount && unseenNotificationCount}
              </span>
            )}
            <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
              Notification
            </p>
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `${
                isActive ? "text-purple-600 font-bold" : "text-white"
              } just flex flex-1 flex-col items-center justify-end rounded-full text-[#FFFFFF`
            }
          >
            <IoBookmark size={23} />
            <p className=" text-xs font-medium leading-normal tracking-[0.015em]">
              Saved
            </p>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${
                isActive ? "text-purple-600 font-bold" : "text-white"
              } flex flex-1 flex-col items-center justify-end rounded-full`
            }
          >
            {({ isActive }) => (
              <>
                {authUser?.profile?.profilePhoto ? (
                  <img
                    className={`w-6 h-6 border-2 rounded-full object-cover ${
                      isActive ? "border-purple-600" : "border-white"
                    }`}
                    src={authUser?.profile?.profilePhoto}
                    alt="Profile Picture"
                  />
                ) : (
                  <img
                    className={`w-6 h-6 border-2 rounded-full object-cover ${
                      isActive ? "border-purple-600" : "border-purple-400"
                    }`}
                    src={Default}
                    alt="Default Profile Picture"
                  />
                )}

                <p className="text-xs font-medium leading-normal tracking-[0.015em]">
                  Profile
                </p>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
