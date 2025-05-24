"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaBugSolid } from "react-icons/lia";

const Navbar = () => {
  const { status } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="mb-4 px-5 py-5 border-b">
      <Container>
        <Flex direction="row" justify="between">
          <Flex direction="row" align="center" gap="3">
            <Link href="/"><LiaBugSolid /></Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={clsx("hover:text-zinc-800 transition-colors", {
                      "text-zinc-800": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href={"/api/auth/signout"}>Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
