"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useParams } from "next/navigation";
import { PRODUCTS } from "../../../constants";
import { formatMoney } from "@/lib/format";
import { addCart, getCart, initCart, updateFavorite } from "@/lib/cart";
import Link from "next/link";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("red");
  const [currentProduct, setCurrentProduct] = useState(null);
  const searchParams = useParams(); // 🔹 Usa `useSearchParams`
  const productID = searchParams.id;
  // 🔹 Obtiene el parámetro de la URL

  useEffect(() => {
    if (productID) {
      const product = getCart()?.[productID];
      if (product) {
        setCurrentProduct(product);
      }
    }
  }, [searchParams]);

  const updateCart = (product) => {
    addCart(product);
    const newProduct = getCart()?.[productID];
    setCurrentProduct(newProduct);
  };

  const pressFavorite = (product) => {
    updateFavorite(product);
    const newProduct = getCart()?.[productID];
    setCurrentProduct(newProduct);
  };

  useEffect(() => {
    initCart();
  }, []);

  // Product data (in a real app, this would come from an API or props)
  const product = {
    name: "Premium Comfort Hoodie",
    price: 89.99,
    description:
      "Our Premium Comfort Hoodie is crafted from high-quality cotton blend fabric that's both soft and durable. Features a modern fit, adjustable hood, and convenient front pocket. Perfect for everyday wear or light workouts.",
    rating: 4.7,
    reviewCount: 142,
    colors: [
      { name: "Black", value: "black", hex: "#171717" },
      { name: "White", value: "white", hex: "#f1f1f1" },
    ],
    image: "/placeholder.svg?height=600&width=600",
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {!currentProduct ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold animate-fade-up animate-once">
            Producto no encontrado
          </h1>
          <p className="text-muted-foreground delay-100 animate-fade-up animate-once">
            Lo sentimos, no hemos encontrado el producto que estás buscando.
          </p>
          <Link href="/" className="mt-4">
            <Button variant="outline" size="lg">
              Volver a la página de inicio
            </Button>
          </Link>
        </div>
      ) : (
        <Card className="overflow-hidden h-full">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <Image
                src={currentProduct?.cover?.[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-md object-cover max-h-[500px] w-auto animate-fade animate-once"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl font-bold animate-fade-up animate-once">
                  {currentProduct?.name}
                </h1>
                <div className="flex items-center mt-2 space-x-4 delay-75 animate-fade-up animate-once">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(5)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 delay-75 animate-fade-up animate-once">
                    {"5"} ({currentProduct?.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="text-2xl font-bold delay-75 animate-fade-up animate-once">
                {formatMoney(currentProduct?.price)}
              </div>

              <div className="delay-100 animate-fade-up animate-once">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{currentProduct?.description}</p>
              </div>

              <div className="delay-100 animate-fade-up animate-once">
                <h3 className="text-lg font-medium mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedColor === color.value
                          ? "ring-2 ring-offset-2 ring-primary"
                          : ""
                      }`}
                      aria-label={`Select ${color.name} color`}
                    >
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 delay-150 animate-fade-up animate-once">
                <Button
                  className="flex-1 active:scale-105 py-3"
                  size="lg"
                  onClick={() => updateCart(currentProduct)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al carrito{" "}
                  {currentProduct?.quantity < 1
                    ? ""
                    : "(" + currentProduct?.quantity + ")"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={
                    currentProduct?.isFavorite
                      ? "bg-red-500 text-white active:scale-105"
                      : "active:scale-105"
                  }
                  onClick={() => pressFavorite(currentProduct)}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Agregar a favoritos
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
