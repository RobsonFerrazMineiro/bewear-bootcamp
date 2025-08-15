"use client";

import { getCart } from "@/actions/get-cart";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {cartIsLoading && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{item.productVariant.name}</h3>
                <span className="text-muted-foreground text-sm">
                  {item.productVariant.color}
                </span>
                <span className="text-sm font-medium">
                  Quantidade: {item.quantity}
                </span>
              </div>
            </div>
          ))}
          {!cartIsLoading && cart?.items.length === 0 && (
            <div className="text-muted-foreground text-center">
              Seu carrinho está vazio
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
