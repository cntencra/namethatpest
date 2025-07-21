import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/ntplogo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ul className="font-mono list-inside  text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Take your pest knowledge to the next level!
          </li>
          <li className="tracking-[-.01em]">

          </li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent px-4 py-2 bg-red-600 text-white hover:bg-red-70 transition"
            href="/quiz"
          >
            Take the Quiz
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
