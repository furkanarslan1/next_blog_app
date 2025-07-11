import { HeaderLink } from "./types";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export const headerLinks: HeaderLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/categories",
    label: "Categories",
  },
];

export const socialLinks: HeaderLink[] = [
  {
    href: "/facebook",
    label: "Facebook",
    icon: <FaFacebook />,
  },
  {
    href: "/instagram",
    label: "Instagram",
    icon: <FaInstagram />,
  },
  {
    href: "/x",
    label: "X",
    icon: <BsTwitterX />,
  },
];
