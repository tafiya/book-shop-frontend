import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import {
  House,
  LayoutDashboard,
  ListOrderedIcon,
  LogOut,
  UserRoundPen,
  X,
} from "lucide-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <>
        {/* Overlay for small screens */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 left-0 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-50
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
        >
          {/* Sidebar Header */}
          <div className="py-8 text-lg font-bold border-b border-gray-700 flex md:justify-center justify-between items-center px-6">
            <div className=" flex items-center gap-2">
              <LayoutDashboard />
              <h2 className=" text-2xl font-bold">Dashboard</h2>
            </div>

            {/* Close button on small screens */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-10">
            <ul className="">
              <Link to="/user/myProfile">
                <li className="p-4 m-4 flex items-center justify-center gap-2 hover:bg-gray-700 border-y border-gray-600 transition-colors">
                  <UserRoundPen />
                  My Profile
                </li>
              </Link>

              <Link to="/user/myOrder">
                <li className="p-4 m-4 flex items-center justify-center gap-2 hover:bg-gray-700 border-y border-gray-600 transition-colors">
                  <ListOrderedIcon />
                  My Orders
                </li>
              </Link>
              <hr className=" my-6" />

              <Link to="/admin/manage-product">
                <li className="p-4 flex items-center justify-center gap-2 hover:bg-gray-700  border-gray-600 transition-colors">
                  <LogOut />
                  Logout
                </li>
              </Link>

              <Link to="/">
                <li className="p-4 flex items-center justify-center gap-2 hover:bg-gray-700  border-gray-600 transition-colors">
                  <House />
                  Home
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        {/* Toggle Button (Only visible on small screens) */}
        {!isOpen && (
          <button
            className="fixed top-5 left-5 p-2 bg-black text-white rounded-md md:hidden z-50"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        )}
      </>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <header className="bg-white shadow-md py-4 px-10 flex items-center justify-between">
          <div className=" w-1/2 flex justify-end">
            <Link to={"/"} className="text-4xl font-mono ">
              <img
                src="https://res.cloudinary.com/demnpqwx3/image/upload/v1740581982/ReadScape-logo_yfrzbq.png"
                className="w-16 h-16"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <img
                  src="https://res.cloudinary.com/demnpqwx3/image/upload/v1740582387/user_aswdqm.png"
                  className="w-10 h-10"
                  alt=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" ">
                <DropdownMenuLabel>{user?.role}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet></Outlet>
        </main>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserProfile;
