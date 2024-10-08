import { useEffect, useState, useRef } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Mail } from "lucide-react";
import ApplicationTable from "./ApplicationTable";
import { useSelector } from "react-redux";
import { UpdateProfileDialog } from "./UpdateProfileDialog";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { FaPen } from "react-icons/fa";
import BottomNav from "./shared/BottomNav";
import defaultProfilePic from "../../src/assets/default.jpg";
import { toast } from "sonner";
import useTokenExpirationCheck from "@/hooks/useTokenExpirationCheck";
import { FaPhone } from "react-icons/fa6";

const Profile = () => {
  useTokenExpirationCheck();
  const [open, setOpen] = useState(false);
  const { authUser } = useSelector((store) => store.auth);
  const bioRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login", { replace: true });
      toast.warning("Please Login to view your Profile");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBio = () => {
    setOpen(true);
    setTimeout(() => {
      bioRef?.current?.focus();
    }, 100);
  };

  return (
    <div className="pb-20">
      <Navbar />
      <div className="max-w-4xl  mx-3 md:mx-auto bg-gray-950  shadow-lg border border-x-0 border-t-sky-400 border-b-0 shadow-sky-400 text-white b rounded-2xl my-10 px-8 py-6">
        <button
          onClick={() => setOpen(true)}
          className="w-full justify-end flex  m-auto"
        >
          <FaPen />
        </button>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {authUser?.profile?.profilePhoto ? (
              <Avatar className="h-[72px] w-[72px] md:h-24 md:w-24 overflow-hidden rounded-full">
                <AvatarImage
                  src={authUser?.profile?.profilePhoto}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </Avatar>
            ) : (
              <Avatar className="h-[72px] w-[72px] md:h-24 md:w-24 overflow-hidden rounded-full">
                <AvatarImage
                  src={defaultProfilePic}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </Avatar>
            )}

            <div>
              <h1 className="font-semibold text-lg md:text-xl">
                {authUser?.fullname}
              </h1>
              <p className="font-medium ">
                {authUser?.profile?.bio ? (
                  <span>{authUser?.profile?.bio}</span>
                ) : (
                  <span className="cursor-pointer" onClick={handleBio}>
                    {" "}
                    Add your bio here
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />

            <span className="text-sm md:text-base">{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            {/* <Contact className="h-4 w-4" /> */}
            <FaPhone size={15} />
            <span className="text-sm md:text-base">
              {authUser?.phoneNumber ? (
                <>{authUser?.phoneNumber}</>
              ) : (
                <span>NA</span>
              )}
            </span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="my-2 font-bold">Skills</h1>
          <div className="items-center">
            {authUser?.profile?.skills.length > 0 ? (
              authUser?.profile?.skills.map((skill, index) => (
                <Badge className="w-fit mx-1 my-0.5" key={index}>
                  {skill}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {authUser?.profile?.resume ? (
            <a
              target="blank"
              href={authUser?.profile?.resume}
              className="w-full text-sm md:text-base text-sky-500 hover:underline cursor-pointer"
            >
              {authUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl  shadow-lg border border-x-fuchsia-400 border-t-fuchsia-400 border-b-0 shadow-fuchsia-400 mx-3 text-white bg-gray-950 md:mx-auto rounded-2xl">
        <ApplicationTable />
      </div>
      <UpdateProfileDialog bioRef={bioRef} open={open} setOpen={setOpen} />
      <BottomNav />
    </div>
  );
};

export default Profile;
