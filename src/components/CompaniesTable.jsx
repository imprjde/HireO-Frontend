import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";
import TableDataLoader from "./loaders/TableDataLoader";

const noLogoDefault =
  "https://novanym.com/cdn/shop/products/No-Logo_3d1beee0-0b40-48f0-b7c9-f19e8e397ea1.png?v=1614178247";
const CompaniesTable = () => {
  const { companies, searchCompanyByText, isFetchingCompanies } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  // AppliedJobsLoader
  return (
    <>
      {!isFetchingCompanies && companies?.length === 0 && (
        <div className="flex flex-col space-y-5 text-center text-gray-100 m-auto justify-center mt-32">
          <span className="font- text-lg font-semibold">
            You haven&#39;t registered any companies yet.
          </span>
          <span>
            <button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-white text-gray-950 font-semibold px-5 py-1 rounded-3xl"
            >
              Register your first company here
            </button>
          </span>
        </div>
      )}
      {isFetchingCompanies ? (
        <>
          <TableDataLoader />
        </>
      ) : (
        <>
          {!isFetchingCompanies && companies?.length > 0 && (
            <Table>
              <TableCaption className="text-gray-300">
                A list of your recent registered companies
              </TableCaption>
              <TableHeader>
                <TableRow className=" hover:bg-black ">
                  <TableHead className="text-gray-100">Logo</TableHead>
                  <TableHead className="text-gray-100">Name</TableHead>
                  <TableHead className="text-gray-100">Registered on</TableHead>
                  <TableHead className="text-right text-white">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-white font-semibold tracking-wider ">
                {filterCompany?.map((company) => (
                  <motion.tr
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={company._id}
                  >
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          className="object-cover"
                          src={company?.logo || noLogoDefault}
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="float-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-20 h-2 flex items-center justify-center m-auto bg-stone-800 border-0 text-white">
                          <div
                            onClick={() => {
                              navigate(`/admin/companies/${company?._id}`);
                            }}
                            className="flex w-fit items-center gap-2 cursor-pointer"
                          >
                            <Edit2 className="w-3" />
                            <span className="text-sm">Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};
export default CompaniesTable;
