import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import { ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const products: IProduct[] = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" my-20 max-w-7xl mx-auto ">
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold lg:pb-20 pb-12">
        {" "}
        Features <span className=" text-[#00a76b]">Books</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        {products.slice(-8).map((product, i) => (
          <ProductCard key={i} product={product}></ProductCard>
        ))}
      </div>
      <div className=" flex justify-center pt-12">
        <Link to="/products"></Link>
        <Button
          variant="outline"
          className=" py-2  bg-[#00a76b] text-white hover:text-[#00a76b] text-base hover:border-[#00a76b] flex items-center"
        >
          <ReceiptText />
          View All Books
        </Button>
      </div>
    </div>
  );
};

export default Products;
