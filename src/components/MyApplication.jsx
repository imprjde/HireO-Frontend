import Navbar from "./shared/Navbar";
import ApplicationTable from "./ApplicationTable";

const MyApplication = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold my-5">Total Applied Jobs</h1>
        <ApplicationTable />
      </div>
    </>
  );
};

export default MyApplication;
