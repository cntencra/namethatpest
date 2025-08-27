import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/ntplogo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <p className="mb-2">
          Take your pest knowledge to the next level!
        </p>
          

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent px-4 py-2 bg-red-600 text-white hover:bg-red-70 transition"
            href="/quiz"
          >
            Take the Quiz
          </Link>
        </div>
      </main>

  );
}
