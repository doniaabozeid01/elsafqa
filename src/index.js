export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === '/') {
      path = '/index.html';
    }

    const asset = await env.ASSETS.fetch(new URL(path, request.url));
    
    if (asset.status === 200) {
      const ext = path.split('.').pop();
      const contentTypes = {
        'html': 'text/html; charset=utf-8',
        'css': 'text/css; charset=utf-8',
        'js': 'application/javascript; charset=utf-8',
        'json': 'application/json; charset=utf-8',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon',
        'webp': 'image/webp',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
      };

      const headers = new Headers(asset.headers);
      if (contentTypes[ext]) {
        headers.set('Content-Type', contentTypes[ext]);
      }

      if (ext === 'html') {
        headers.set('Cache-Control', 'no-cache');
      } else if (['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'woff', 'woff2', 'ttf'].includes(ext)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      }

      return new Response(asset.body, { status: 200, headers });
    }

    if (!path.includes('.')) {
      const htmlAsset = await env.ASSETS.fetch(new URL(path + '.html', request.url));
      if (htmlAsset.status === 200) {
        return new Response(htmlAsset.body, {
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' },
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};
