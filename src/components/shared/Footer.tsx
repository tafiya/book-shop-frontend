import clsx from "clsx";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
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
    <footer className="flex flex-col text-black">
      <div className="flex flex-col items-center justify-around gap-5 bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] ... py-8   md:flex-row md:gap-0">
        <Link to={"/"} className="text-4xl font-mono ">
          <img
            src="https://res.cloudinary.com/demnpqwx3/image/upload/v1740581982/ReadScape-logo_yfrzbq.png"
            className="w-20 h-20"
            alt="Logo"
          />
        </Link>
        <div className=" flex items-center gap-8">
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className={clsx(" lg:block font-semibold hover:underline")}
              to={d.link}
            >
              {d.labe}
            </Link>
          ))}
        </div>
        <nav className="text-lg">
          <ul className=" flex h-full items-center justify-center gap-5">
            <li className="cursor-pointer">
              <a href="#">
                <FaFacebook size={"2rem"} />
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="#">
                <FaYoutube size={"2rem"} />
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="#">
                <FaTwitter size={"2rem"} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <aside className="bg-[#00a76b] py-5 text-center text-sm text-white dark:bg-gray-800">
        <p>&copy; 2025 ReadScape. All Rights Reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
