import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanies from "@/hooks/useGetCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";
import CompanyPagination from "./CompanyPagination";
import axios from "axios";
import { setUnseenNotificationCount } from "@/redux/notificationSlice";

const Companies = () => {
  useGetCompanies(1);
  const { authUser } = useSelector((store) => store.auth);

  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(text));
  }, [dispatch, text]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let resp = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/notification/get-notification-count`,
          {
            params: { userId: authUser?._id },
          }
        );

        if (resp) {
          dispatch(setUnseenNotificationCount(resp?.data?.data));
        }
      } catch (error) {
        return;
      }
    };

    if (authUser?._id) {
      fetchNotifications();
    }
  }, [authUser?._id, dispatch]);

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
        <div className="max-w-6xl mx-auto py-10">
          <div>
            <span className="text-gray-200 underline underline-offset-[7px]  font-medium text-xl">
              Your Company List{" "}
            </span>
          </div>
          <div className="flex items-center justify-between my-5">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-[30%] placeholder:text-white font-medium placeholder:font-medium tracking-wider text-white bg-zinc-700 outline-none border-none focus:outline-none focus:border-none"
              placeholder="Filter by name"
            />

            <Button
              className="bg-white font-semibold shadow-md shadow-sky-500  text-black hover:bg-gray-100"
              onClick={() => navigate("/admin/companies/create")}
            >
              New Company
            </Button>
          </div>
          <CompaniesTable />
          <div className="mt-5 flex m-auto justify-center">
            <CompanyPagination />
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

export default Companies;
