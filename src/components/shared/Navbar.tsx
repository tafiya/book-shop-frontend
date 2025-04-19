import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/product";
import clsx from "clsx";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  DollarSign,
  FileText,
  HelpCircle,
  LogIn,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import toast from "react-hot-toast";
const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const navigate = useNavigate();
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
  const menuData = [
    { name: "Home", href: "/" },
    {
      name: "Categories",
      isMegaMenu: true,
      subMenu: [
        {
          title: "Get Started",
          links: [
            { name: "About Company", href: "/about", icon: BookOpen },
            { name: "Our Pricing", href: "/pricing", icon: DollarSign },
            { name: "Read Blog", href: "/blog", icon: FileText },
          ],
        },
        {
          title: "Support",
          links: [
            { name: "Help Center", href: "/help", icon: HelpCircle },
            { name: "Documentation", href: "/docs", icon: FileText },
            { name: "Manage Accounts", href: "/account", icon: User },
          ],
        },
      ],
    },
    { name: "All Books", href: "/allBooks" },
    { name: "About", href: "/about" },

    { name: "Contact", href: "/contact" },
  ];
  const handleSearch = () => {
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      navigate(`/allBooks?search=${encodeURIComponent(trimmedSearch)}`);
      setSearchTerm("");
    } else {
      toast.error("Please type for search");
      // router.push(`/tutors`); // Redirect to tutors page without query params
    }
  };
  return (
    <div
      className={clsx(
        "fixed z-10 w-full items-center transition-all",
        scrolling && "bg-[#ecefec]"
      )}
    >
      <nav className="flex flex-col items-center px-8 xl:px-0 justify-center pt-4 pb-4 text-black max-w-7xl mx-auto gap-4">
        <div className="flex justify-between  items-center  w-full mx-auto  ">
          <div className="flex items-center gap-8 flex-1">
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
          <div
            className="relative w-96 flex-1 hidden md:flex p-1 sm:border sm:border-[#00a76b] group sm:rounded-xl 
          sm:focus-within:ring-1 sm:focus-within:ring-[#00a76b] sm:focus-within:border-[#00a76b]"
          >
            <input
              type="name"
              name=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Book"
              className="block w-full text-gray-900 placeholder-gray-600 text-sm bg-transparent border border-[#00a76b] outline-none
               focus:border-[#00a76b] py-1  px-4 focus:ring-1 focus:ring-[#00a76b] rounded-lg sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
            />
            <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center ">
              <button
                onClick={handleSearch}
                type="submit"
                className="inline-flex px-4 py-2.5 text-sm  text-white transition-all duration-200 bg-[#00a76b] rounded-lg focus:outline-none"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* sidebar mobile menu */}
          <div
            className={clsx(
              " fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
              isSideMenuOpen && "translate-x-0"
            )}
          >
            <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen py-8 px-10 gap-8 z-50 md:w-[50%] w-[70%] flex  ">
              <div className=" flex items-end justify-end">
                <IoCloseOutline
                  size={50}
                  onClick={() => setMenu(false)}
                  className=" text-3xl cursor-pointer"
                />
              </div>
              <div
                className="relative w-full flex flex-wrap items-center gap-2 p-1 border
               border-[#00a76b] rounded-xl focus-within:ring-1 focus-within:ring-[#00a76b]
                focus-within:border-[#00a76b] sm:flex-nowrap sm:border sm:p-2"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Book"
                  className="flex-1 w-full text-gray-900 placeholder-gray-600 text-sm bg-transparent border-none outline-none py-2 px-4 focus:ring-1 focus:ring-[#00a76b] rounded-lg sm:focus:ring-0"
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 text-sm text-white bg-[#00a76b] rounded-lg transition-all duration-200 focus:outline-none"
                >
                  <Search size={20} />
                </button>
              </div>
              <ScrollArea className="h-96 w-full text-[#00a76b]  rounded-lg bg-[#ecefec] py-2 pl-2">
                {menuData.map((menu, i) => (
                  <div key={i} className=" mb-5">
                    {menu.isMegaMenu ? (
                      <>
                        <button
                          onClick={() => setMegaMenuOpen(!isMegaMenuOpen)}
                          className="flex items-center gap-1 font-bold w-full text-left"
                        >
                          {menu.name}{" "}
                          {isMegaMenuOpen ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        {isMegaMenuOpen && (
                          <div className="ml-4 mt-2 space-y-5">
                            {menu.subMenu.map((section, index) => (
                              <div key={index}>
                                <h3 className="font-semibold">
                                  {section.title}
                                </h3>
                                {section.links.map((link, idx) => (
                                  <Link
                                    key={idx}
                                    to={link.href}
                                    className="block text-sm p-2 hover:bg-gray-100 rounded"
                                  >
                                    {link.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        onClick={() => setMenu(false)}
                        className="font-bold block hover:bg-gray-100 p-1"
                        to={menu.href ?? ""}
                      >
                        {menu.name}
                      </Link>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-3">
                {user ? (
                  <div className=" flex">
                    <img
                      src={userInfo?.userImg}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <h2>{userInfo?.name}</h2>
                  </div>
                ) : (
                  <div className=" flex flex-col gap-3">
                    {" "}
                    <Link to={"/login"} className="">
                      <Button
                        variant="outline"
                        className="hover:bg-[#00a76b] w-full hover:text-white text-[#00a76b] border-[#00a76b] flex items-center gap-2 "
                      >
                        <LogIn />
                        Login
                      </Button>
                    </Link>
                    <Link to={"/register"}>
                      <Button
                        variant="outline"
                        className="bg-[#00a76b] text-white w-full hover:text-[#00a76b] hover:border-[#00a76b] flex items-center gap-2 "
                      >
                        <LogIn />
                        SignUp
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* last section */}
          <section className="flex flex-1 items-center justify-end gap-4">
            {/* cart icon */}
            <div>
              <Link to="/cart" className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartData.totalQuantity}
                </span>
              </Link>
            </div>

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
                      <Link to="/admin/myProfile">DashBoard</Link>
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
              <div className=" flex gap-2">
                <Link to={"/login"} className="md:flex hidden">
                  <Button
                    variant="outline"
                    className="hover:bg-[#00a76b] hover:text-white text-[#00a76b] border-[#00a76b] flex items-center gap-2 "
                  >
                    <LogIn />
                    Login
                  </Button>
                </Link>
                <Link to={"/register"} className="">
                  <Button
                    variant="outline"
                    className="bg-[#00a76b] text-white hover:text-[#00a76b] hover:border-[#00a76b] flex items-center gap-2 "
                  >
                    <LogIn />
                    SignUp
                  </Button>
                </Link>
              </div>
            )}

            {/* avtar img */}
          </section>
        </div>
        {/* desktop Menu */}
        <div className=" lg:flex hidden items-center gap-8 ">
          {menuData.map((menu, i) =>
            menu.isMegaMenu ? (
              <div
                key={i}
                className="relative group flex  cursor-pointer flex-col"
              >
                <button
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="flex items-center gap-1 font-semibold hover:text-[#00a76b]"
                >
                  {menu.name}{" "}
                  {isMegaMenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {/* <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-[#00a76b] transition-all duration-300 group-hover:w-full"></span> */}

                {isMegaMenuOpen && (
                  <div
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                    className="absolute left-0 top-full bg-white w-[650px] shadow-md rounded-md p-4 flex gap-6"
                  >
                    <div className="grid gap-5 lg:grid-cols-3">
                      {menu.subMenu.map((section, index) => (
                        <div key={index}>
                          <h3 className="mb-3 text-sm font-semibold text-dark dark:text-white">
                            {section.title}
                          </h3>
                          <div className="space-y-2">
                            {section.links.map((link, idx) => (
                              <Link
                                key={idx}
                                to={link.href}
                                className="flex items-center gap-2 text-sm p-2 hover:bg-blue-100 rounded"
                              >
                                <link.icon size={16} />
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <img src="megaMenu.png" className="" alt="" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                className={clsx(
                  "font-semibold",
                  location.pathname === menu.href
                    ? "text-[#00a76b] underline"
                    : "group flex  cursor-pointer flex-col hover:text-[#00a76b]"
                )}
                to={menu.href ?? ""}
              >
                {menu.name}
                <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-[#00a76b] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
