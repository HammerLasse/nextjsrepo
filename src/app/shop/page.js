import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default async function Shop() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon",
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Kunne ikke hente drinks");
  }

  const data = await response.json();
  const drinks = (data.drinks || []).map((drink) => ({
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
    alcoholic: drink.strAlcoholic,
    description:
      drink.strInstructions?.slice(0, 100) + "..." || "Lækker lemon drink.",
    raw: drink,
  }));
  const grape = {
    id: "grape",
    name: "Vindruer",
    image: "/grape.png",
    category: "Frugt",
    alcoholic: "Alkoholfri",
    description:
      "Vindruer. Fordi en lemonadestand burde faktisk have nogle vindruer",
    price: 1,
  };

  const products = [...drinks, grape];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-medium">Drinks med citron</h1>
        <p className="text-lg text-[#4f4a43] max-w-3xl">
          Her er vores dejlige citron drinks, nammenam
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {products.map((drink) => (
          <article
            key={drink.id}
            className="bg-[#efebe3] rounded-2xl overflow-hidden flex flex-col min-h-[560px]"
          >
            <div className="relative h-[360px] bg-[#e7e2d8] flex items-center justify-center p-8">
              <Link href={`/shop/${drink.id}`}>
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="max-h-[290px] object-contain mx-auto"
                />
              </Link>
            </div>

            <div className="px-5 pt-3 pb-5 flex-1 flex flex-col">
              <div className="flex justify-between text-xs text-[#5f584f] border-t-2 border-[#c86d2a] pt-2 mb-4">
                <span>{drink.category}</span>
                <span>{drink.alcoholic}</span>
              </div>

              <Link href={`/shop/${drink.id}`}>
                <h2 className="text-[1.4rem] leading-snug font-medium mb-4 hover:underline">
                  {drink.name}
                </h2>
              </Link>

              <p className="text-sm text-[#5d584f] leading-6 mb-6 flex-1">
                {drink.description}
              </p>

              <div className="flex items-end justify-between gap-3 mt-auto">
                <AddToCartButton
                  drink={{
                    id: drink.id,
                    name: drink.name,
                    image: drink.image,
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
