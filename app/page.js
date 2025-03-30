"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { BANNER_HOME, LOGO, NAME_COMPANY_IMAGE, PRODUCTS } from "../constants";
import { formatMoney } from "../lib/format";
import { initCart } from "@/lib/cart";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    initCart();
  }, []);
  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative h-[500px] w-full overflow-hidden">
            <Image
              src={BANNER_HOME}
              alt="Summer Collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white p-6 max-w-xl">
                <Image
                  src={LOGO}
                  alt={"logo pagina"}
                  width={70}
                  height={70}
                  className="m-auto"
                />
                <h1 className="text-4xl font-bold mb-4 animate-wiggle">CRAZY SHIRTS UMB</h1>
                <p className="text-lg mb-6">Vistiendo Universitarios</p>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Comprar Ahora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 bg-muted/30 px-3">
          <div className="container m-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Nuevos Productos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((item, index) => (
                <Link
                  href={`/products/${index}`}
                  key={item.name}
                  className="group animate-fade-up"
                  // onClick={() => handleProductClick(item)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-2">
                    <Image
                      src={item.cover[0]}
                      alt={`Product ${item.name}`}
                      fill
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8"
                    >
                      <Heart className="h-4 w-4" />
                      {/* <span className="sr-only">Añadir al carrito</span> */}
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">
                          {formatMoney(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
}
