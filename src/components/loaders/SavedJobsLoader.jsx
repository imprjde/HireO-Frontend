export default function SavedJobsLoader() {
  return (
    <div className="bg-gray-950 shadow-md border border-b-0 border-gray-700 shadow-gray-100 space-y-4 mx-4 p-4 rounded-md">
      <div className="flex items-center w-full  m-auto justify-between">
        <div className="flex flex-col space-y-2">
          <span className="flex items-center space-x-1">
            <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-40 h-4 bg-gray-600 rounded animate-pulse"></div>
          </span>
        </div>
        <div className="w-20 h-20 bg-gray-600 rounded animate-pulse"></div>
      </div>
      <div
        id="button"
        className="bg-sky- flex w-full justify-end space-x-6 pr-"
      >
        <div className="w-7 h-4 bg-gray-600 rounded-md animate-pulse"></div>
        <div className="w-7 h-4 bg-gray-600 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
