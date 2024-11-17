import electric_usage from "@/app/data/electric_usage.json"

// Handle GET request for electric_usage
export async function GET() {
    return new Response(JSON.stringify(electric_usage), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}