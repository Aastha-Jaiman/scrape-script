import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">📚 Book Scraper Dashboard</h1>
        <p className="mt-2 text-gray-700">
          Scrape books, export to Excel, and send via email.
        </p>
      </main>
    </div>
  );
}
