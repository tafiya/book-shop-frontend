import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { verifyToken } from "@/utils/VerifyToken";
import { JwtPayload } from "jwt-decode";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ProductCard = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user: JwtPayload | null = null;
  if (token) {
    user = verifyToken(token);
  }
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Sign in before adding to cart!");
      navigate("/login");
      return;
    }
    try {
      dispatch(
        addToCart({
          product: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
          stock: product.quantity,
          imageUrl: product.imgURL as string,
        })
      );
      toast.success("Book added to your cart!");
    } catch {
      toast.error("Failed to add product to cart!");
    }
  };
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2  group">
      <div className="relative">
        <img
          className="h-80 w-full object-cover object-end"
          src={product.imgURL}
          alt="Home in Countryside"
        />
        {/* Eye Icon on Image */}
        <Link
          to={`/product/${product?._id}`}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/40 p-2 w-full shadow-md 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center"
        >
          <FaEye size={"2rem"} color="red" className="text-gray-700" />
        </Link>
      </div>

      <div className="p-6">
        <div className="flex items-baseline">
          <span className="inline-block border-[#00a76b] border text-[#00a76b] py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            {product.category}
          </span>
          {/* <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
            3 beds &bull; 2 baths
          </div> */}
        </div>
        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
          {product.title}
        </h4>
        <div className="mt-1 truncate">
          <span>{product.author}</span>
        </div>
        <div className="pt-6 flex justify-between">
          <Button
            onClick={() => handleAddToCart()}
            variant="outline"
            className=" py-2  bg-[#00a76b] text-white hover:text-[#00a76b] text-base hover:border-[#00a76b] flex items-center"
          >
            {" "}
            <ShoppingCart />
            Add to cart
          </Button>
          <p className=" text-red-600 font-semibold">TK{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
