"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/scrape">Scrape</Link>
      <Link href="/export">Export</Link>
      <Link href="/email">Email</Link>
    </nav>
  );
}
