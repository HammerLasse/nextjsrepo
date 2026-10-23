"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  async function handleCheckout() {
    if (loading || items.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Ordren kunne ikke gennemføres");
      }

      dispatch(clearCart());
      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-t border-[#cbbfa6] pt-10">
      <Link href="/cart" className="text-sm underline text-[#6e6a63]">
        Tilbage til kurven
      </Link>

      <h1 className="text-5xl font-medium mt-8 mb-4">Checkout</h1>

      <p className="text-[#6e6a63] mb-12">
        Gennemgå din ordre inden du afslutter dit køb.
      </p>

      {items.length === 0 ? (
        <div className="border-t border-[#cbbfa6] py-10">
          <p className="text-lg mb-6">Din kurv er tom.</p>

          <Link
            href="/shop"
            className="inline-block bg-[#ffffff] text-white rounded-full px-8 py-3"
          >
            Gå til butikken
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div>
            <h2 className="text-2xl font-medium mb-6">Dine produkter</h2>

            <div className="border-t border-[#cbbfa6]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 py-6 border-b border-[#cbbfa6]"
                >
                  <div className="bg-[#efebe3] rounded-lg w-28 h-28 shrink-0 flex items-center justify-center p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-medium">{item.name}</h3>

                      <p className="text-sm text-[#6e6a63] mt-2">
                        Antal: {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/cart" className="inline-block mt-6 text-sm underline">
              Rediger din kurv
            </Link>
          </div>
          <div className="bg-[#efebe3] rounded-xl p-8">
            <h2 className="text-2xl font-medium mb-8">Ordreoversigt</h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <p>Produkter ({totalItems})</p>
                <p></p>
              </div>

              <div className="flex justify-between">
                <p>Levering</p>
                <p>Gratis</p>
              </div>

              <div className="border-t border-[#cbbfa6] pt-5 flex justify-between text-xl font-medium">
                <p>Total</p>
                <p></p>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-red-700 mt-6">
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#1f1f1f] text-white rounded-full py-4 mt-8 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Behandler ordre..." : "Gennemfør ordre"}
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              disabled={loading}
              className="w-full border border-[#1f1f1f] rounded-full py-4 mt-3 hover:bg-[#e2dbce] transition disabled:opacity-50"
            >
              Ryd kurv
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
