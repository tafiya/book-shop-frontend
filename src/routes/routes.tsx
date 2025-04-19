import ProductDetails from "@/components/home/ProductDetails";
import About from "@/pages/About";
import AdminDashboard from "@/pages/admin/AdminDashboard";

import AllProduct from "@/pages/AllBooks";
import Cart from "@/pages/cart/cart";
import OrderVerification from "@/pages/cart/VerifyOrder";
import ErrorPage from "@/pages/ErrorPage";
import Main from "@/pages/Main";
import OrderDetails from "@/pages/Order";
import MyOrders from "@/pages/user/MyOrders";
import MyProfile from "@/pages/user/MyProfile";
import UserProfile from "@/pages/user/UserProfile";
import { routeGenerator } from "@/utils/routeGenerator";

import Contact from "@/pages/Contact";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "allBooks",
        element: <AllProduct />,
      },
      {
        path: "product/:id",
        element: (
         
            <ProductDetails></ProductDetails>
     
        ),
      },
      {
        path: "orders/verify",
        element: (
          <ProtectedRoute role="User">
            <OrderVerification></OrderVerification>
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute role="User">
            <OrderDetails></OrderDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute role={["Admin", "User"]}>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="Admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="User">
        <UserProfile />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "myOrder",
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
