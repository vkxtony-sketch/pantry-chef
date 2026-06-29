import { supabase } from "@/lib/supabase";

function embed(text) {
  return text
    .toLowerCase()
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export async function POST(req) {
  try {
    const { ingredients } = await req.json();

    const query = ingredients.join(" ");
    const queryEmbedding = embed(query);

    const { data, error } = await supabase.rpc("match_recipes", {
      query_embedding: queryEmbedding,
      match_count: 10
    });

    if (error) throw error;

    return Response.json({
      success: true,
      results: data
    });

  } catch (e) {
    return Response.json({
      success: false,
      error: e.message
    });
  }
}