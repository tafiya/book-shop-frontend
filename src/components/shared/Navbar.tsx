import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/product";
import clsx from "clsx";
import { LogIn, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetAllUsersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const users = data?.data || [];
  const userInfo = users.find(
    (customer: TUser) => customer.email == user?.email
  );
  const cartData = useAppSelector((state) => state.cart);

  const navlinks = [
    {
      labe: "Home",
      link: "/",
    },
    {
      labe: "All Books",
      link: "/allBooks",
    },
    {
      labe: "About",
      link: "/about",
    },
    {
      labe: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div
      className={clsx(
        "fixed z-10 w-full items-center transition-all",
        scrolling && "bg-[#ecefec]"
      )}
    >
      <nav className="flex justify-between px-8 items-center py-4  text-black max-w-7xl mx-auto ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            {/* logo */}
            <Link to={"/"} className="text-4xl font-mono">
              <img src="ReadScape-logo.png" className="w-14 h-14" alt="" />
            </Link>
          </section>
        </div>
        <div className=" flex items-center gap-8">
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className={clsx(
                "hidden lg:block font-semibold hover:underline",
                location.pathname === d.link
                  ? "text-[#00a76b] underline"
                  : "hover:text-[#00a76b]"
              )}
              to={d.link}
            >
              {d.labe}
            </Link>
          ))}
        </div>

        {/* sidebar mobile menu */}
        <div
          className={clsx(
            " fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {navlinks.map((d, i) => (
              <Link
                key={i}
                onClick={() => setMenu(false)}
                className="font-bold"
                to={d.link}
              >
                {d.labe}
              </Link>
            ))}
          </section>
        </div>

        {/* last section */}
        <section className="flex items-center gap-4">
          {/* cart icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartData.totalQuantity}
            </span>
          </Link>
          {/* <CartSheet></CartSheet> */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <img
                  src={userInfo?.userImg}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.role}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" uppercase text-lg">
                  {userInfo?.name}
                </DropdownMenuItem>
                {user.role == "Admin" ? (
                  <DropdownMenuItem>
                    <Link to="/admin">DashBoard</Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    {" "}
                    <Link to="/user/myProfile">My Profile</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={() => dispatch(logout())}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="bg-[#00a76b] text-white hover:text-[#00a76b] text-lg hover:border-[#00a76b] flex items-center gap-2 "
              >
                <LogIn />
                Login
              </Button>
            </Link>
          )}

          {/* avtar img */}
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
