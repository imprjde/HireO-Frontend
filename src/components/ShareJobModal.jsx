/* eslint-disable react/prop-types */
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast } from "sonner";
import useClickOutside from "@/helpers/useClickOutside";

export default function ShareJobModal({ link, setShowShareModal }) {
  const modalRef = useClickOutside(() => setShowShareModal(false));

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.info("Link Copied to Clipboard !");
    setShowShareModal(false);
  };

  const handlShareToWA = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(url, "_blank");
    setShowShareModal(false);
  };
  const handleShareToIG = () => {
    const url = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
      link
    )}`;
    window.open(url, "_blank");
    setShowShareModal(false);
  };

  const handleShareToX = () => {
    const text = "Check out this New Job Posting on HierO !";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(link)}`;

    window.open(tweetUrl, "_blank");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 p flex overflow-y-auto items-center justify-center bg-white bg-opacity-30"
    >
      <div
        ref={modalRef}
        className="bg-stone-800 text-white p-4  rounded-md shadow-lg"
      >
        <h2 className=" font-semibold mb-3 text-sm">Share</h2>
        <div className="flex  justify-between mb-4 px-6">
          <div className="flex flex-col items-center">
            <span
              onClick={handleShareToX}
              className="bg-sky-500 p-2.5 cursor-pointer rounded-full"
            >
              <FaTwitter size={22} className="text-white text-2xl" />
            </span>
            <span className="text-xs mt-1">Twitter</span>
          </div>
          <div className="flex flex-col items-center">
            <span
              onClick={handlShareToWA}
              className="bg-green-500 p-2.5 cursor-pointer rounded-full"
            >
              <FaWhatsapp size={22} className="text-white text-2xl" />
            </span>
            <span className="text-xs mt-1">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <span
              onClick={handleShareToIG}
              className="bg-rose-500 p-2.5 cursor-pointer rounded-full"
            >
              <AiFillInstagram size={22} className="text-white text-2xl" />
            </span>
            <span className="text-xs mt-1">Instagram</span>
          </div>
        </div>
        <div className="mb-2 pt-2">
          <h2 className=" font-semibold text-sm mb-2">Copy link</h2>

          <div className="flex space-x-2 m-auto items-center">
            <span>
              <input
                value={link && link}
                className="w-[190px] text-sm px-2 text-gray-400 h-8 rounded-sm bg-stone-800 outline-none  border-transparent border border-zinc-700"
              />
            </span>
            <span
              onClick={copyLinkToClipboard}
              className="bg-zinc-700 cursor-pointer px-2 py-2 rounded-md"
            >
              <IoCopy />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
