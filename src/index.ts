export default {
  async fetch(request, env) {
    // If assets are missing, provide a friendly message instead of a crash
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    
    return new Response("The Worker is running, but Assets are not linked. Check your wrangler.toml.", {
      headers: { "content-type": "text/html" }
    });
  }
}