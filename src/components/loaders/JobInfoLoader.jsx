export default function JobInfoLoader() {
  return (
    <div>
      <div className="relative flex size-full min-h-screen flex-col bg-black dark justify-between group/design-root overflow-x-hidden">
        <div className="flex m-aut items-center  p-4 pb-2 justify-between">
          <div className="h-8 bg-gray-500 animate-pulse rounded-lg w-1/2 md:w-1/3"></div>
          <div className="flex w-12 items-center justify-end">
            <div className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-gray-700"></div>
          </div>
        </div>

        <div className="flex border-[3px] border-x-0 border-t-0 border-b-[#303030] w-full p-4 0 m-auto justify-center">
          <div className="flex w-full m-auto justify-center flex-col gap-4">
            <div className="flex gap-4 flex-col w-full m-auto justify-center text-center">
              <div className="bg-gray-500 animate-pulse m-auto aspect-square bg-cover rounded-full min-h-32 w-32"></div>
              <div className="flex flex-col justify-center text-center w-fit m-auto">
                <div className="h- bg-gray-600 animate-pulse rounded-lg w-1/2 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-600 animate-pulse rounded-lg w-3/4 mx-auto mb-1"></div>
                <div className="h-4 bg-gray-600 animate-pulse rounded-lg w-1/2 mx-auto"></div>
              </div>
            </div>
            <div className="text-gray-400 mb-2 animate-pulse flex bg-gray-500 rounded-3xl w-fit m-auto items-center space-x-2 h-10 px-28">
              <div className="h-5 bg-gray-500  rounded-lg w-1/2 md:w-1/3"></div>
            </div>
          </div>
        </div>

        <h2 className="text-gray-600 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          <div className="h-7 bg-gray-600 rounded-md w-1/4"></div>
        </h2>
        <div className="py-4 px-4 md:px-10 grid md:grid-cols-[20%_1fr] gap-x-6 ">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="col-span-2 grid grid-cols-subgrid border-t border-t-[#303030] py-3"
            >
              <div className="h-7 bg-gray-600 animate-pulse rounded-md w-1/2 mb-2"></div>
              <div className="h-7 bg-gray-600 animate-pulse rounded-md w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
