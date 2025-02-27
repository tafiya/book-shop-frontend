import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import { ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data, isFetching } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const products: IProduct[] = data?.data || [];

  // if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" my-20 max-w-7xl mx-auto ">
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold lg:pb-20 pb-12">
        {" "}
        Features <span className=" text-[#00a76b]">Books</span>
      </h1>
      {isFetching && (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-12">
        {products.slice(-8).map((product, i) => (
          <ProductCard key={i} product={product}></ProductCard>
        ))}
      </div>
      <div className=" flex justify-center pt-12">
        <Link to="/allBooks">
          <Button
            variant="outline"
            className=" py-2  bg-[#00a76b] text-white hover:text-[#00a76b] text-base hover:border-[#00a76b] flex items-center"
          >
            <ReceiptText />
            View All Books
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
