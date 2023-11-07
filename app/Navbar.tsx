"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container>
        <Flex my="4" px="6" justify="between" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks />
          <UserDropdown />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];

  const currentpath = usePathname();
  return (
    <ul className="space-x-6">
      <Flex gap="6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentpath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </Flex>
    </ul>
  );
};

const UserDropdown = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2" color="blue">
              {session!.user!.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
