/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import "./Carousel.css";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "FullStack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Cloud Engineer",
];

export default function Carousel({ setProgress }) {
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
  };
  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
  };

  return (
    <div className="flex w-screen overflow-x-hidden items-center  justify-center ">
      {/* For Desktop Screen */}
      <div className="hidden md:flex w-[80%]  bg-red-5 md:w-[45%]  flex-col m-auto justify-center">
        <Slider {...desktopSettings} className="flex flex-row   justify-center">
          {" "}
          {categories.map((category, i) => (
            <div key={i} className="space-x-3">
              <CarouselItem
                key={i}
                category={category}
                setProgress={setProgress}
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* For Mobile Screen */}
      <div className=" md:hidden w-[80%]  bg-red-5 md:w-[45%]  flex-col m-auto justify-center">
        <Slider {...mobileSettings} className="flex flex-row   justify-center">
          {" "}
          {categories.map((category, i) => (
            <div key={i} className="space-x-3">
              <CarouselItem
                key={i}
                category={category}
                setProgress={setProgress}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
