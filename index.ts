export default {
  async fetch(request, env, ctx): Promise<Response> {
    return await env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

interface Env {
  ASSETS: Fetcher;
}