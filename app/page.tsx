import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav>
        <div className="navbar bg-secondary text-primary-content">
          <Link className="btn btn-ghost hover:text-primary normal-case text-xl" href="/products">
            Products
          </Link>
        </div>
      </nav>
    </main>
  );
}
