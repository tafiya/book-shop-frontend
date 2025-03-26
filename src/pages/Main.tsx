import Banner from "@/components/home/Banner";
import BestSeller from "@/components/home/BestSeller";
import BookCategory from "@/components/home/BookCategory";
import Favorite from "@/components/home/Favorite";
import Parallax from "@/components/home/paralax";
import Products from "@/components/home/Products";
import Testimonial from "@/components/home/Testimonial";

const Main = () => {
  return (
    <>
      <Banner></Banner>
      <BestSeller></BestSeller>
      <BookCategory></BookCategory>
      <Favorite></Favorite>
      <Products></Products>
      <Parallax></Parallax>
      <Testimonial></Testimonial>
    </>
  );
};

export default Main;
