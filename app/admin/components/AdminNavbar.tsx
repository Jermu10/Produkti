"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";

const AdminNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["drinkit", "arvostelut"];

  return (
    <Navbar
      className="bg-red-200 rounded-b-3xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/admin" size="lg">
            <p>DRINKKILINKKI</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <Link key={index} color="foreground" href={`/admin/${item}`}>
            <NavbarItem key={index}>{item}</NavbarItem>
          </Link>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={`/admin/${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AdminNavbar;
