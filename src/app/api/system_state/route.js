import system_state from '@/app/data/system_state.json'

// Handle GET request for system_state
export async function GET() {
    return new Response(JSON.stringify(system_state), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}