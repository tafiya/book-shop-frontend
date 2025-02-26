import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import { useParams } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";

const ProductDetails = () => {
  const { data } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const products: IProduct[] = data?.data || [];
  const { id } = useParams();
  const product = products.filter((product) => product._id === id);

  return (
    <div className="px-2 py-48 w-full flex justify-center">
      {product?.map((details) => {
        return <ProductDetailsCard product={details} key={details._id} />;
      })}
    </div>
  );
};

export default ProductDetails;
