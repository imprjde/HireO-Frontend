import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ViewNotification() {
  const { notificationDetails } = useSelector((state) => state.notification);

  console.log("INFO FROM VIEWPAGE=", notificationDetails);
  const renderPage = () => {
    return notificationDetails?.type === "accept" ? (
      <div className="flex justify-center mx-4 md:mx-0 items-center min-h-screen bg-black">
        <div
          className="relative flex flex-col bg-stone-900 justify-between overflow-x-hidden max-w-md mx-auto px-4 py-6 rounded-lg shadow-lg"
          style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
        >
          <div
            className="bg-center bg-no-repeat  bg-cover bg-white rounded-xl min-h-80 mb-4"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/sdxl10/d43ae56d-e85c-4795-8246-28a8ec3499a2.png")',
            }}
          ></div>
          <h2 className="text-white md:text-2xl text-lg font-extrabold leading-tight text-center mb-3">
            🎊 Congratulation 🎉
          </h2>
          <h2 className="text-white md:text-2xl text-lg font-semibold leading-tight text-center mb-3">
            Your application for {notificationDetails?.jobTitle} at{" "}
            {notificationDetails?.companyName} has been accepted!
          </h2>
          <p className="text-white text-sm font-normal px-1 md:px-0 text-center leading-normal  mb-3">
            We’ll be in touch via email with details about the upcoming
            interview steps.
          </p>
          <Link to={`/description/${notificationDetails?.jobId}`}>
            {" "}
            <div className="flex justify-center">
              <button className="w-full max-w-md cursor-pointer rounded-lg h-10 px-5 bg-[#1abcd1] text-[#111811] text-base font-bold leading-normal">
                <span className="truncate text-white">View Job</span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    ) : (
      <div className="flex justify-center mx-4 md:mx-0 items-center min-h-screen bg-black">
        <div
          className="relative flex flex-col bg-stone-900 justify-between overflow-x-hidden max-w-md mx-auto px-4 py-6 rounded-lg shadow-lg"
          style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
        >
          <div
            className="bg-center bg-no-repeat  bg-cover bg-white rounded-xl min-h-60 mb-4"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/932e4ade-fb17-4678-a09f-59df0c8b5b93.png")',
            }}
          ></div>
          <h2 className="text-white md:text-xl text-base px-1 font-semibold leading-tight text-left mb-3">
            We&apos;ve reviewed your application
          </h2>
          <h2 className="text-white text-sm font-normal px-1 text-left leading-normal  mb-3">
            Thank you for your interest in the {notificationDetails?.jobTitle},
            New Graduate role at {notificationDetails?.companyName}. We
            appreciate the time and effort you put into your application.
          </h2>
          <p className=" text-sm  text-white font-normal px-1 text-left leading-normal  mb-3">
            We appreciate your interest in {notificationDetails?.companyName}!{" "}
            <br />
            <span className="text-red-600">
              {" "}
              Unfortunately, we cannot move forward with your application at
              this time.
            </span>{" "}
            <br />
            Please consider exploring other opportunities with us. Best of luck!
          </p>
          <Link to="/jobs">
            <div className="flex justify-center">
              <button className="w-full max-w-md cursor-pointer rounded-lg h-10 px-5 bg-[#ac1ad1] text-[#111811] text-base font-bold leading-normal">
                <span className="truncate text-white">Explore Jobs</span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  };
  return <>{renderPage()}</>;
}
