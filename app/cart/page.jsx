"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addQuantity, getCart, removeCart, removeQuantity } from "@/lib/cart";
import { formatMoney } from "@/lib/format";

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 2,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState();

  // Calculate subtotal
  const subtotal = cartItems?.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );

  // Calculate tax (assuming 8%)
  const tax = subtotal * 0.16;

  // Calculate total
  const total = subtotal + tax;

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    addQuantity(id);
    setCartItems(getCart());
  };

  // Remove an item from cart
  const removeItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
    removeCart(id);
    setCartItems(getCart());
  };

  const deleteItem = (id) => {
    removeQuantity(id);
    setCartItems(getCart());
  };

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 animate-fade animate-once">Tu Carrito</h1>
      {cartItems?.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">
            Parece que aún no has agregado nada al carrito.
          </p>
          <Button asChild>
            <Link href="/products">Continuar Comprando</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {/* Cart items */}
            {cartItems?.map((item) => item.quantity != 0 ? (
              <Card key={item.id} className="p-4 animate-fade-right animate-once">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item?.cover?.[0] || "/placeholder.svg"}
                      alt={item?.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item?.name}</h3>
                    <p className="text-muted-foreground mb-2">
                      {formatMoney(item?.price)}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            removeItem(item?.id, item?.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Reducir cantidad</span>
                        </Button>
                        <span className="w-8 text-center">{item?.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(item?.id, item?.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => deleteItem(item?.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar artículo</span>
                      </Button>
                    </div>
                  </div>
                  <div className="text-right font-medium sm:min-w-[100px]">
                    ${(item?.price * item?.quantity).toFixed(2)}
                  </div>
                </div>
              </Card>
            ) : null)}
          </div>

          {/* Order summary */}
          <div>
            <Card className="p-6 sticky top-4 animate-fade-left animate-once">
              <h2 className="text-xl font-bold mb-4">Resumen de la Orden</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (16%)</span>
                  <span>${tax?.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total?.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Proceder a la Compra</Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/products">Continuar Comprando</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
