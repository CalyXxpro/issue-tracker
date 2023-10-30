"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];

  const currentpath = usePathname();
  console.log(currentpath);

  return (
    <nav className="flex space-x-6 px-6 border-b h-16 items-center">
      <ul className="flex space-x-6">
        <Link className="pt-1.5" href="/">
          <AiFillBug />
        </Link>
        {links.map((link) => (
          <Link
            className={classnames({
              "text-zinc-900": link.href === currentpath,
              "text-zinc-500": link.href !== currentpath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
