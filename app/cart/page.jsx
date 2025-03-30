"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCheckIcon,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

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
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems?.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );

  // Calcular impuesto (16%)
  const tax = subtotal * 0.16;

  // Calcular total
  const total = subtotal + tax;

  // Actualizar cantidad de un artículo
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    addQuantity(id);
    setCartItems(getCart());
  };

  // Eliminar artículo del carrito (vacía el artículo)
  const removeItem = (id) => {
    removeCart(id);
    setCartItems(getCart());
  };

  // Reducir la cantidad de un artículo
  const deleteItem = (id) => {
    removeQuantity(id);
    setCartItems(getCart());
  };

  // Verifica si aún hay artículos en el carrito
  const checkNumerCartArticles = () => {
    const newCartsItems = cartItems?.filter((item) => item.quantity > 0);
    return newCartsItems?.length;
  };

  // Función para limpiar el carrito (establece cantidad a 0 en todos los productos)
  const clearCart = () => {
    cartItems.forEach((item) => {
      removeQuantity(item?.id);
    });
    setCartItems(getCart());
  };

  // Manejar el inicio de la compra en la modal
  const handlePurchase = () => {
    // Aquí se podría validar el formulario de tarjeta
    setLoading(true);
    // Simular proceso de compra de 15 segundos
    setTimeout(() => {
      setLoading(false);
      setPurchaseComplete(true);
      // Después de 2 segundos, se cierra la modal y se limpia el carrito
      setTimeout(() => {
        setModalOpen(false);
        setPurchaseComplete(false);
        clearCart();
      }, 2000);
    }, 15000);
  };

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 animate-fade animate-once">
        Tu Carrito
      </h1>
      {checkNumerCartArticles() === 0 ? (
        <div className="text-center py-10 min-h-[80vh]">
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
            {/* Artículos del carrito */}
            {cartItems?.map((item) =>
              item.quantity !== 0 ? (
                <Card
                  key={item.id}
                  className="p-4 animate-fade-right animate-once"
                >
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
                            onClick={() => removeItem(item?.id)}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Reducir cantidad</span>
                          </Button>
                          <span className="w-8 text-center">
                            {item?.quantity}
                          </span>
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
              ) : null
            )}
          </div>

          {/* Resumen de la orden */}
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
                <Button
                  className="w-full mt-4"
                  onClick={() => setModalOpen(true)}
                >
                  Proceder a la Compra
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/products">Continuar Comprando</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Modal de Compra */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative animate-fade">
            <Button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              variant="ghost"
              size="icon"
              onClick={() => setModalOpen(false)}
            >
              X
            </Button>
            {!loading && !purchaseComplete && (
              <>
                <h2 className="text-2xl font-bold mb-4 animate-fade-up">Datos de la Tarjeta</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 delay-75 animate-fade-up">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    className="w-full border rounded px-3 py-2 focus:outline-none delay-75 animate-fade-up"
                  />
                </div>
                <div className="mb-4 delay-75 animate-fade-up">
                  <p>
                    Monto a Pagar: <strong>{formatMoney(total)}</strong>
                  </p>
                </div>
                <Button className="w-full delay-75 animate-fade-up" onClick={handlePurchase}>
                  Comprar
                </Button>
              </>
            )}
            {loading && (
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-16 w-16 text-yellow-500 mb-4 animate-fade" />
                <p className="mb-4 animate-fade-up">Procesando tu compra...</p>
                {/* Se puede agregar un spinner aquí */}
                <div className="w-full items-center justify-center delay-75 animate-fade-up">
                  <div className="w-full gap-x-2 flex justify-center items-center">
                    <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce" />
                    <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce" />
                    <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            {purchaseComplete && (
              <div className="flex flex-col items-center">
                <CheckCheckIcon className="h-16 w-16 text-green-500 mb-4 animate-fade-up" />
                <p className="font-bold text-xl mb-4 delay-75 animate-fade-up">¡Compra Realizada!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
