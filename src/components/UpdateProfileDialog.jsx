/* eslint-disable react/prop-types */
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { setAuthUser, setLoading } from "@/redux/authSlice";
// import axios from "axios";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { IoClose } from "react-icons/io5";

// let loader = (
//   <div className="w-5 h-5 border-4 border-t-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
// );

// export function UpdateProfileDialog({ open, setOpen }) {
//   const { authUser } = useSelector((store) => store.auth);
//   console.log("DINKA=", authUser);
//   const [isLoading, setIsLoading] = useState(false);
//   const [input, setInput] = useState({
//     fullname: authUser?.fullname,
//     email: authUser?.email,
//     phoneNumber: authUser?.phoneNumber,
//     bio: authUser?.profile?.bio,
//     skills: authUser?.profile?.skills?.map((skill) => skill),
//     file: authUser?.profile?.resume,
//     profilePhoto: authUser?.profile?.profilePhoto,
//   });

//   const validateForm = () => {
//     if (
//       input.fullname.trim().length === 0 ||
//       input.email.trim().length === 0 ||
//       input.phoneNumber.length === 0
//     ) {
//       toast.warning("Please fill all the fields.");
//       return false;
//     } else {
//       return true;
//     }
//   };
//   const dispatch = useDispatch();

//   const changeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const handleDpChange = (e) => {
//     const profilePhoto = e.target.files?.[0];
//     setInput({ ...input, profilePhoto });
//   };

//   const handleRemoveDp = () => {
//     setInput({ ...input, profilePhoto: "" });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     console.log("INPUTIY=", input);
//     if (!validateForm()) return;
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     if (input.profilePhoto) {
//       formData.append("profilePhoto", input.profilePhoto);
//     }

//     try {
//       setIsLoading(true);
//       dispatch(setLoading(true));
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/user/profile/update",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         console.log(res);
//         dispatch(setAuthUser(res.data.user));
//         toast.success(res.data.message);
//         setIsLoading(false);
//         setInput({
//           fullname: res.data.user.fullname,
//           email: res.data.user.email,
//           phoneNumber: res.data.user.phoneNumber,
//           bio: res.data.user.profile?.bio || "",
//           skills: res.data.user.profile?.skills || [],
//           file: null,
//         });
//       }
//     } catch (error) {
//       toast.error(error?.message);
//       console.log(error);
//       setIsLoading(false);
//     } finally {
//       dispatch(setLoading(false));
//       setIsLoading(false);
//       setOpen(false);
//     }
//   };
//   return (
//     <Dialog open={open}>
//       <DialogContent
//         className=" rounded-md bg-black text-white border-t-orange-400 border-b-0 border-x-0 shadow-lg shadow-orange-500"
//         onInteractOutside={() => setOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4  py-4">
//             <div className="bg-red-5 w-full ml-2 flex m-auto justify-center">
//               <input
//                 type="file"
//                 onChange={handleDpChange}
//                 accept="image/*"
//                 id="profilePictureInput"
//                 className="hidden "
//               />
//               <label
//                 htmlFor="profilePictureInput"
//                 className="relative block w-[105px] h-[105px]"
//               >
//                 <span
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleRemoveDp();
//                   }}
//                   className="absolute text-rose-500 top-1 right-2 z-10 font-bold"
//                 >
//                   <IoClose
//                     size={18}
//                     className="bg-white rounded-full cursor-pointer "
//                   />
//                 </span>

//                 {input?.profilePhoto && (
//                   <img
//                     src={
//                       typeof input.profilePhoto === "string" &&
//                       input.profilePhoto !== ""
//                         ? input.profilePhoto
//                         : input.profilePhoto instanceof File
//                         ? URL.createObjectURL(input.profilePhoto)
//                         : undefined
//                     }
//                     alt="Profile Preview"
//                     className="w-[108px] absolute h-[108px] object-fill rounded-full"
//                   />
//                 )}

//                 {!input?.profilePhoto && (
//                   <div className="absolute  flex-col w-[108px] h-[108px]  bg-gray-200 opacity- rounded-full flex justify-center items-center cursor-pointer transition duration-500">
//                     <span className="text-black"></span>{" "}
//                     <span className="text-black text-sm mt-1  text-center font-medium">
//                       No Profile Picture
//                     </span>
//                   </div>
//                 )}
//               </label>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-left pl-4 md:pl-10">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={input.fullname}
//                 name="fullname"
//                 type="string"
//                 onChange={changeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-left pl-4 md:pl-10">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 value={input.email}
//                 type="email"
//                 name="email"
//                 onChange={changeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="number" className="text-left pl-4 md:pl-10">
//                 Number
//               </Label>
//               <Input
//                 id="number"
//                 type="string"
//                 value={input.phoneNumber}
//                 name="phoneNumber"
//                 onChange={changeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-left pl-4 md:pl-10">
//                 Bio
//               </Label>
//               <Input
//                 id="bio"
//                 value={input.bio}
//                 type="string"
//                 name="bio"
//                 onChange={changeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-left pl-4 md:pl-10">
//                 Skills
//               </Label>
//               <Input
//                 id="skills"
//                 value={input.skills}
//                 name="skills"
//                 type="string"
//                 onChange={changeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-left pl-4 md:pl-10">
//                 Resume
//               </Label>
//               <Input
//                 id="file"
//                 type="file"
//                 name="file"
//                 accept="application/pdf"
//                 onChange={fileChangeHandler}
//                 className="col-span-3 text-black"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               className="bg-gray-100 min-w-[130px] hover:bg-gray-100 text-black "
//               type="submit"
//             >
//               {!isLoading ? " Update Profile" : loader}{" "}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

////////////////  EDIT DP BUG FIX //////////////////////////////////////

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

let loader = (
  <div className="w-5 h-5 border-4 border-t-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
);

export function UpdateProfileDialog({ open, setOpen }) {
  const { authUser } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: authUser?.fullname,
    email: authUser?.email?.toLowerCase(),
    phoneNumber: authUser?.phoneNumber,
    bio: authUser?.profile?.bio,
    skills: authUser?.profile?.skills?.map((skill) => skill),
    file: authUser?.profile?.resume,
    profilePhoto: authUser?.profile?.profilePhoto,
  });

  const validateForm = () => {
    const trimmedPhoneNumber = String(input?.phoneNumber).trim();
    const phoneNumberRegex = /^\d{10}$/;
    if (
      input.fullname.trim().length === 0 ||
      input.email.trim().length === 0 ||
      trimmedPhoneNumber === 0
    ) {
      toast.warning("Please fill all the fields.");
      return false;
    } else if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
      toast.warning(
        "Please enter a valid phone number with exactly 10 digits."
      );
      return false;
    } else {
      return true;
    }
  };
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleDpChange = (e) => {
    const profilePhoto = e.target.files?.[0];
    setInput({ ...input, profilePhoto });
  };

  const handleRemoveDp = () => {
    setInput({ ...input, profilePhoto: "" });
    console.log("Input from handle remove", input);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("input", input);
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        // "http://localhost:8000/api/v1/user/profile/update",
        `${import.meta.env.VITE_BASE_URL}/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        console.log("API RESPONSE", res);
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        setIsLoading(false);
        setInput({
          fullname: res.data.user.fullname,
          email: res.data.user.email,
          phoneNumber: res.data.user.phoneNumber,
          bio: res.data.user.profile?.bio || "",
          profilePhoto: res?.data?.user?.profile?.profilePhoto,
          skills: res.data.user.profile?.skills || [],
          file: null,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 6000,
      });
      setIsLoading(false);
    } finally {
      dispatch(setLoading(false));
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent
        className=" rounded-md bg-black text-white border-t-orange-400 border-b-0 border-x-0 shadow-lg shadow-orange-500"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4  py-4">
            <div className="bg-red-5 w-full ml-2 flex m-auto justify-center">
              <input
                type="file"
                onChange={handleDpChange}
                accept="image/*"
                id="profilePictureInput"
                className="hidden "
              />
              <label
                htmlFor="profilePictureInput"
                className="relative block w-[105px] h-[105px]"
              >
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveDp();
                  }}
                  className="absolute text-rose-500 top-1 right-2 z-10 font-bold"
                >
                  <IoClose
                    size={18}
                    className="bg-white rounded-full cursor-pointer "
                  />
                </span>

                {input?.profilePhoto && (
                  <img
                    src={
                      typeof input.profilePhoto === "string" &&
                      input.profilePhoto !== ""
                        ? input.profilePhoto
                        : input.profilePhoto instanceof File
                        ? URL.createObjectURL(input.profilePhoto)
                        : undefined
                    }
                    alt="Profile Preview"
                    className="w-[108px] absolute h-[108px] object-fill rounded-full"
                  />
                )}

                {!input?.profilePhoto && (
                  <div className="absolute  flex-col w-[108px] h-[108px]  bg-gray-200 opacity- rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                    <span className="text-black"></span>{" "}
                    <span className="text-black text-sm mt-1  text-center font-medium">
                      No Profile Picture
                    </span>
                  </div>
                )}
              </label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left pl-4 md:pl-10">
                Name
              </Label>
              <Input
                id="name"
                value={input.fullname}
                name="fullname"
                type="string"
                onChange={changeHandler}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left pl-4 md:pl-10">
                Email
              </Label>
              <Input
                id="email"
                value={input.email}
                type="email"
                name="email"
                onChange={changeHandler}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-left pl-4 md:pl-10">
                Number
              </Label>
              <Input
                id="number"
                type="string"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeHandler}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-left pl-4 md:pl-10">
                Bio
              </Label>
              <Input
                id="bio"
                value={input.bio}
                type="string"
                name="bio"
                onChange={changeHandler}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-left pl-4 md:pl-10">
                Skills
              </Label>
              <Input
                id="skills"
                value={input.skills}
                name="skills"
                type="string"
                onChange={changeHandler}
                className="col-span-3 text-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-left pl-4 md:pl-10">
                Resume
              </Label>
              <Input
                id="file"
                type="file"
                name="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 text-black"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-100 min-w-[130px] hover:bg-gray-100 text-black "
              type="submit"
            >
              {!isLoading ? " Update Profile" : loader}{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
