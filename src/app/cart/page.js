"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseQuantity, removeItem } from "@/redux/cartSlice";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <section className="border-t border-[#cbbfa6] pt-10">
      <div className="grid lg:grid-cols-[1fr_1.45fr] gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-medium mb-8">Din kurv</h1>
            <div className="space-y-8 text-[1.1rem] leading-8 text-[#2a2825]"></div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-[1.5fr_120px_120px] gap-4 pb-4 border-b border-[#cbbfa6] text-lg">
            <p>Produkt info</p>
            <p className="text-center">Antal</p>
            <p className="text-right">Pris</p>
          </div>

          {items.length === 0 ? (
            <div className="py-8">
              <p className="mb-4">Din kurv er tom.</p>
              <Link href="/shop" className="underline">
                Fortsæt med at shoppe
              </Link>
            </div>
          ) : (
            <>
              <div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1.5fr_120px_120px] gap-4 py-6 border-b border-[#d7ccb7]"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-contain bg-[#efebe3] rounded"
                      />

                      <div className="space-y-2">
                        <h2 className="text-[1.35rem] leading-snug">
                          {item.name}
                        </h2>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="text-sm underline text-[#7a6f5d] mt-6"
                        >
                          Slet produkt
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start justify-center gap-4 pt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(addItem(item))}>+</button>
                    </div>

                    <p className="text-right pt-1"></p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/shop"
                  className="border border-[#1f1f1f] rounded-full px-6 py-4 text-center"
                >
                  Fortsæt med at shoppe
                </Link>

                <Link
                  href="/checkout"
                  className="bg-[#c6c1b5] text-white rounded-full px-6 py-4 text-center"
                >
                  Gå til kassen
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
