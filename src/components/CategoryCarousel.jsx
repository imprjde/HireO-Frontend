// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Button } from "./ui/button";
// import { useDispatch } from "react-redux";
// import { setSearchText } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// const category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Engineer",
//   "Data Science",
//   "Graphic Designer",
//   "UI Developer",
//   "Wordpress Developer",
//   "Frontend Developer",
// ];

// export function CategoryCarousel() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [emblaRef] = useEmblaCarousel({ loop: true }, [
//     Autoplay({ delay: 500 }),
//   ]);
//   return (
//     <div className="flex justify-center mx-14 my-20">
//       <Carousel
//         // plugins={[
//         //   Autoplay({
//         //     delay: 500,
//         //     // breakpoints: false,
//         //     // playOnInit: false,
//         //   }),
//         // ]}
//         ref={emblaRef}
//         className="w-full max-w-xl "
//       >
//         <CarouselContent className="flex justify-center">
//           {category.map((item, index) => (
//             <CarouselItem
//               key={index}
//               className="flex m-auto justify-center basis-1/2 md:basis-1/2 lg:basis-1/3"
//             >
//               <div className="p-1">
//                 <Button
//                   onClick={() => {
//                     dispatch(setSearchText(item));
//                     console.log(item);
//                     navigate("/browse");
//                   }}
//                   variant="outline"
//                   className="rounded-full text-center"
//                 >
//                   {item}
//                 </Button>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// }

////////////////SEARCH FEATURE/////////////////////////////

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
];

export function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText } = useSelector((store) => store.job);
  console.log("searchText from carousel=", searchText);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 500 }),
  ]);

  return (
    <div className="flex justify-center mx-14 my-20">
      <Carousel
        // plugins={[
        //   Autoplay({
        //     delay: 500,
        //     // breakpoints: false,
        //     // playOnInit: false,
        //   }),
        // ]}
        ref={emblaRef}
        className="w-full max-w-xl "
      >
        <CarouselContent className="flex justify-center">
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex m-auto justify-center basis-1/2 md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <Button
                  // onClick={() => {
                  //   dispatch(setSearchText(item));
                  //   console.log(item);
                  // }}

                  onClick={() => {
                    dispatch(setSearchText(item));
                    navigate("/browse");
                  }}
                  variant="outline"
                  className="rounded-full text-center"
                >
                  {item}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
