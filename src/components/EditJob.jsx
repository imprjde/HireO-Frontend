import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "@/hooks/useGetCompanies";

let loader = (
  <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
);

const noLogoDefault =
  "https://novanym.com/cdn/shop/products/No-Logo_3d1beee0-0b40-48f0-b7c9-f19e8e397ea1.png?v=1614178247";

const EditJob = () => {
  useGetCompanies(0);
  const { companies } = useSelector((store) => store.company);
  const { jobEditData } = useSelector((store) => store.job);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: jobEditData?.title,
    description: jobEditData?.description,
    requirements: jobEditData?.requirements,
    salary: jobEditData?.salary,
    location: jobEditData?.location,
    jobType: jobEditData?.jobType,
    experienceLevel: jobEditData?.experienceLevel,
    position: jobEditData?.position,
    companyName: jobEditData?.company?.name,
    companyId: jobEditData?.company?._id,
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setFormData({
      ...formData,
      companyName: selectedCompany?.name,
      companyId: selectedCompany?._id,
    });
  };

  const validateForm = () => {
    if (
      formData.title.trim().length === 0 ||
      formData.description.trim().length === 0 ||
      !formData.requirements ||
      formData.location.trim().length === 0 ||
      formData.jobType.trim().length === 0 ||
      formData.experienceLevel.trim().length === 0 ||
      formData.companyName.trim().length === 0 ||
      formData.salary <= 0 ||
      !formData.salary ||
      !formData.position ||
      !formData.position
    ) {
      toast.warning("Please Fill All The Fields.");
      return false;
    }

    return true;
  };
  const submitHandler = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      let res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/job/updateJob/${jobEditData?._id}`,
        formData
      );
      setIsLoading(false);
      navigate("/admin/jobs");
      toast.success(res?.data?.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
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
                  value={formData?.title}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={formData?.description}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Requirements (Skills)</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={formData?.requirements}
                  required
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
                  value={formData?.salary}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={formData?.location}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={formData?.jobType}
                  required
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
                  name="experienceLevel"
                  value={formData?.experienceLevel}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-1">
                <Label>No of Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={formData?.position}
                  required
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              {companies?.length !== 0 && (
                <Select
                  value={formData?.companyName.toLowerCase()}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-[250px] bg-black mt-3">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-black hover:bg-black text-white">
                    <SelectGroup className="bg-black hover:bg-black">
                      {companies &&
                        companies?.map((company) => (
                          <SelectItem
                            key={company?._id}
                            value={company?.name?.toLowerCase()}
                            className="flex items-center  my-2"
                          >
                            <div className="w-full flex items-center justify-center">
                              <span>
                                <img
                                  src={company?.logo || noLogoDefault}
                                  alt={company?.name}
                                  className="w-6 h-6 mr-2 object-cover rounded-full"
                                />
                              </span>

                              <span>{company?.name}</span>
                            </div>
                          </SelectItem>
                        ))}
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
              {isLoading ? loader : "Edit Job"}
            </Button>
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

export default EditJob;
