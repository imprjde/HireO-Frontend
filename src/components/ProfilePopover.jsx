/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import defaultProfilePic from "../../src/assets/default.jpg";

export function ProfilePopover({ setShowModal }) {
  const [open, setOpen] = useState(false);

  const { authUser } = useSelector((store) => store.auth);

  return (
    <Popover open={open}>
      <PopoverTrigger onClick={() => setOpen(true)} asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={authUser?.profile?.profilePhoto || defaultProfilePic}
            alt="profile photo"
          />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={() => setOpen(false)}
        className="w-80 mr-4 mt-2 shadow-md shadow-amber-300 border border-gray-500 bg-gray-900 text-white "
      >
        <div className="grid gap-4">
          <div className=" flex  gap-2 space-y-">
            <Avatar className="cursor-pointer">
              <AvatarImage 
                src={authUser?.profile?.profilePhoto || defaultProfilePic}
                alt="profile photo"
              />
            </Avatar>
            <div className="space-y-1">
              <h4 className="font-medium leading-none">{authUser?.fullname}</h4>
              {authUser && authUser?.role === "student" && (
                <p className="text-sm text-white text-muted-foreground">
                  {authUser?.profile.bio.slice(0, 63)} ...
                </p>
              )}
              {authUser && authUser?.role === "recruiter" && (
                <p className=" text-white text-muted- font-semibold text-xs">
                  Admin
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            {authUser && authUser?.role === "student" && (
              <Link
                to="/profile"
                className="flex w-fit text-white font-semibold items-center gap-2 cursor-pointer"
              >
                <User2 className="w-5" />
                <p>View Profile</p>
              </Link>
            )}

            <div
              onClick={() => {
                setShowModal(true);
                setOpen(false);
              }}
              className=" flex  bg-rose-500 text-white px-2 py-0.5 rounded-md w-fit items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-5" />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
