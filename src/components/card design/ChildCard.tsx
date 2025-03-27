import { IProduct } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { JwtPayload } from "jwt-decode";
import { verifyToken } from "@/utils/VerifyToken";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ChildCard = ({ product }: { product: IProduct }) => {
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
    <div className="w-[300px] h-[400px] mx-auto relative bg-white rounded-lg shadow-[#00a76b] border border-[#00a76b]">
      <img src={product.imgURL} alt="" />
      <div className="top-5 right-5 absolute">
        <Link to={`/product/${product?._id}`}>
          {" "}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="cursor-pointer"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="19.5"
              fill="white"
              stroke="#F2F2F2"
            ></circle>
            <path
              d="M20 13.541C13.75 13.541 11.25 20.0001 11.25 20.0001C11.25 20.0001 13.75 26.4577 20 26.4577C26.25 26.4577 28.75 20.0001 28.75 20.0001C28.75 20.0001 26.25 13.541 20 13.541V13.541Z"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M20 23.125C20.8288 23.125 21.6237 22.7958 22.2097 22.2097C22.7958 21.6237 23.125 20.8288 23.125 20C23.125 19.1712 22.7958 18.3763 22.2097 17.7903C21.6237 17.2042 20.8288 16.875 20 16.875C19.1712 16.875 18.3763 17.2042 17.7903 17.7903C17.2042 18.3763 16.875 19.1712 16.875 20C16.875 20.8288 17.2042 21.6237 17.7903 22.2097C18.3763 22.7958 19.1712 23.125 20 23.125V23.125Z"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="p-4 relative flex-col justify-start items-start flex">
        <h3 className="text-[#00a76b] font-semibold text-lg leading-tight line-clamp-1">
          {product.title}
        </h3>
        <div className=" flex justify-between mt-2 items-center w-full">
          <span className="mb-[6px] text-[#191919] text-base font-medium ">
            $14.99
          </span>
          <button
            onClick={() => handleAddToCart()}
            className=" border rounded-full p-2 bg-[#00a76b] hover:[#00a76b"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
