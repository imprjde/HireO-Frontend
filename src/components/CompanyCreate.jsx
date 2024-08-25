import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  let loader = (
    <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewCompany = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        setLoading(false);
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (companyName.trim() !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [companyName]);
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="my-10">
            <h1 className="font-bold text-white text-2xl">Your Company Name</h1>
            <p className="text-gray-100  mt-2">
              What’s your company’s name? You can update it later if needed.
            </p>
          </div>
          <Label className="text-white">Company Name :</Label>

          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="my-2 bg-black border border-gray-200 focus:border-0 text-white placeholder-gray-400 placeholder:text-white placeholder:text-opacity-90 outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Google, Microsoft etc ."
          />

          <div className="flex items-center gap-4 my-10">
            <Button
              className="bg-gradient-to-r shadow-md shadow-sky-400 from-white to-gray-500 "
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              disabled={disable}
              onClick={createNewCompany}
              className={`py-2 ${
                disable ? "cursor-not-allowed" : "cursor-pointer"
              } px-4 min-w-[90px] rounded-lg font-semibold bg-gradient-to-r from-sky-500 to-sky-900 shadow-md shadow-white text-white  disabled:cursor-not-allowed transition-colors duration-200`}
            >
              {loading ? loader : "Continue"}
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

export default CompanyCreate;
