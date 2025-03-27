import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import ChildCard from "../card design/ChildCard";
import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import Spinner from "../Spinner";

const ChildCategory = () => {
  const { data, isFetching } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const products: IProduct[] =
    data?.data?.filter((product) => product.category === "Children") || [];
  return (
    <div className=" my-24 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold lg:pb-20 pb-12">
        {" "}
        Children <span className=" text-[#00a76b]">Books</span>
      </h1>
      {isFetching && (
        <div className=" flex justify-center items-center">
          <Spinner></Spinner>
        </div>
      )}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
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
          1080: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.title} className="cursor-pointer">
            <ChildCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ChildCategory;
