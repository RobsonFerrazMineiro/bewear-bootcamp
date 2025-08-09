"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

type Brand = {
  name: string;
  logo: string;
  href?: string;
};

const defaultBrands: Brand[] = [
  {
    name: "Nike",
    logo: "/icons_nike.svg",
  },
  {
    name: "Adidas",
    logo: "/icons_adidas.svg",
  },
  {
    name: "Puma",
    logo: "/icons_puma.svg",
  },
  {
    name: "New Balance",
    logo: "./icons_newbalance.svg",
  },
  // adicione mais marcas se desejar
];

export default function BrandPartnersSection({
  title = "Marcas parceiras",
  brands = defaultBrands,
}: {
  title?: string;
  brands?: Brand[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollButtons() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const ro = new ResizeObserver(() => updateScrollButtons());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      ro.disconnect();
    };
  }, []);

  function handleScroll(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="px-5 text-lg font-semibold">{title}</h3>

      {/* Scroller horizontal com scrollbar nativo visível */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Lista de marcas parceiras"
        className="overflow-x-auto scroll-smooth pb-2"
      >
        <ul className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {brands.map((brand) => {
            const card = (
              <Card className="group border-neutral-80 rounded-[32px] border-2 bg-white shadow-none transition hover:shadow-sm">
                <CardContent className="flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`Logomarca da ${brand.name}`}
                    className="h-12 w-auto"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            );

            return (
              <li
                key={brand.name}
                className="flex flex-shrink-0 snap-start flex-col items-center md:w-64"
              >
                {brand.href ? (
                  <a
                    href={brand.href}
                    aria-label={`Visitar ${brand.name}`}
                    className="w-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
                <span className="mt-4 text-center text-xl font-semibold md:text-3xl">
                  {brand.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
