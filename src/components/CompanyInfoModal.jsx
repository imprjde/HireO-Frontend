/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import useClickOutside from "@/helpers/useClickOutside";

export default function CompanyInfoModal({ companyInfo, setShowModal }) {
  const modalRef = useClickOutside(() => setShowModal(false));
  const ensureProtocol = (url) => {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `http://${url}`;
  };

  const websiteUrl = ensureProtocol(companyInfo?.website);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 p flex overflow-y-auto items-center justify-center bg-white bg-opacity-40"
    >
      <div
        ref={modalRef}
        className="relative mx-4 md:mx-0 md:mt-7 md:mb-5 bg-red-5  flex flex-col bg-black dark group/design-root overflow-x-hidden w-full md:max-w-[800px] rounded-xl p-4"
        style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
      >
        <div className="px-4  flex flex-col">
          <div className="b m-auto ml-4 flex w-full justify-end">
            <button onClick={() => setShowModal(false)}>
              <IoClose color="white" size={20} />
            </button>
          </div>
          <div className="flex w-full flex-col gap-4 items-start">
            <div className="flex gap-4 flex-col items-start">
              <img
                src={companyInfo?.logo}
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              />

              <div className="flex flex-col justify-center">
                <p className="text-[#FFFFFF] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  {companyInfo?.name}
                </p>
                <p className="text-[#ABABAB] text-base font-normal leading-normal">
                  {companyInfo?.genre}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#FFFFFF] text-sm text-justify font-normal leading-normal pb-3 pt-1 px-4">
          {companyInfo?.description}
        </p>

        <div className="flex items-center gap-4 bg-black px-4 min-h-[72px] py-2">
          <div className="text-[#FFFFFF] flex items-center justify-center rounded-lg bg-[#292929] shrink-0 size-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#FFFFFF] text-base font-medium leading-normal line-clamp-1">
              Company size
            </p>
            <p className="text-[#ABABAB] text-sm font-normal leading-normal line-clamp-2">
              {companyInfo?.totalEmployees} employees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black px-4 min-h-[72px] py-2">
          <div className="text-[#FFFFFF] flex items-center justify-center rounded-lg bg-[#292929] shrink-0 size-12">
            <IoLocationSharp />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#FFFFFF] text-base font-medium leading-normal line-clamp-1">
              Location
            </p>
            <p className="text-[#ABABAB] text-sm font-normal leading-normal line-clamp-2">
              {companyInfo?.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black px-4 min-h-14 justify-between">
          <p className="text-sky-500 r text-base font-normal leading-normal flex-1 truncate">
            <a href={websiteUrl} target="_blank" className="cursor-pointer">
              Website
            </a>
          </p>
          <div className="shrink-0">
            <div className="text-sky-500 flex size-7 items-center justify-center">
              <a href={websiteUrl} target="_blank" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  className="cursor-pointer"
                  viewBox="0 0 256 256"
                >
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
