import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "Religious",
    count: 80,
    image: "religius book.jpg",
  },
  {
    id: 2,
    title: "SelfDevelopment",
    count: 6,
    image: "self development.jpg",
  },
  {
    id: 3,
    title: "Fiction",
    count: 5,
    image: "fiction.jpg",
  },
  {
    id: 4,
    title: "Science",
    count: 7,
    image: "science.jpg",
  },
  {
    id: 5,
    title: "Poetry",
    count: 4,
    image: "poetry.jpg",
  },
  {
    id: 5,
    title: "Adventure",
    count: 4,
    image: "adventure.jpg",
  },
  {
    id: 6,
    title: "Children",
    count: 4,
    image: "child.jpg",
  },
];

const BookCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/allBooks?category=${encodeURIComponent(category)}`);
  };
  return (
    <div className="w-full py-10 bg-[#00a76b] ">
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold pb-10 ">
        {" "}
        Top <span className=" text-[#ecefec]">Categories</span> Book
      </h1>
      <div className="relative max-w-7xl mx-auto rounded-lg border bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] ... border-white  shadow-xl py-12 px-12 mb-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".custom-prev-button",
            prevEl: ".custom-next-button",
          }}
          loop={true}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            873: { slidesPerView: 3 },
            1080: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {books.map((book) => (
            <SwiperSlide
              key={book.id}
              className="cursor-pointer"
              onClick={() => handleCategoryClick(book.title)}
            >
              <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
                <div className="relative w-52 h-52 mb-4 flex items-center justify-center">
                  <motion.div
                    className="absolute w-full h-full border-2 border-dashed border-[#00a76b] rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear",
                    }}
                  />
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg text-[#00a76b] font-semibold">
                  {book.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="absolute bg-[#00a76b] custom-next-button left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full">
          <ArrowLeft color="white" />
        </button>
        <button className=" bg-[#00a76b]  absolute custom-prev-button right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full">
          <ArrowRight color="white" />
        </button>
      </div>
    </div>
  );
};

export default BookCategory;
