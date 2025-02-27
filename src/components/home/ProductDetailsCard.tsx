import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { verifyToken } from "@/utils/VerifyToken";
import { JwtPayload } from "jwt-decode";
import { ShoppingCart, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  role?: string; // Add other necessary properties
}
const ProductDetailsCard = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user: CustomJwtPayload | null = null;

  if (token) {
    user = verifyToken(token) as CustomJwtPayload;
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
  const handleBuyNow = () => {
    if (!user) {
      toast.error("Sign in before purchasing!");
      navigate("/login");
      return;
    }

    if (user?.role !== "User" && user?.role !== "Admin") {
      toast.error("Unauthorized action!");
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
      toast.success("Product added to your cart!");
      navigate("/cart");
    } catch {
      toast.error("Failed to add product to cart!");
    }
  };
  return (
    <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
      <div className="lg:w-1/2">
        {/* <img src={book?.imgURL} alt="" /> */}
        <div
          className="lg:scale-110 h-80 bg-center bg-no-repeat bg-[#d9d9d9] lg:h-full rounded-b-none border lg:rounded-lg"
          style={{
            backgroundImage: `url(${product?.imgURL})`,
          }}
        ></div>
      </div>
      <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
        <h2 className="text-3xl text-gray-800 font-bold">{product?.title}</h2>
        <p className="mt-4 text-gray-600">By: {product?.author}</p>
        <p className="mt-4 text-gray-600">Category: {product?.category}</p>
        <p className="my-4 text-gray-600">{product?.description}</p>
        <hr />
        <p className="mt-4 text-gray-600">{product?.quantity} in Stock</p>
        <p className="mt-4 text-gray-600">${product?.price}</p>
        <div className="mt-8 flex gap-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-[#00a76b] py-2 border border-[#00a76b] font-bold rounded-md shadow hover:scale-105 transition-transform"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 bg-[#00a76b] text-white py-2 rounded-md shadow hover:scale-105 transition-transform"
          >
            <Zap size={18} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
