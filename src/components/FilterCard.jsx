/* eslint-disable react/prop-types */
import { useState } from "react";
import Collapsible from "react-collapsible";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
<FaAngleDown />;
import {
  locationFilter,
  industryFilter,
  salaryFilter,
  experienceFilter,
} from "@/helpers/filterDatas";
const FilterCard = ({
  jobs,
  filterObject,
  setFilterObject,
  SetViewFilters,
}) => {
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
  };

  const toggle = (id) => {
    setOpenState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };
  return (
    // <div className="w-full min-h-[85%] h-fit  bg-black shadow-md border border-b-0 border-x-0 border-t-0  shadow-white text-white p-3 rounded-md">
    <div className="w-full mb-5 min-h-[38%] h-fit  bg-black  shadow shadow-white text-white p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-base tabular-nums">
          Filter Jobs ({jobs?.length})
        </h1>
      </div>
      <hr className="mt-3" />
      <ul className="mt-4 space-y-3">
        <Collapsible
          open={true}
          trigger={
            <div
              onClick={() => toggle(1)}
              className="flex  w-[50%] justify-between space-x-2 items-center"
            >
              <h1 className="font-medium text-base">Location</h1>
              <h1 className="font-medium text-base mt-1">
                {!openState[0].isOpen ? <FaAngleDown /> : <FaAngleUp />}
              </h1>
            </div>
          }
        >
          <div className="overflow-y-auto max-h-[150px] mb-2">
            {locationFilter[0].array.map((item, idx) => {
              const itemId = `loc-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 my-1">
                  <input
                    type="checkbox"
                    id={itemId}
                    checked={filterObject.location.includes(item.toLowerCase())}
                    onChange={() =>
                      handleFilter("location", item.toLowerCase())
                    }
                    className=" w-3 h-3 cursor-pointer"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-[13px] font-semibold cursor-pointer"
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
              className="flex w-[50%] justify-between space-x-2 items-center"
            >
              <h1 className="font-medium text-base">Industry</h1>
              <h1 className="font-medium text-base mt-1">
                {!openState[1].isOpen ? <FaAngleDown /> : <FaAngleUp />}
              </h1>
            </div>
          }
        >
          <div className="overflow-y-auto max-h-[150px] mb-2">
            {industryFilter[0].array.map((item, idx) => {
              const itemId = `ind-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 my-1">
                  <input
                    type="checkbox"
                    id={itemId}
                    checked={filterObject.industry.includes(item.toLowerCase())}
                    onChange={() =>
                      handleFilter("industry", item.toLowerCase())
                    }
                    className="bg-white cursor-pointer w-3 h-3  text-gray-900"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-[13px] font-semibold cursor-pointer"
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
              className="flex w-[50%] justify-between space-x-2 items-center"
            >
              <h1 className="font-medium text-base">Experience</h1>
              <h1 className="font-medium text-base mt-1">
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
                    className="bg-white cursor-pointer w-3 h-3  text-gray-900"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-[13px] font-semibold cursor-pointer"
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
              className="flex  w-[50%] justify-between space-x-2 items-center"
            >
              <h1 className="font-medium text-base">Salary</h1>
              <h1 className="font-medium text-base mt-1">
                {!openState[3].isOpen ? <FaAngleDown /> : <FaAngleUp />}
              </h1>
            </div>
          }
        >
          {" "}
          <div className="overflow-y-auto max-h-[150px]  pb-1">
            {salaryFilter[0].array.map((item, idx) => {
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
                    className="bg-white w-3 h-3  cursor-pointer text-gray-900"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-[13px] font-semibold cursor-pointer"
                  >
                    {item.range}
                  </label>
                </div>
              );
            })}
          </div>
        </Collapsible>

        <div className="mt-1  m-auto justify-between flex">
          <button
            onClick={clearAllFilter}
            className="bg-gray-100 flex items-center space-x-1 text-black text-sm font-semibold px-2 py-0.5 rounded-sm"
          >
            <span>Clear</span>
            <span className="rotate-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
              </svg>
            </span>
          </button>
          {(filterObject?.location?.length > 0 ||
            filterObject?.industry?.length > 0 ||
            filterObject?.experience?.length > 0) && (
            <button
              onClick={() => SetViewFilters(true)}
              className="bg-sky-700 text-white flex space-x-1 items-center  text-sm font-semibold px-2 py-0.5 rounded-sm"
            >
              <span>Applied</span>
              <span className="rotate-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15px"
                  height="15px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"></path>
                </svg>
              </span>
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default FilterCard;
