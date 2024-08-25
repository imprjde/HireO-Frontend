// /* eslint-disable react/prop-types */
// import { Badge } from "./ui/badge";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import { motion } from "framer-motion";
// import { CiLocationOn } from "react-icons/ci";

// const LatestJobCard = ({ job }) => {
//   return (
//     <motion.div
//       key={job._id}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -100 }}
//       transition={{ duration: 0.3, type: "tween" }}
//       className="p-5 rounded-md md:shadow-md md:shadow-stone-500 border border-gray-700  bg-black text-white cursor-pointer"
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-lg  md:my-1">{job?.title}</h1>
//           <h1 className="font-medium  text-[16px]">
//             {job?.company?.name.charAt(0).toUpperCase() +
//               job?.company?.name.slice(1)}
//           </h1>
//         </div>
//         <div>
//           <Avatar>
//             <AvatarImage
//               className="w-12 h-12 rounded-full object-fit"
//               src={job?.company?.logo}
//             />
//           </Avatar>
//         </div>
//       </div>
//       <div className="mt">
//         <p className="text-sm flex items-center space-x-1 text-gray-300 mt-1">
//           <CiLocationOn />
//           <span>
//             {job?.location?.toLowerCase()?.includes("india")
//               ? job?.location
//               : job?.location + ", India"}
//           </span>
//         </p>
//         <p className="text-sm mt-2 truncate text-gray-300">
//           {job?.description}
//         </p>
//       </div>

//       <div className="flex items-center gap-2 mt-4">
//         <Badge
//           className="text-fuchsia-500 border border-fuchsia-400 font-bold"
//           variant="ghost"
//         >
//           {job?.position} Positions
//         </Badge>
//         <Badge
//           className="text-sky-500 border border-sky-400 font-bold"
//           variant="ghost"
//         >
//           {job?.jobType}
//         </Badge>
//         <Badge
//           className="text-purple-500 border border-purple-400 font-bold"
//           variant="ghost"
//         >
//           {job?.salary} LPA
//         </Badge>
//       </div>
//     </motion.div>
//   );
// };

// export default LatestJobCard;




////////////////////// MULTI API CALL BUG FIX //////////////////////////////////////////////////////////////


/* eslint-disable react/prop-types */
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";

const LatestJobCard = ({ job }) => {
  return (
    <motion.div
      key={job._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="p-5 rounded-md md:shadow-md md:shadow-stone-500 border border-gray-700  bg-black text-white cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg  md:my-1">{job?.title}</h1>
          <h1 className="font-medium  text-[16px]">
            {job?.company?.name.charAt(0).toUpperCase() +
              job?.company?.name.slice(1)}
          </h1>
        </div>
        <div>
          <Avatar>
            <AvatarImage
              className="w-12 h-12 rounded-full object-fit"
              src={job?.company?.logo}
            />
          </Avatar>
        </div>
      </div>
      <div className="mt">
        <p className="text-sm flex items-center space-x-1 text-gray-300 mt-1">
          <CiLocationOn />
          <span>
            {job?.location?.toLowerCase()?.includes("india")
              ? job?.location
              : job?.location + ", India"}
          </span>
        </p>
        <p className="text-sm mt-2 truncate text-gray-300">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge
          className="text-fuchsia-500 border border-fuchsia-400 font-bold"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-sky-500 border border-sky-400 font-bold"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-purple-500 border border-purple-400 font-bold"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCard;
