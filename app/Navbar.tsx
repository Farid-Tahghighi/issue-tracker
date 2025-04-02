"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex justify-between mb-4 flex-row px-5 py-5 border-b">
      <Link href="/">Logo</Link>
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
    </nav>
  );
};

export default Navbar;
