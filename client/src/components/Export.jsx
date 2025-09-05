"use client"

export default function ExportPage() {
  const handleExport = () => {
    window.open("http://localhost:5000/api/scrape/export", "_blank");
  };

  return (
    <div>
      <main className="p-8">
        <h1 className="text-xl font-bold">Export Books</h1>
        <button
          onClick={handleExport}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
      </main>
    </div>
  );
}
