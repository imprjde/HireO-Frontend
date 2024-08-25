import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "@/hooks/useGetCompanies";

let loader = (
  <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
);

const CreateJobs = () => {
  useGetCompanies(0);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/job/postjob`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
        setIsLoading(false);
        setInput({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experience: "",
          position: 0,
          companyId: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="flex items-center justify-center w-screen my-5">
          <div className="p-8 max-w-4xl  shadow-lg  rounded-md">
            <div className="grid grid-cols-2 text-white gap-4">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="space-y-1">
                <Label>
                  Salary <span className="text-xs text-gray-200">(In LPA)</span>
                </Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>
                  Experience Level{" "}
                  <span className="text-xs text-gray-200">(In years)</span>
                </Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>No of Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              {companies?.length !== 0 && (
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[200px] bg-black mt-3">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-black hover:bg-black text-white">
                    <SelectGroup className="bg-black hover:bg-black">
                      {companies &&
                        companies?.map((company) => {
                          return (
                            <SelectItem
                              key={company?._id}
                              value={company?.name.toLowerCase()}
                            >
                              {company?.name}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <Button
              onClick={submitHandler}
              disabled={companies?.length === 0 ? true : false}
              className="w-full mt-4 bg-gradient-to-r from-teal-600 to-green-800"
            >
              {isLoading ? loader : "Post New Job"}
            </Button>
            {companies.length === 0 && (
              <p className="text-red-600 text-xs font-bold text-center my-3">
                *Please register a company first, before posting a jobs
              </p>
            )}
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
};

export default CreateJobs;
