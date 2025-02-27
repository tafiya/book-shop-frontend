import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import "./Banner.css";

// Import Swiper styles
// import "swiper/css";

// import "swiper/css/effect-cards";
// import "./styles.css";

// import required modules
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Autoplay, EffectCards } from "swiper/modules";
const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] ... lg:h-screen h-[130vh]">
      <div className=" flex lg:flex-row flex-col items-center justify-center md:py-40 py-36 max-w-7xl mx-auto xl:gap-12 gap-8 ">
        {/* text div */}
        <div className=" lg:w-1/2 space-y-6 w-[80%] ">
          <h2 className=" text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-semibold leading-snug text-balance">
            Find Your new Book with best price
          </h2>
          <p className=" pb-6">
            Discover a universe of stories, knowledge, and inspiration. From
            timeless fiction to life-changing self-development, Readscape brings
            you the best books to fuel your imagination and curiosity. Start
            your journey today!
          </p>
          <Link to="allBooks">
            <Button
              variant="outline"
              className=" p-6 bg-[#00a76b] text-white hover:text-[#00a76b] text-lg hover:border-[#00a76b] flex items-center"
            >
              <IoBookOutline className=" text-2xl" />
              See All Books
            </Button>
          </Link>
        </div>
        {/* slider div */}
        <div className=" lg:w-1/2 [70%]flex ">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 2000, // Delay between slides in milliseconds
              disableOnInteraction: false, // Keeps autoplay working after user interaction
            }}
            className="mySwiper xl:w-[340px] xl:h-[420px] w-[180px] h-[320px] drop-shadow-xl shadow-[#00a76b] "
          >
            <SwiperSlide>
              <img src="5am.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src="astrophysic.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="brief.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="carlos.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="malcolmx.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="milk and honey.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="navigating.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="study Quran.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="the sun.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
