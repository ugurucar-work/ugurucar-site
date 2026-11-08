// Redirect the bare domain to www so the site has one canonical address.
// Everything else is served from the static build in ./dist.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'ugurucar.work') {
      url.hostname = 'www.ugurucar.work';
      return Response.redirect(url.toString(), 301);
    }
    // short address for the game: /play/... serves /games/app-marketing-tycoon/...
    if (url.pathname === '/play') return Response.redirect(url.origin + '/play/', 302);
    if (url.pathname.startsWith('/play/')) {
      url.pathname = '/games/app-marketing-tycoon/' + url.pathname.slice(6);
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return env.ASSETS.fetch(request);
  },
};
