import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warning("Email cannot be empty!");
      return;
    }
    try {
      setIsLoading(true);
      let resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/get-link`,
        {
          email,
        }
      );
      if (resp?.data?.success) {
        setIsLoading(false);
        toast.success(resp?.data?.message, {
          onAutoClose: false,
          closeButton: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "smooth", duration: 1 }}
      className="text-white"
    >
      <div className="flex md:h-screen  flex-col m-auto pt-64 md:pt-0 items-center justify-center md:max-w-7xl mx-auto">
        <form
          onSubmit={handleSendEmail}
          className="md:w-1/2  w-[90%] bg-blue-0 text-white border-gray-200 rounded-md p-4 my-10"
        >
          <div>
            <span className="text-sm md:text-sm">
              A password reset link will be sent to your email .
            </span>
          </div>
          <div className="my-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-zinc-700 text-sm md:text-md  w-full placeholder:tracking-wide placeholder:text-gray-300 rounded-sm h-[44px] outline-none border-none pl-3 pr-10"
            />
          </div>

          <Button
            disabled={!email || isLoading}
            type="submit"
            className="w-full hover:bg-purple-600  bg-purple-600 font-medium flex items-center justify-center  h-9 rounded-md "
          >
            {!isLoading ? (
              "Send Reset Link"
            ) : (
              <Loader2 className="mr-2 h-4  w-4 animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
