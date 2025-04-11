"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaQuestion,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

function Navbar() {
  const path = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTextColor =
    theme === "dark" ? "text-indigo-300" : "text-blue-500";
  const hoverTextColor =
    theme === "dark" ? "hover:text-indigo-300" : "hover:text-blue-400";

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <IoHome className="inline-block mr-1 text-lg" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="inline-block mr-1 text-lg" />,
    },
    {
      href: "/questions",
      label: "Questions",
      icon: <FaQuestion className="inline-block mr-1 text-lg" />,
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-secondary w-full shadow-md">
      <div className="flex justify-between items-center px-4 py-3 md:px-8 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-medium tracking-wide">
          {navItems.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <li
                className={`list-none cursor-pointer flex items-center text-sm uppercase tracking-wider transition-colors duration-200 ease-in-out ${
                  path === href
                    ? `${activeTextColor} font-semibold`
                    : theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                } ${hoverTextColor}`}
              >
                {icon}
                {label}
              </li>
            </Link>
          ))}
          <ModeToggle />
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <div className="flex items-center gap-2">
              <FaSignInAlt />
              <SignInButton />
            </div>
            <div className="flex items-center gap-2">
              <FaUserPlus />
              <SignUpButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-secondary px-6 py-4 z-40 border-t">
          <ul className="flex flex-col gap-4">
            {navItems.map(({ href, label, icon }) => (
              <Link href={href} key={href} onClick={closeMenu}>
                <li
                  className={`flex items-center text-sm uppercase tracking-wider ${
                    path === href
                      ? `${activeTextColor} font-semibold`
                      : theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  } ${hoverTextColor}`}
                >
                  {icon}
                  {label}
                </li>
              </Link>
            ))}
            <div className="pt-2">
              <ModeToggle />
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <SignedOut>
                <div className="flex items-center gap-2">
                  <FaSignInAlt />
                  <SignInButton />
                </div>
                <div className="flex items-center gap-2">
                  <FaUserPlus />
                  <SignUpButton />
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
