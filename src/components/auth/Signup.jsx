// import { useEffect, useState } from "react";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import { RadioGroup } from "../ui/radio-group";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const { loading, authUser } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     let passwordLen = input?.password.trim().length;
//     if (passwordLen < 6) {
//       toast.info("Password must be at least 6 characters long.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setShowPassword(false);
//       dispatch(setLoading(true));
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
//   useEffect(() => {
//     if (authUser?.role === "recruiter") {
//       navigate("/admin/companies");
//     } else if (authUser?.role === "student") {
//       navigate("/");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const defaultProfilePhoto =
//     "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png";
//   return (
//     <>
//       <div className="flex max-h-screen text-white items-center pt-12 md:pt-0 justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="md:w-1/2 w-[90%] rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-4 w-full flex m-auto justify-center text-center ">
//             <img
//               src="src/assets/HireO.svg"
//               className="w-[170px] md:w-[200px]"
//             />
//           </h1>{" "}
//           <div className="my-4 relative w-full flex m-auto justify-center mx-auto">
//             {input.file && (
//               <>
//                 <img
//                   src={URL.createObjectURL(input?.file)}
//                   alt="Profile Preview"
//                   className="w-[105px]  h-[105px] rounded-full"
//                 />
//               </>
//             )}
//             {!input.file && (
//               <>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   name="profilePicture"
//                   onChange={changeFileHandler}
//                   id="profilePictureInput"
//                   className="hidden "
//                 />
//                 <label
//                   htmlFor="profilePictureInput"
//                   className="relative block w-[105px] h-[105px]"
//                 >
//                   <img
//                     src={
//                       input.file
//                         ? URL.createObjectURL(input.file)
//                         : "https://www.svgrepo.com/show/33565/upload.svg"
//                     }
//                     alt="Profile Preview"
//                     className="w-[105px] absolute h-[105px] rounded-full"
//                   />
//                   <div className="absolute  flex-col w-[105px] h-[105px]  bg-gray-200 opacity- rounded-full flex justify-center items-center cursor-pointer transition duration-500">
//                     <span className="text-black">
//                       {" "}
//                       <img
//                         className="w-10"
//                         src="https://www.svgrepo.com/show/33565/upload.svg"
//                         alt="Upload Icon"
//                       />
//                     </span>{" "}
//                     <span className="text-black text-sm mt-1 font-medium">
//                       Profile Picture
//                     </span>
//                   </div>
//                 </label>
//               </>
//             )}
//           </div>
//           <div className="my-4">
//             <input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="Full Name"
//               className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
//             />
//           </div>
//           <div className="my-4">
//             <input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="Email"
//               className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
//             />
//           </div>
//           <div className="my-4">
//             <input
//               type="text"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="Phone Number"
//               className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
//             />
//           </div>
//           <div className="relative my-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//               placeholder="Password"
//               className="bg-zinc-700 text-sm w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
//             />
//             {input.password && (
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center pr-3"
//               >
//                 {showPassword ? (
//                   <FaEye size={18} color="white" />
//                 ) : (
//                   <FaEyeSlash size={18} color="white" />
//                 )}
//               </button>
//             )}
//           </div>
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-3">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   id="r1"
//                   checked={input.role === "student"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer accent-black "
//                 />
//                 <Label htmlFor="r1" className="cursor-pointer">
//                   Job Seeker
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   id="r2"
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer accent-black"
//                 />
//                 <Label htmlFor="r2" className="cursor-pointer ">
//                   Recruiter
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>
//           <Button
//             disabled={
//               !input.fullname ||
//               !input.phoneNumber ||
//               !input.email ||
//               !input.password ||
//               !input.role
//             }
//             type="submit"
//             className="w-full hover:bg-sky-500 bg-sky-500 "
//           >
//             {!loading ? (
//               "Sign Up"
//             ) : (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </>
//             )}
//           </Button>
//           <span className="pt-5 w-full m-auto justify-center flex text-sm text-center">
//             Already have an account?{" "}
//             <Link
//               to={"/login"}
//               className="text-sky-200 no-underline  font-semibold ml-2  cursor-pointer "
//             >
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signup;

///////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let passwordLen = input?.password.trim().length;
    if (passwordLen < 6) {
      toast.info("Password must be at least 6 characters long.");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setShowPassword(false);
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/companies");
    } else if (authUser?.role === "student") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex max-h-screen text-white items-center pt-12 md:pt-0 justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="md:w-1/2 w-[90%] rounded-md p-4 my-10"
        >
          <Link to="/">
            <h1 className="font-bold text-xl mb-4 w-full flex m-auto justify-center text-center ">
              <img
                src="src/assets/HireO.svg"
                className="w-[170px] md:w-[200px]"
              />
            </h1>{" "}
          </Link>
          <div className="my-4 relative w-full flex m-auto justify-center mx-auto">
            {input.file && (
              <>
                <img
                  src={URL.createObjectURL(input?.file)}
                  alt="Profile Preview"
                  className="w-[105px]  h-[105px] rounded-full"
                />
              </>
            )}
            {!input.file && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  onChange={changeFileHandler}
                  id="profilePictureInput"
                  className="hidden "
                />
                <label
                  htmlFor="profilePictureInput"
                  className="relative block w-[105px] h-[105px]"
                >
                  <img
                    src={
                      input.file
                        ? URL.createObjectURL(input.file)
                        : "https://www.svgrepo.com/show/33565/upload.svg"
                    }
                    alt="Profile Preview"
                    className="w-[105px] absolute m-auto  object-cover h-[105px]"
                  />
                  <div className="absolute  flex-col w-[105px] h-[105px]  bg-gray-200 opacity- rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                    <span className="text-black">
                      {" "}
                      <img
                        className="w-[105px] h-[105px] rounded-full"
                        src="src/assets/default.jpg"
                        alt="Upload Icon"
                      />
                    </span>{" "}
                    <span className="text-gray-300 font-bold text-center absolute text-sm mt-1">
                      Your Profile Picture Here
                    </span>
                  </div>
                </label>
              </>
            )}
          </div>
          <div className="my-4">
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Full Name"
              className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
          </div>
          <div className="my-4">
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
              className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Phone Number"
              className="bg-zinc-700 text-sm md:text-md w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
          </div>
          <div className="relative my-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="bg-zinc-700 text-sm w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
            {input.password && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <FaEye size={18} color="white" />
                ) : (
                  <FaEyeSlash size={18} color="white" />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  id="r1"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black "
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Job Seeker
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  id="r2"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black"
                />
                <Label htmlFor="r2" className="cursor-pointer ">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            disabled={
              !input.fullname ||
              !input.phoneNumber ||
              !input.email ||
              !input.password ||
              !input.role
            }
            type="submit"
            className="w-full hover:bg-purple-600 bg-purple-600 "
          >
            {!loading ? (
              "Sign Up"
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}
          </Button>
          <span className="pt-5 w-full m-auto justify-center flex text-sm text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-purple-300 no-underline  font-semibold ml-2  cursor-pointer "
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
