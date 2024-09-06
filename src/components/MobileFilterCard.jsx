/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  locationFilter,
  industryFilter,
  salaryFilter,
  experienceFilter,
} from "@/helpers/filterDatas";
import Collapsible from "react-collapsible";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function MobileFilterCard({
  setShowFilter,
  jobs,
  filterObject,
  setFilterObject,
  setViewFiltersTwo,
}) {
  const modalRef = useClickOutside(() => setShowFilter(false));
  const [openState, setOpenState] = useState([
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
  ]);

  const handleFilter = (type, query) => {
    setFilterObject((prevState) => {
      const newState = { ...prevState };

      if (type === "location" || type === "industry" || type === "experience") {
        if (newState[type].includes(query)) {
          newState[type] = newState[type].filter((item) => item !== query);
        } else {
          newState[type].push(query);
        }
      } else {
        newState[type] = query;
      }

      return newState;
    });
  };

  const clearAllFilter = () => {
    setFilterObject({ location: [], industry: [], experience: [], salary: "" });
    setShowFilter(false);
  };

  const toggle = (id) => {
    setOpenState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <>
      {/* <motion.div className="flex absolute z-50 top-0 left-0 h-full  w-full flex-col justify-end items-stretch bg-white bg-opacity-20 "></motion.div>   */}
      <motion.div
        ref={modalRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 pl-1 md:hidden right-0 h-full  mb-10 pb-5 overflow-y-auto  w-64 bg-black  border-x-0 border-b-0  shadow-md shadow-white z-50"
      >
        <div className="p-4 w-full m-auto rounded-l-md">
          <div className="flex justify-between border border-x-0 border-t-0 pb-2 items-center">
            <h2 className="text-base text-white font-bold">
              Filter Jobs ({jobs?.length})
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            <Collapsible
              open={true}
              trigger={
                <div
                  onClick={() => toggle(1)}
                  className="flex  w-[50%] justify-between text-white space-x-2 items-center"
                >
                  <h1 className="font-medium  text-base">Location</h1>
                  <h1 className="font-medium  text-base ">
                    {!openState[0].isOpen ? <FaAngleDown /> : <FaAngleUp />}
                  </h1>
                </div>
              }
            >
              <div className="overflow-y-auto max-h-[220px] mb-4">
                {locationFilter[0]?.array?.map((item, idx) => {
                  const itemId = `loc-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2 my-1">
                      <input
                        type="checkbox"
                        id={itemId}
                        checked={filterObject.location.includes(
                          item.toLowerCase()
                        )}
                        onChange={() =>
                          handleFilter("location", item.toLowerCase())
                        }
                        className="bg-white w-3.5 h-3.5 text-gray-900 cursor-pointer"
                      />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-white cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>

            <Collapsible
              trigger={
                <div
                  onClick={() => toggle(2)}
                  className="flex  w-[50%] justify-between text-white space-x-2 items-center"
                >
                  <h1 className="font-medium  text-base">Industry</h1>
                  <h1 className="font-medium  text-base ">
                    {!openState[1].isOpen ? <FaAngleDown /> : <FaAngleUp />}
                  </h1>
                </div>
              }
            >
              <div className="overflow-y-auto max-h-[220px] mb-4">
                {industryFilter[0]?.array?.map((item, idx) => {
                  const itemId = `ind-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2 my-1">
                      <input
                        type="checkbox"
                        id={itemId}
                        checked={filterObject.industry.includes(
                          item.toLowerCase()
                        )}
                        onChange={() =>
                          handleFilter("industry", item.toLowerCase())
                        }
                        className="bg-white w-3.5 h-3.5  text-gray-900 cursor-pointer"
                      />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-white cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>

            <Collapsible
              trigger={
                <div
                  onClick={() => toggle(3)}
                  className="flex w-[50%] justify-between text-white space-x-2 items-center"
                >
                  <h1 className="font-medium text-base">Experience</h1>
                  <h1 className="font-medium text-base ">
                    {!openState[2].isOpen ? <FaAngleDown /> : <FaAngleUp />}
                  </h1>
                </div>
              }
            >
              <div className="overflow-y-auto max-h-[150px] mb-2">
                {experienceFilter[0].array.map((item, idx) => {
                  const itemId = `ind-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2 my-1">
                      <input
                        type="checkbox"
                        id={itemId}
                        checked={filterObject.experience.includes(item?.value)}
                        onChange={() => handleFilter("experience", item.value)}
                        className="bg-white w-3.5 h-3.5  text-gray-900 cursor-pointer"
                      />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-white cursor-pointer"
                      >
                        {item.yoe}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>

            <Collapsible
              trigger={
                <div
                  onClick={() => toggle(4)}
                  className="flex  w-[50%] justify-between text-white space-x-2 items-center"
                >
                  <h1 className="font-medium  text-base">Salary</h1>
                  <h1 className="font-medium  text-base ">
                    {!openState[3].isOpen ? <FaAngleDown /> : <FaAngleUp />}
                  </h1>
                </div>
              }
            >
              {" "}
              <div className="overflow-y-auto max-h-[200px] mb-4 pb-4">
                {salaryFilter[0]?.array?.map((item, idx) => {
                  const itemId = `sal-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2 my-1">
                      <input
                        type="checkbox"
                        id={itemId}
                        name="salary"
                        value={item.value}
                        checked={filterObject.salary === item.value}
                        onChange={() => handleFilter("salary", item.value)}
                        className="bg-white cursor-pointer w-3.5 h-3.5  text-gray-900"
                      />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-white cursor-pointer"
                      >
                        {item.range}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapsible>

            <div className="flex w-full m-auto space-x-5 pr-2 mb-5">
              <div onClick={clearAllFilter} className="mt-1">
                <button className="bg-white flex items-center space-x-1 text-gray-900 text-sm font-bold px-2 py-0.5 rounded-md">
                  <span>Clear</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div
                onClick={() => {
                  setViewFiltersTwo(true);
                  setShowFilter(false);
                }}
                className="mt-1"
              >
                {(filterObject?.location?.length > 0 ||
                  filterObject?.industry?.length > 0 ||
                  filterObject?.experience?.length > 0) && (
                  <button className="bg-sky-600 flex items-center space-x-1 text-white text-sm font-bold px-2 py-0.5 rounded-md">
                    <span>View</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </ul>
        </div>
      </motion.div>
    </>
  );
}
