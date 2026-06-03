"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/types";
import { getAllProducts } from "./catalog";

const STORAGE_KEY = "ml.cart.v1";

export type CartLine = {
  productId: string;
  size: string | null;
  color: string | null;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, size: string | null) => void;
  setQty: (productId: string, size: string | null, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  resolvedLines: Array<CartLine & { product: Product; lineTotal: number }>;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we never wipe a slow read).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const addLine = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex(
        (l) => l.productId === line.productId && l.size === line.size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
  }, []);

  const removeLine = useCallback((productId: string, size: string | null) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.size === size)),
    );
  }, []);

  const setQty = useCallback(
    (productId: string, size: string | null, qty: number) => {
      setLines((prev) => {
        if (qty <= 0)
          return prev.filter(
            (l) => !(l.productId === productId && l.size === size),
          );
        return prev.map((l) =>
          l.productId === productId && l.size === size ? { ...l, qty } : l,
        );
      });
    },
    [],
  );

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartCtx>(() => {
    const catalog = getAllProducts();
    const resolvedLines = lines.flatMap((l) => {
      const product = catalog.find((p) => p.id === l.productId);
      if (!product) return [];
      return [{ ...l, product, lineTotal: product.priceNum * l.qty }];
    });
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = resolvedLines.reduce((s, l) => s + l.lineTotal, 0);
    return {
      lines,
      isOpen,
      openCart,
      closeCart,
      addLine,
      removeLine,
      setQty,
      clear,
      count,
      subtotal,
      resolvedLines,
    };
  }, [lines, isOpen, addLine, removeLine, setQty, clear, openCart, closeCart]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
