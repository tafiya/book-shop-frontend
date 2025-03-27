import Banner from "@/components/home/Banner";
import BestSeller from "@/components/home/BestSeller";
import BookCategory from "@/components/home/BookCategory";
import ChildCategory from "@/components/home/ChildCategory";
import DiscountBanner from "@/components/home/DiscountBanner";

import Favorite from "@/components/home/Favorite";
import Parallax from "@/components/home/paralax";
import PolicySection from "@/components/home/PolicySection";
import Products from "@/components/home/Products";
import Testimonial from "@/components/home/Testimonial";

const Main = () => {
  return (
    <>
      <Banner></Banner>
      <BookCategory></BookCategory>
      <BestSeller></BestSeller>
      <Favorite></Favorite>
      <Products></Products>
      <Parallax></Parallax>
      <DiscountBanner></DiscountBanner>
      <ChildCategory></ChildCategory>
      <PolicySection></PolicySection>
      <Testimonial></Testimonial>
    </>
  );
};

export default Main;
