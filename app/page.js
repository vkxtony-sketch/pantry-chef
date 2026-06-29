"use client";

import { useState } from "react";

export default function Page() {
  const [ingredients, setIngredients] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);

    const res = await fetch("/api/vector-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients.split(",").map(i => i.trim())
      })
    });

    const data = await res.json();

    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <div>
      <input
        placeholder="chicken, rice, garlic..."
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button onClick={search} style={{ padding: 10 }}>
        Search Recipes
      </button>

      {loading && <p>Searching AI...</p>}

      <div style={{ marginTop: 20 }}>
        {results.map((r) => (
          <div key={r.id} style={{ padding: 10, background: "white", marginBottom: 10 }}>
            <h3>{r.name}</h3>
            <p>Score: {Math.round(r.score * 100)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}