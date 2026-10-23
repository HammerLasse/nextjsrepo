"use client";

import { useSelector, useDispatch } from "react-redux";
import { sellLemonade, buyLemons } from "@/redux/profitSlice";

export default function Home() {
  const profit = useSelector((state) => state.profit.value);
  const dispatch = useDispatch();

  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center text-center">
      <div className="mb-10">
        <p className="text-[#6e6a63] mb-2">Dine penge</p>

        <p className="text-6xl font-semibold">{profit} dkk</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => dispatch(sellLemonade())}
          className="bg-[#1f1f1f] text-white px-8 py-3 rounded-full hover:opacity-90 transition"
        >
          Sælg lemonade +5 dkk
        </button>
        <button
          onClick={() => dispatch(buyLemons())}
          className="border border-[#1f1f1f] px-8 py-3 rounded-full hover:bg-[#e9e3d8] transition"
        >
          Køb citroner −2 dkk
        </button>
      </div>
    </section>
  );
}
