export default function ApplyJobLoader() {
  return (
    <div className="flex z-10 inset-0 pointer-events-none w-screen overflow-hidden fixed h-screen space-x-2 justify-center items-center bg-white bg-opacity-50 dark:invert">
      <div className="h-5 md:h-8 w-5 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-5 md:h-8 w-5 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-5 md:h-8 w-5 md:w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
