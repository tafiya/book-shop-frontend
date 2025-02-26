import { BookOpenText, PhoneCall, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] h-64 md:h-72 ">
        <div className=" mt-16">
          <h2 className=" text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug text-balance text-center">
            About <span className="text-[#00a76b]">Readscape</span>
          </h2>
        </div>
      </div>
      <div className=" flex items-center flex-col justify-center max-w-[1248px] mx-auto mt-10 ">
        <div className=" text-center mb-16">
          <p className=" text-lg font-medium text-[#1E1E1E80] ">
            At <span className=" text-black">Readscape</span>, we believe that
            books are more than just pages—they are portals to new worlds,
            ideas, and possibilities. Whether you're an avid reader, a knowledge
            seeker, or someone looking for inspiration, we bring you a curated
            collection of books across various genres, from fiction to science,
            self-development to poetry, and beyond.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12 text-center">
          <div className="bg-white p-6 shadow-lg rounded-2xl  bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              📖 Curated Selection
            </h3>
            <p className="text-gray-600">
              We handpick books that inspire and resonate.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-2xl  bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              🚀 Seamless Experience
            </h3>
            <p className="text-gray-600">
              Easy browsing, smooth shopping, and doorstep delivery.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-2xl  bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              💡 For Every Reader
            </h3>
            <p className="text-gray-600">
              From bestsellers to hidden gems, we have something for everyone.
            </p>
          </div>
        </div>

        <div className=" flex flex-wrap gap-6 justify-center items-center my-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-lg">
            <div className="border rounded-full bg-[#00a76b]  p-4 ">
              <BookOpenText color="white" />
            </div>

            <h6 className="text-center font-bold text-[#000000]">
              Large Assortment
            </h6>
            <p className=" text-center text-[#1E1E1E80] font-medium">
              we offer many different types of products <br /> with fewer
              variations in each category.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 text-lg">
            <div className="border rounded-full bg-[#00a76b]   p-4 ">
              <ShoppingCart color="white" />
            </div>

            <h6 className="text-center font-bold text-[#000000]">
              Fast & Free Shipping
            </h6>
            <p className=" text-center text-[#1E1E1E80] font-medium">
              4-day or less delivery time, free shipping <br /> and an expedited
              delivery option.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 text-lg">
            <div className="border rounded-full bg-[#00a76b]   p-4 ">
              <PhoneCall color="white" />
            </div>

            <h6 className="text-center font-bold text-[#000000]">
              24/7 Support
            </h6>
            <p className=" text-center text-[#1E1E1E80] font-medium">
              answers to any business related inquiry <br /> 24/7 and in
              real-time.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-12 mb-12">
          <p className="text-gray-700 text-lg mb-6">
            Join our community of book lovers, share your favorite reads, and
            explore the endless possibilities that literature offers.
          </p>
          <Link to="/allBooks">
            <button className="bg-[#00a76b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
              Explore Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
