"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCart, initCart } from "@/lib/cart"
import Link from "next/link"

export default function ProductListing() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState()

  // Filter products based on gender and search query
  const filteredProducts = products?.filter((product) => {
    const matchesGender = filter === "all" || product?.category?.includes(filter)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGender && matchesSearch
  })

  useEffect(() => {
    initCart();
    setProducts(getCart());
  }, []);

  return (
    (<div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-medium mb-6 animate-fade animate-once">Productos</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-fade animate-once">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Gender filters */}
          <div className="flex gap-2 animate-fade animate-once">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "women" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("women")}>
              Women
            </Button>
            <Button
              variant={filter === "men" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("men")}>
              Men
            </Button>
          </div>
        </div>
      </header>
      {/* Product grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <Link href={`/products/${product?.id - 1}`} key={product?.id} className="group animate-fade-up">
            <div className="aspect-square overflow-hidden bg-gray-100 mb-2">
              <Image
                src={product?.cover?.[0] || "/placeholder.svg"}
                alt={product?.name}
                width={300}
                height={300}
                className="object-contain bg-neutral-100 w-full h-full transition-transform group-hover:scale-105" />
            </div>
            <h3 className="text-sm font-medium">{product?.name}</h3>
            <p className="text-sm text-muted-foreground">${product?.price?.toFixed(2)}</p>
          </Link>
        ))}
      </div>
      {filteredProducts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay productos disponibles, intenta con otra búsqueda o filtro.</p>
        </div>
      )}
    </div>)
  );
}

