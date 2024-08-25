/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import { motion } from "framer-motion";

export default function MobileAppliedFilters({
  setViewFiltersTwo,
  filterObject,
}) {
  const modalRef = useClickOutside(() => setViewFiltersTwo(false));

  return (
    <div className="fixed md:hidden inset-0 z-40 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex absolute top-0 left-0 h-full  w-full flex-col justify-end items-stretch bg-white bg-opacity-10 "
      >
        <motion.div
          ref={modalRef}
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          exit={{ y: 500 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-stretch py-6 border border-x-0 border-b-0 border-t-sky-500  bg-black  px-4  space-y-2 rounded-t-2xl"
        >
          <div className="h-0.5 bg-white my-2 w-10 m-auto flex -mt-2"></div>

          {filterObject?.location?.length > 0 && (
            <div className="items-center  bg-stone-800 px-3  py-1 rounded-lg text-sm">
              <div className="mb-1">
                <span className="text-sm mb-2 text-white font-semibold">
                  Locations
                </span>
              </div>
              <div className="  w-full ">
                {filterObject?.location?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-stone-950 text-white mx-0.5 my-0.5 w-fit inline-grid px-2 py-1 rounded-md text-xs"
                  >
                    {item?.charAt(0).toUpperCase() + item?.slice(1)}{" "}
                  </span>
                ))}
              </div>
            </div>
          )}
          {filterObject?.industry?.length > 0 && (
            <div className="items-center  bg-stone-800 px-3  py-1 rounded-lg text-sm">
              <div className="mb-1">
                <span className="text-sm mb-2 text-white font-semibold">
                  Locations
                </span>
              </div>
              <div className="  w-full ">
                {filterObject?.industry?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-stone-950 text-white mx-0.5 my-0.5 w-fit inline-grid px-2 py-1 rounded-md text-xs"
                  >
                    {item?.charAt(0).toUpperCase() + item?.slice(1)}{" "}
                  </span>
                ))}
              </div>
            </div>
          )}

          {filterObject?.experience?.length > 0 && (
            <div className="items-center  bg-stone-800 px-3  py-1 rounded-lg text-sm">
              <div className="mb-1">
                <span className="text-sm mb-2 text-white font-semibold">
                  Experience
                </span>
              </div>
              <div className="  w-full ">
                {filterObject?.experience?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-stone-950 text-white mx-0.5 my-0.5 w-fit inline-grid px-2 py-1 rounded-md text-xs"
                  >
                    {item} Years
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
