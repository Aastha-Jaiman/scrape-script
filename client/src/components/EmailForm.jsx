"use client";
import { useState } from "react";
import axios from "axios";

export default function EmailForm() {
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSend = async () => {
    setDisabled(true); 
    setStatus("⏳ Sending...");

    try {
      await axios.post("http://localhost:5000/api/scrape/email", {
        recipients: emails.split(",").map((e) => e.trim()),
      });
      setStatus("✅ Email sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Email sending failed");
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Enter comma separated emails..."
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        disabled={disabled} 
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className={`mt-2 px-4 py-2 rounded text-white ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"
        }`}
      >
        {disabled ? "Sending..." : "Send Email"}
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
