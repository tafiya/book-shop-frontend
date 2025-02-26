import MyOrders from "@/pages/user/MyOrders";
import UserProfile from "@/pages/user/UserProfile";

export const userPaths = [
  {
    name: "User Profile",
    path: "user-profile",
    element: <UserProfile />,
  },
  {
    name: "My Order",
    path: "myOrder",
    element: <MyOrders />,
  },
];
