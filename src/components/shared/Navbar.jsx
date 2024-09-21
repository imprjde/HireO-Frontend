import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { ProfilePopover } from "../ProfilePopover";
import { useSelector } from "react-redux";
import LogoutConfirmation from "../LogoutConfirmation";
import { LuLogOut } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import { IoIosNotifications } from "react-icons/io";
import logo from "/src/assets/HireO.svg";
import NotificationModal from "../NotificationModal";
import { toast } from "sonner";

const links = [
  {
    id: 1,
    link: "home",
    path: "/",
  },
  {
    id: 2,
    link: "Explore",
    path: "/jobs",
  },

  {
    id: 3,
    link: "Saved",
    path: "/saved",
  },
];

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  // eslint-disable-next-line no-unused-vars
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout;
  const [showModal, setShowModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { unseenNotificationCount, isFetchingNotifications } = useSelector(
    (store) => store.notification
  );

  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    setIsScrolling(true);
    scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openNotificationModal = () => {
    if (!authUser) {
      return toast.info("Please Login to view your latest Notifications");
    } else {
      setShowNotificationModal(true);
    }
  };

  return (
    <AnimatePresence>
      {" "}
      <motion.div className=" text-white  bg-black  top-0 z-40 pr-4 md:pr-0  md:px-4 md:pt-1 ">
        <AnimatePresence>
          {showModal && (
            <LogoutConfirmation
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between  mx-aut max-w-7xl min-h-16 h-16">
          <Link to="/">
            <img src={logo} className="w-[150px] md:w-[170px]" alt="logo" />
          </Link>

          <div className="flex items-center gap-12">
            <ul className="hidden md:flex font-bold tracking-wider m items-center gap-3">
              {authUser && authUser.role === "recruiter" ? (
                <>
                  <li className=" cursor-pointer">
                    <NavLink to={"/admin/companies"} className="nav-link">
                      {({ isActive }) => (
                        <button className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition focus-visible:outline-2">
                          COMPANIES
                          {isActive && (
                            <motion.span
                              layoutId="activeIndicator"
                              className="absolute inset-0 z-10 bg-gradient-to-r from-purple-600 to-purple-900 mix-blend-screen"
                              style={{ borderRadius: 9999 }}
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                        </button>
                      )}
                    </NavLink>
                  </li>
                  <li className=" cursor-pointer">
                    <NavLink to={"/admin/jobs"} className="nav-link">
                      {({ isActive }) => (
                        <button className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition focus-visible:outline-2">
                          JOBS
                          {isActive && (
                            <motion.span
                              layoutId="activeIndicator"
                              className="absolute inset-0 z-10 bg-gradient-to-r from-purple-600 to-purple-900 mix-blend-screen"
                              style={{ borderRadius: 9999 }}
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                        </button>
                      )}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {links.map(({ link, path }, id) => (
                    <li key={id} className="relative">
                      <NavLink to={path} className="nav-link">
                        {({ isActive }) => (
                          <button className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white transition focus-visible:outline-2">
                            {link.toUpperCase()}
                            {isActive && (
                              <motion.span
                                layoutId="activeIndicator"
                                className="absolute inset-0 z-10 bg-gradient-to-r from-purple-600 to-purple-900 mix-blend-screen"
                                style={{ borderRadius: 9999 }}
                                transition={{
                                  type: "spring",
                                  bounce: 0.2,
                                  duration: 0.6,
                                }}
                              />
                            )}
                          </button>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </>
              )}
            </ul>

            <div className="hidden md:flex border-[3px] border-transparent rounde">
              <NavLink
                onClick={openNotificationModal}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white font-bold" : "text-white"
                  } just flex flex-1 flex-col items-center relative justify-end rounded-full text-[#FFFFFF`
                }
              >
                <IoIosNotifications size={28} />
                {!isFetchingNotifications && unseenNotificationCount > 0 && (
                  <span className="absolute top-[-5px] -right-1  w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unseenNotificationCount && unseenNotificationCount}
                  </span>
                )}
              </NavLink>
            </div>
            {/* here  */}
            {!authUser && (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant={"outline"}
                    className="text-gray-900    border-gray-600 hover:border-gray-400"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2]  hover:bg-[#5f32ad] text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            )}

            {authUser && (
              <>
                <div className="hidden md:flex border-[3px] border-transparent rounded-full bg-clip-border bg-gradient-to-r from-fuchsia-600  to-purple-600">
                  <ProfilePopover
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>

                <div
                  onClick={() => setShowModal(true)}
                  className="text-rose-500 md:hidden  cursor-pointer mr-2 "
                >
                  <LuLogOut size={25} />
                </div>
              </>
            )}
          </div>
        </div>
        {/* Notification Side Nav Below */}
        <AnimatePresence>
          {showNotificationModal && (
            <>
              <NotificationModal
                showNotificationModal={showNotificationModal}
                setShowNotificationModal={setShowNotificationModal}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;
