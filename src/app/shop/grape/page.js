import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const grape = {
  id: "grape",
  name: "Vindruer",
  image: "/grape.png",
};

export default function GrapePage() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div className="bg-[#efebe3] rounded-2xl p-10">
        <img
          src={grape.image}
          alt={grape.name}
          className="w-full max-h-[400px] object-contain"
        />
      </div>

      <div className="space-y-6">
        <Link href="/shop" className="underline">
          Tilbage til butikken
        </Link>

        <h1 className="text-4xl font-medium">Vindruer</h1>

        <p className="text-2xl"></p>

        <p className="text-[#6e6a63]">
          Forestil dig du gik op til en lemonadestand og sagde til manden der
          havde standen "Hey, har du nogle vindruer" og så fik et nej. Det skal
          du ikke være bange for her.
        </p>

        <AddToCartButton drink={grape} />
      </div>
    </section>
  );
}
