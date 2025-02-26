import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Favorite = () => {
  return (
    <div className="bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] ...">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-12 items-center">
          {/* Books Grid */}
          <div className="  md:w-[80%]">
            <div className="grid grid-cols-2 gap-4 ">
              <img
                src="milk and honey.jpg"
                alt="Book 1"
                className="shadow-lg rounded-lg w-40 h-52"
              />
              <img
                src="navigating.jpg"
                alt="Book 2"
                className="shadow-lg rounded-lg w-40 h-52"
              />
              <img
                src="atomic.jpg"
                alt="Book 3"
                className="shadow-lg rounded-lg w-40 h-52"
              />
              <img
                src="carlos.jpg"
                alt="Book 4"
                className="shadow-lg rounded-lg w-40 h-52"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="">
            <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold pb-4">
              Find<span className=" text-[#00a76b]"> Your</span> Favorite{" "}
              <span className=" text-[#00a76b]"> Books</span> Here
            </h2>
            <p className="text-gray-600 mb-6">
              Zenbook regularly publishes fascinating features about a huge
              variety of bookish subjects, publishers, and interesting
              characters in literature and notable anniversaries.
            </p>
            <div className="flex space-x-8 mb-6">
              <div>
                <p className="text-2xl font-bold">80</p>
                <p className="text-gray-500">Books Best Seller</p>
              </div>
              <div>
                <p className="text-2xl font-bold">60</p>
                <p className="text-gray-500">Books For Coming</p>
              </div>
              <div>
                <p className="text-2xl font-bold">150</p>
                <p className="text-gray-500">Books Total Products</p>
              </div>
            </div>
            <Link to="allBooks">
              <Button
                variant="outline"
                className=" p-5 bg-[#00a76b] text-white hover:text-[#00a76b] text-lg hover:border-[#00a76b] flex items-center"
              >
                Learn More →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Favorite;
