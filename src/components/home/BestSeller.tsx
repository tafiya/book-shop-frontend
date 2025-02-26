import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const products: IProduct[] = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" my-24 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold lg:pb-20 pb-12">
        {" "}
        Best <span className=" text-[#00a76b]">Seller</span> Books
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard key={i} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
