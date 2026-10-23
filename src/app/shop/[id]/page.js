import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function DrinkDetails({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Kunne ikke hente drinken");
  }

  const data = await response.json();
  const drink = data.drinks?.[0];

  if (!drink) {
    notFound();
  }

  const ingredients = Array.from({ length: 15 }, (_, i) => {
    const ingredient = drink[`strIngredient${i + 1}`];
    const measure = drink[`strMeasure${i + 1}`];
    if (!ingredient) return null;
    return `${measure || ""} ${ingredient}`.trim();
  }).filter(Boolean);

  return (
    <section className="space-y-8">
      <Link href="/shop" className="underline">
        Tilbage til butikken
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-[#efebe3] rounded-2xl p-10 flex items-center justify-center min-h-[500px]">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="max-h-[420px] object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#5f584f] mb-2">
              {drink.strCategory} · {drink.strAlcoholic}
            </p>
            <h1 className="text-4xl font-medium mb-4">{drink.strDrink}</h1>
          </div>

          <p className="text-[#585249] leading-7">{drink.strInstructions}</p>

          <div>
            <h2 className="text-xl font-medium mb-3">Ingredienser</h2>
            <ul className="list-disc pl-5 space-y-1 text-[#585249]">
              {ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <AddToCartButton
            drink={{
              id: drink.idDrink,
              name: drink.strDrink,
              image: drink.strDrinkThumb,
            }}
          />
        </div>
      </div>
    </section>
  );
}
