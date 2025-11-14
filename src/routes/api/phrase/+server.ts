import { getRandomPhrase } from "$lib/server/db/database";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const categoryId = url.searchParams.get("category");
    if (!categoryId) {
        return new Response(JSON.stringify({ error: "Category ID is required." }), { status: 400 });
    }

    try {
        const phrase = await getRandomPhrase(categoryId);
        return new Response(JSON.stringify({ phrase }), { status: 200 });
    } catch (error) {
        console.error("Error fetching random phrase:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
