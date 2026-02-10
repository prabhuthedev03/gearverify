export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    // 1. CATCH THE API CALL
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const formData = await request.json();
        
        // Save to KV using a timestamp-based key
        const timestamp = new Date().toISOString();
        await env.GEAR_VERIFY_DATA.put(`contact_${timestamp}`, JSON.stringify(formData));
        
        return new Response(JSON.stringify({ success: true, message: "Message stored in KV" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Invalid JSON" }), { 
          status: 400 
        });
      }
    }

    // 2. FALLBACK TO STATIC ASSETS
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    
    return new Response("Asset error. Check configuration.", { status: 500 });
  }
}