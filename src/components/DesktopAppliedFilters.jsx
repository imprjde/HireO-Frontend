/* eslint-disable react/prop-types */
import useClickOutside from "@/helpers/useClickOutside";
import { motion } from "framer-motion";

export default function DesktopAppliedFilters({
  filterObject,
  SetViewFilters,
}) {
  const modalRef = useClickOutside(() => SetViewFilters(false));

  return (
    <div className="hidden md:block">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-40 bg-white cursor-pointer bg-opacity-10"
      ></motion.div>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-2 left-64 min-w-[200px] max-w-[400px] bg-black text-white p-4 rounded-lg shadow-lg space-y-2 z-50"
      >
        {filterObject?.location?.length > 0 && (
          <div className="items-center bg-stone-900 px-3  py-1 rounded-lg text-sm">
            <div className="mb-1">
              <span className="text-sm mb-2 font-light tracking-wider">
                Locations
              </span>
            </div>
            <div className="w-full ">
              {filterObject?.location?.map((item, index) => (
                <span
                  key={index}
                  className="bg-black mx-0.5 my-0.5 w-fit inline-grid px-3 py-0.5 rounded-xl text-xs"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
                </span>
              ))}
            </div>
          </div>
        )}
        {filterObject?.industry?.length > 0 && (
          <div className="items-center bg-stone-900 px-3  py-1 rounded-lg text-sm">
            <div className="mb-1">
              <span className="text-sm mb-2 font-light tracking-wider">
                Industries
              </span>
            </div>
            <div className="w-full ">
              {filterObject?.industry?.map((item, index) => (
                <span
                  key={index}
                  className="bg-black mx-0.5 my-0.5 w-fit inline-grid px-3 py-0.5 rounded-xl text-xs"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
                </span>
              ))}
            </div>
          </div>
        )}

        {filterObject?.experience?.length > 0 && (
          <div className="items-center bg-stone-900 px-3  py-1 rounded-lg text-sm">
            <div className="mb-1">
              <span className="text-sm mb-2 font-light tracking-wider">
                Experience
              </span>
            </div>
            <div className="w-full ">
              {filterObject?.experience?.map((item, index) => (
                <span
                  key={index}
                  className="bg-black mx-0.5 my-0.5 w-fit inline-grid px-3 py-0.5 rounded-xl text-xs"
                >
                  {item} Years
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// import useClickOutside from "@/helpers/useClickOutside";
// import { motion } from "framer-motion";

// // eslint-disable-next-line react/prop-types
// export default function DesktopAppliedFilters({
//   filterObject,
//   SetViewFilters,
// }) {
//   const modalRef = useClickOutside(() => SetViewFilters(false));

//   return (
//     <div className="hidden md:block">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1 }}
//         className="fixed inset-0 z-40 bg-white bg-opacity-10"
//       ></motion.div>
//       <motion.div
//         ref={modalRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1 }}
//         className="fixed top-2 left-64 max-w-[400px] bg-black text-white p-4 rounded-lg shadow-lg space-y-2 z-50"
//       >
//         <h3 className="text-base font-semibold mb-2">Selected Filters:</h3>

//         {filterObject?.location && (
//           <div className="items-center bg-stone-800 px-3  py-1 rounded-lg text-sm">
//             <div className="mb-1">
//               <span className="text-sm mb-2">Selected Locations</span>
//             </div>
//             <div className="  w-full ">
//               {filterObject?.location?.map((item, index) => (
//                 <span
//                   key={index}
//                   className="bg-stone-950 mx-0.5 my-0.5 w-fit inline-grid px-2 py-0.5 rounded-md text-xs"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//         {filterObject?.industry && (
//           <div className="items-center bg-stone-800 px-3  py-1 rounded-lg text-sm">
//             <div className="mb-1">
//               <span className="text-sm mb-2">Selected Locations</span>
//             </div>
//             <div className="  w-full ">
//               {filterObject?.industry?.map((item, index) => (
//                 <span
//                   key={index}
//                   className="bg-stone-950 mx-0.5 my-0.5 w-fit inline-grid px-2 py-0.5 rounded-md text-xs"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
