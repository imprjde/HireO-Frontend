import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Textarea } from "@/components/ui/textarea";
import { IoIosRemoveCircle } from "react-icons/io";

let loader = (
  <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
);

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params?.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, isLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("");
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    genre: "",
    totalEmployees: 0,
    file: "",
  });

  const validateForm = () => {
    const { name, description, website, location, genre, totalEmployees } =
      input;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedWebsite = website.trim();
    const trimmedLocation = location.trim();
    const trimmedGenre = genre.trim();
    const trimmedTotalEmployees = totalEmployees.toString().trim();

    if (
      !trimmedName ||
      !trimmedDescription ||
      !trimmedWebsite ||
      !trimmedLocation ||
      !trimmedGenre ||
      trimmedTotalEmployees <= 0
    ) {
      toast.info(
        "All fields must be filled, and total employees must be greater than 0."
      );
      return false;
    } else if (!companyLogo && !input?.file) {
      toast.error("Company Logo cannot be Empty.");
      return false;
    }
    return true;
  };

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Inputs=", input);
    console.log("companyLogo=", companyLogo);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("genre", input.genre);
    formData.append("totalEmployees", input.totalEmployees);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      isLoading(true);
      const res = await axios.put(
        // `http://localhost:8000/api/v1/company/update/${params.id}`,
        `${import.meta.env.VITE_BASE_URL}/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        isLoading(false);
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      isLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      genre: singleCompany?.genre || "",
      totalEmployees: singleCompany?.totalEmployees || "",
      file: input?.file,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCompany]);

  useEffect(() => {
    setCompanyLogo(singleCompany?.logo);
  }, [singleCompany?.logo]);

  const handleRemoveFile = () => {
    setCompanyLogo("");
    setInput({ ...input, file: null });
    document.getElementById("profilePictureInput").value = "";
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="max-w-xl mx-auto pb-10">
          <form onSubmit={submitHandler} className="shadow-lg p-8">
            <div className="flex items-center gap-5 mb-10">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/companies")}
                className="flex items-center hover:bg-black hover:text-white gap-2 text-gray-100 fot-semibold"
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className="font-bold text-white text-xl">Company Setup</h1>
            </div>

            <div className="bg-red- w-full flex m-auto justify-center">
              <>
                <>
                  {" "}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
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
                        handleRemoveFile();
                      }}
                      className="absolute text-rose-500 right-2 z-10 font-bold"
                    >
                      <IoIosRemoveCircle
                        size={20}
                        className="bg-white rounded-full cursor-pointer "
                      />
                    </span>

                    <img
                      src={
                        companyLogo ||
                        (input?.file instanceof File
                          ? URL.createObjectURL(input?.file)
                          : undefined)
                      }
                      alt="Profile Preview"
                      className="w-[105px] absolute h-[105px] object-fill rounded-full"
                    />

                    {!input?.file && !companyLogo && (
                      <div className="absolute  flex-col w-[105px] h-[105px]  bg-gray-200 opacity- rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                        <span className="text-black"></span>{" "}
                        <span className="text-black text-sm mt-1  text-center font-medium">
                          Company Logo Here
                        </span>
                      </div>
                    )}
                  </label>
                </>
              </>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 text-white">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  required="true"
                  value={input?.name}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Label>Company Description</Label>
                <Textarea
                  type="text"
                  name="description"
                  required="true"
                  value={input?.description}
                  onChange={changeEventHandler}
                  className="font-semibold  bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Label>Company Website</Label>
                <Input
                  type="text"
                  name="website"
                  required="true"
                  value={input?.website}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Label> Company Location</Label>
                <Input
                  type="text"
                  name="location"
                  required="true"
                  value={input?.location}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Label> Company Genre</Label>
                <Input
                  type="text"
                  name="genre"
                  required="true"
                  value={input?.genre}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Label> Company Employee Size</Label>
                <Input
                  type="number"
                  name="totalEmployees"
                  required="true"
                  value={input?.totalEmployees}
                  onChange={changeEventHandler}
                  className="font-semibold bg-black text-white border focus:border-0 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-900 shadow-md shadow-white mt-8"
            >
              {!loading ? "Update Company Info" : loader}
            </Button>
          </form>
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

export default CompanySetup;
