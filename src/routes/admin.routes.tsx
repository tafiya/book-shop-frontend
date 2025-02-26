import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageOrders from "@/pages/admin/ManageOrders";
import ManageProducts from "@/pages/admin/ManageProducts";
import ManageUsers from "@/pages/admin/ManageUsers";
import MyProfile from "@/pages/user/MyProfile";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Management",
    children: [
      {
        name: "Manage Product",
        path: "manage-product",
        element: <ManageProducts />,
      },
      {
        name: "My profile",
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        name: "Manage Orders",
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        name: "Manage Users",
        path: "manage-user",
        element: <ManageUsers />,
      },
    ],
  },
];
