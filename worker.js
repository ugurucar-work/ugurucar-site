// Redirect the bare domain to www so the site has one canonical address.
// Everything else is served from the static build in ./dist.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'ugurucar.work') {
      url.hostname = 'www.ugurucar.work';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
