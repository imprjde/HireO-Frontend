import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HireOLogo from "../../../src/assets/HireO.svg";
import Cookies from "js-cookie";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setShowPassword(false);
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        Cookies.set("token", res?.data?.token);
        console.log("res?.data?.token=", res?.data?.token);
        dispatch(setAuthUser(res.data.user));
        navigate("/", { replace: true });
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
      <div className="flex md:h-screen  flex-col m-auto pt-36 md:pt-0 items-center justify-center md:max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="md:w-1/2  w-[90%] bg-blue-0 text-white border-gray-200 rounded-md p-4 my-10"
        >
          <Link to="/">
            {" "}
            <h1 className="font-bold text-xl mb-4 b w-full flex m-auto justify-center text-center ">
              <img src={HireOLogo} className="w-[170px] md:w-[200px]" />
            </h1>
          </Link>

          <div className="my-4">
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="yourname@gmail.com"
              className="bg-zinc-700 text-sm md:text-md  w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
          </div>
          <div className=" flex justify-end">
            <Link
              to="/resest-password/9b2d4e8f1a3c5g7h"
              className="text-xs md:text-sm text-purple-300"
            >
              Forgot Password?
            </Link>
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
                  <FaEye size={18} color="gray" />
                ) : (
                  <FaEyeSlash size={18} color="gray" />
                )}
              </button>
            )}
          </div>

          <RadioGroup
            defaultValue="comfortable"
            className="flex items-center gap-4 my-5"
          >
            <div className="flex ml-1 items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="student"
                id="r1"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer accent-black md:w-3.5 md:h-3.5"
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
                className="cursor-pointer accent-black md:w-3.5 md:h-3.5"
              />
              <Label htmlFor="r2" className="cursor-pointer">
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <Button
            disabled={!input.email || !input.password || !input.role}
            type="submit"
            className="w-full hover:bg-purple-600 bg-purple-600 "
          >
            {!loading ? (
              "Login"
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}
          </Button>

          <span className="pt-5 w-full m-auto justify-center flex text-sm text-center">
            Don t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-purple-300 no-underline  font-semibold ml-2  cursor-pointer "
            >
              Signup.
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
