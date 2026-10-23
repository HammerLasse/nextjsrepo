import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-[#cbbfa6] bg-[#f6f2e8]">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-semibold">
          Andens Stand
        </Link>

        <div className="flex flex-wrap gap-5 text-sm md:text-base">
          <Link href="/" className="hover:underline">
            Hjem
          </Link>
          <Link href="/shop" className="hover:underline">
            Butik
          </Link>
          <Link href="/cart" className="hover:underline">
            Kurv
          </Link>
          <Link href="/checkout" className="hover:underline">
            Tjek ud
          </Link>
        </div>
      </div>
    </nav>
  );
}
