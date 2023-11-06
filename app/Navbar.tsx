"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];

  const currentpath = usePathname();

  const { status, data: session } = useSession();

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
      <Box>
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
