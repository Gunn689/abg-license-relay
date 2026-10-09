export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        // CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });
        }
        
        // Relay endpoint
        if (url.pathname === "/api/login" && request.method === "POST") {
            try {
                const body = await request.text();
                const resp = await fetch("https://abglicense.ayargabent97.workers.dev/api/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: body
                });
                const data = await resp.text();
                return new Response(data, {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            } catch (e) {
                return new Response(
                    JSON.stringify({status: false, msg: "Relay error: " + String(e)}),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );
            }
        }
        
        return new Response("ABG Relay OK", {
            headers: {"Content-Type": "text/plain"}
        });
    }
};
