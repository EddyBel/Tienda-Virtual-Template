"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ArrowBigRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getFavorites, updateFavorite } from "@/lib/cart";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState();

  const removeFromFavorites = (product) => {
    updateFavorite(product);
    const newFavorites = getFavorites();
    setFavorites(newFavorites);
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold animate-fade-up">Mis Favoritos</h1>
        <span className="text-muted-foreground animate-fade-up">
          {favorites?.length} Productos
        </span>
      </div>
      {favorites?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2 animate-fade-up">
            Tu Lista de Favoritos está vacía
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md delay-100 animate-fade-up">
            Continúa comprando productos para agregarlos a tu lista de
            favoritos.
          </p>
          <Button asChild className="delay-150 animate-fade-up">
            <Link href="/products">Continuar Comprando</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {favorites?.map((product) => (
            <Card key={product.id} className="overflow-hidden group animate-fade-up">
              <div className="relative aspect-square">
                <Image
                  src={product?.cover?.[0] || "/placeholder.svg"}
                  alt={product?.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromFavorites(product)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Elimina de favoritos</span>
                </Button>
              </div>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground mb-1">
                  {product?.category?.join(", ")}
                </div>
                <h3 className="font-medium text-lg mb-2 line-clamp-1">
                  {product?.name}
                </h3>
                <div className="font-semibold">
                  ${product?.price.toFixed(2)}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full active:scale-105" variant="outline">
                    Ir al producto
                    <ArrowBigRight className="mr-2 h-6 w-6" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
