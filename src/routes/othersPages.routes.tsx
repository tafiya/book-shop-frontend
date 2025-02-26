import ProductDetails from "@/components/home/ProductDetails";
import About from "@/pages/About";
import AllBooks from "@/pages/AllBooks";
import Cart from "@/pages/cart/cart";
import Main from "@/pages/Main";
import OrderDetails from "@/pages/Order";
import { Contact } from "lucide-react";
import OrderVerification from "../pages/cart/VerifyOrder";

export const otherPagePaths = [
  {
    name: "Home",
    path: "/",
    element: <Main />,
  },
  {
    name: "About",
    path: "about",
    element: <About />,
  },
  {
    name: "Contact",
    path: "contact",
    element: <Contact />,
  },
  {
    name: "All Books",
    path: "allBooks",
    element: <AllBooks />,
  },
  {
    name: "ProductsDetails",
    path: "product/:id",
    element: <ProductDetails></ProductDetails>,
  },
  {
    name: "",
    path: "orders/verify",
    element: <OrderVerification></OrderVerification>,
  },
  {
    name: "",
    path: "orders",
    element: <OrderDetails></OrderDetails>,
  },
  {
    name: "",
    path: "cart",
    element: <Cart></Cart>,
  },
];
