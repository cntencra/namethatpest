import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="w-full shadow-sm py-3 px-3 flex justify-between items-center relative z-20">
      <Nav />
      <Link href="/quiz" className="flex items-center pr-2">
        <Image
          src="/ntp-title.png"
          alt="PestQuiz Logo"
          width={200}
          height={40}
          className="cursor-pointer hover:opacity-80 transition"
        />
      </Link>
    </header>
  );
}