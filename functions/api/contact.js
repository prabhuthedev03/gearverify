export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const formData = await request.formData();

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const turnstileToken = formData.get('cf-turnstile-response');
        const ip = request.headers.get('CF-Connecting-IP');

        // 1. Validate Inputs
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });
        }

        // 2. Validate Turnstile (Anti-Bot)
        // We only validate if a secret is provided. If not, we skip (for dev/testing).
        if (env.TURNSTILE_SECRET_KEY) {
            if (!turnstileToken) {
                return new Response(JSON.stringify({ error: "Security Check Failed: No Token." }), { status: 403 });
            }

            const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: env.TURNSTILE_SECRET_KEY,
                    response: turnstileToken,
                    remoteip: ip
                })
            });

            const turnstileOutcome = await turnstileResult.json();
            if (!turnstileOutcome.success) {
                return new Response(JSON.stringify({ error: "Security Check Failed: Invalid Token." }), { status: 403 });
            }
        }

        // 3. Dispatch to Discord Webhook (Database/Notification)
        if (env.DISCORD_WEBHOOK_URL) {
            const discordPayload = {
                embeds: [{
                    title: "📡 New Lab Transmission",
                    color: 5814783, // #58b7ff (Access Blue)
                    fields: [
                        { name: "Identity", value: name, inline: true },
                        { name: "Access Point", value: email, inline: true },
                        { name: "Protocol", value: message },
                        { name: "Origin IP", value: ip || "Unknown", inline: true }
                        // Date is automatic in Discord
                    ],
                    footer: { text: "GearVerify Secure Uplink" }
                }]
            };

            const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            });

            if (!discordResponse.ok) {
                console.error("Discord Webhook Error", await discordResponse.text());
                // We don't fail the user request if notification fails, but we log it.
            }
        } else {
            // Fallback for development if no webhook is set
            console.log(`[DEV MODE] Transmission received from ${email}: ${message}`);
        }

        return new Response(JSON.stringify({ success: true, message: "Protocol logged." }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
