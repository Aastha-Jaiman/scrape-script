"use client";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function ScrapePage() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/scrape");
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
      alert("Scraping failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-xl font-bold">Scrape Books</h1>
        <button
          onClick={handleScrape}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Scraping..." : "Start Scraping"}
        </button>
        {count !== null && (
          <p className="mt-4 text-green-600">✅ Scraped {count} books!</p>
        )}
      </main>
    </div>
  );
}
