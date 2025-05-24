"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaBugSolid } from "react-icons/lia";

const Navbar = () => {
  return (
    <nav className="mb-4 px-5 py-5 border-b">
      <Container>
        <Flex direction="row" justify="between">
          <Flex direction="row" align="center" gap="3">
            <Link href="/">
              <LiaBugSolid />
            </Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthMenu />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={clsx({
              "nav-link": true,
              "!text-zinc-800": currentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthMenu = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated")
    return <Link className="nav-link" href={"/api/auth/signin"}>Login</Link>;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box asChild className="cursor-pointer">
          <button style={{ all: "unset" }}>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              referrerPolicy="no-referrer"
            />
          </button>
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text>{session!.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item asChild>
          <Link href={"/api/auth/signout"}>Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
