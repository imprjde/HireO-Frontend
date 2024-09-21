import { useEffect, useState } from "react";
import JobTable from "./JobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchAdminJobs } from "@/redux/jobSlice";
import Paginations from "./Paginations";

function PostedJobs() {
  useGetAllAdminJobs();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchAdminJobs(text));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="max-w-6xl mx-auto py-10">
          <div>
            <span className="text-gray-200 underline underline-offset-[7px] font-medium text-xl">
              Your Job List{" "}
            </span>
          </div>
          <div className="flex items-center justify-between my-5">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-[30%] placeholder:text-white font-medium placeholder:font-medium tracking-wider text-white bg-zinc-700 outline-none border-none focus:outline-none focus:border-none"
              placeholder="Filter by company name & role"
            />
            <Button
              className="bg-white font-semibold shadow-md shadow-sky-500  text-black hover:bg-gray-100"
              onClick={() => navigate("/admin/jobs/create")}
            >
              New Jobs
            </Button>
          </div>
          <JobTable />
          <div className="mt-5 flex m-auto justify-center">
            <Paginations />
          </div>
        </div>
      </div>

      <div className="min-h-screen md:hidden px-4 space-y-2 m-auto flex flex-col justify-center text-center">
        <span className="text-sm text-red-500">
          Admin pages are optimized for Desktop and Laptop viewing *
        </span>
        <span className="text-sm  text-white">
          For the best experience, please access them from a computer.
        </span>
      </div>
    </>
  );
}

export default PostedJobs;
