export default {
  async fetch(request, env, ctx) {
    // This looks for a matching file in your assets (like index.html)
    // If it finds one, it serves it. If not, it returns a 404.
    return await env.ASSETS.fetch(request);
  },
};