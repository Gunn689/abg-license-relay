export async function onRequestPost(context) {
    try {
        const bodyText = await context.request.text();
        const resp = await fetch("https://abglicense.ayargabent97.workers.dev/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: bodyText
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
            { status: 500, headers: {"Content-Type": "application/json"} }
        );
    }
}

export async function onRequest(context) {
    if (context.request.method === "OPTIONS") {
        return new Response(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });
    }
    return onRequestPost(context);
}
