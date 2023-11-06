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
    <nav className="border-b">
      <Container>
        <Flex my="4" px="6" justify="between" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="space-x-6">
            <Flex gap="6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": link.href === currentpath,
                      "text-zinc-500": link.href !== currentpath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Flex>
          </ul>
          <Box>
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2" color="blue">
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
