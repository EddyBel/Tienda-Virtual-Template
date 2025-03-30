"use client";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { LOGO, NAME_COMPANY_IMAGE } from "../constants";
import Link from "next/link";

export function Header() {
  return (
    <div className="w-full animate-fade-down">
      {/* Promotional Banner */}
      <div className="bg-black text-white py-2 px-4 text-center text-sm">
        <p>
          NUEVOS PRODUCTOS! Viste nuestros últimos productos y descubre nuevos
          productos!
        </p>
      </div>
      {/* Header/Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container m-auto flex h-16 items-center justify-around w-full">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl"
                >
                  <Image src={LOGO} width={32} height={32} alt="Logo" />
                  {NAME_COMPANY} */}
          {/* </Link> */}
          {/* <Link href="#" className="text-lg font-medium">
                  Women
                </Link>
                <Link href="#" className="text-lg font-medium">
                  Men
                </Link>
                <Link href="#" className="text-lg font-medium">
                  Kids
                </Link>
                <Link href="#" className="text-lg font-medium">
                  Beauty
                </Link>
                <Link href="#" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="#" className="text-lg font-medium">
                  Sale
                </Link> */}
          {/* </nav>
            </SheetContent>
          </Sheet> */}

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl mr-8"
          >
            <Image src={LOGO} width={32} height={32} alt="Logo" />
            <img
              src={NAME_COMPANY_IMAGE}
              className="hidden md:inline-block w-42"
              alt="Logo"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/products"
              className="font-medium transition-colors hover:text-primary"
            >
              Productos
            </Link>
          </nav>

          <div className="flex items-center ml-auto gap-4 pr-4">
            <form className="hidden md:flex relative w-full max-w-sm items-center">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pr-10"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </form>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Link href={"/favorites"}>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favoritos</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
