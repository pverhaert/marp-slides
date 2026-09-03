const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync, exec } = require('child_process');

const rootDir = path.join(__dirname, '../..');
const presentationsDir = path.join(__dirname, '..');
const DEFAULT_PORT = 3000;

function parsePort() {
  // Check process.argv for --port=XXXX or --port XXXX or -p XXXX
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--port=')) {
      const p = parseInt(arg.split('=')[1], 10);
      if (!isNaN(p) && p > 0) return p;
    }
    if (arg === '--port' || arg === '-p') {
      const p = parseInt(process.argv[i + 1], 10);
      if (!isNaN(p) && p > 0) return p;
    }
  }
  // Check npm config env variable (set by npm run watch --port=4040)
  if (process.env.npm_config_port) {
    const p = parseInt(process.env.npm_config_port, 10);
    if (!isNaN(p) && p > 0) return p;
  }
  // Check general PORT environment variable
  if (process.env.PORT) {
    const p = parseInt(process.env.PORT, 10);
    if (!isNaN(p) && p > 0) return p;
  }
  return DEFAULT_PORT;
}

let currentPort = parsePort();
let hasOpenedBrowser = false;

// Live reload SSE clients
const sseClients = new Set();

function notifyReload() {
  for (const client of sseClients) {
    try {
      client.write('data: reload\n\n');
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8'
};

const LIVE_RELOAD_SCRIPT = `
<!-- Live Reload Script -->
<script>
(() => {
  if (typeof EventSource !== 'undefined') {
    const es = new EventSource('/_live-reload');
    es.onmessage = (e) => {
      if (e.data === 'reload') {
        console.log('[Marp Watch] Update gedetecteerd, pagina herladen...');
        window.location.reload();
      }
    };
  }
})();
</script>
`;

function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://localhost:${currentPort}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // SSE endpoint for live reload
  if (pathname === '/_live-reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('retry: 1000\n\n');
    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // Route root '/' or '/index.html' to presentations/index.html
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/presentations/index.html';
  }

  // Resolve safe path within rootDir
  let safePath = path.normalize(path.join(rootDir, pathname));
  if (!safePath.startsWith(rootDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Fallback: if not found in root, check within presentationsDir directly
  if (!fs.existsSync(safePath)) {
    const altSafePath = path.normalize(path.join(presentationsDir, pathname));
    if (altSafePath.startsWith(presentationsDir) && fs.existsSync(altSafePath)) {
      safePath = altSafePath;
    }
  }

  // Directory request: look for index.html
  if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
    const indexPath = path.join(safePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      safePath = indexPath;
    } else {
      try {
        const entries = fs.readdirSync(safePath, { withFileTypes: true });
        const items = entries.map((entry) => {
          const itemPath = path.join(pathname, entry.name).replace(/\\/g, '/');
          const isDir = entry.isDirectory();
          return `<li><a href="${itemPath}${isDir ? '/' : ''}">${entry.name}${isDir ? '/' : ''}</a></li>`;
        }).join('\n');

        const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Overzicht ${pathname}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f141c; color: #e6edf3; padding: 40px; margin: 0; }
    h1 { color: #ffffff; border-bottom: 2px solid #e84e10; padding-bottom: 10px; }
    a { color: #009cab; text-decoration: none; font-size: 18px; }
    a:hover { color: #ff753a; text-decoration: underline; }
    ul { list-style: none; padding: 0; line-height: 2; }
    li { padding: 4px 0; border-bottom: 1px solid #2c3647; }
    .back { margin-bottom: 20px; display: inline-block; color: #ff753a; }
  </style>
</head>
<body>
  <a href="/" class="back">&larr; Terug naar portaal</a>
  <h1>Overzicht ${pathname}</h1>
  <ul>
    ${items}
  </ul>
</body>
</html>`;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: ' + e.message);
        return;
      }
    }
  }

  // Not found
  if (!fs.existsSync(safePath) || !fs.statSync(safePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="nl">
<head><title>404 Niet gevonden</title><style>body{font-family:sans-serif;background:#0f141c;color:#fff;padding:40px;}</style></head>
<body>
  <h2>404 - Bestand niet gevonden</h2>
  <p>Pad niet gevonden: <code>${pathname}</code></p>
  <p><a href="/" style="color:#009cab;">&larr; Terug naar hoofdportaal</a></p>
</body>
</html>`);
    return;
  }

  const ext = path.extname(safePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    if (ext === '.html') {
      let content = fs.readFileSync(safePath, 'utf8');
      if (content.includes('</body>')) {
        content = content.replace('</body>', `${LIVE_RELOAD_SCRIPT}\n</body>`);
      } else {
        content += LIVE_RELOAD_SCRIPT;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } else {
      const fileStream = fs.createReadStream(safePath);
      res.writeHead(200, { 'Content-Type': contentType });
      fileStream.pipe(res);
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error: ' + err.message);
  }
}

function openBrowser(url) {
  const shouldSkipOpen = process.argv.includes('--no-open');
  if (shouldSkipOpen) return;

  const startCmd = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
    ? `open "${url}"`
    : `xdg-open "${url}"`;

  exec(startCmd, (err) => {
    if (err) {
      // Browser open silently skipped or not available in this environment
    }
  });
}

function printBanner(port) {
  const host = `http://localhost:${port}`;
  console.log('\n\x1b[38;2;232;78;16m' + '='.repeat(64) + '\x1b[0m');
  console.log('  \x1b[1m\x1b[37mThomas More ITF\x1b[0m : \x1b[38;2;0;156;171mMarp Presentatie Server\x1b[0m');
  console.log('\x1b[38;2;232;78;16m' + '='.repeat(64) + '\x1b[0m\n');
  console.log(`  > \x1b[1mPortaal / Dashboard:\x1b[0m  \x1b[36m${host}/presentations/\x1b[0m (of \x1b[36m${host}/\x1b[0m)`);
  console.log(`  > \x1b[1mActieve poort:\x1b[0m        \x1b[33m${port}\x1b[0m (configureerbaar via --port=POORT)\n`);
  console.log('  \x1b[90mTip: Houd Ctrl ingedrukt en klik op een link om deze te openen.\x1b[0m\n');
  console.log('\x1b[36m[Marp Watch]\x1b[0m Map presentations/ wordt recursief gemonitord op wijzigingen.');
  console.log('\x1b[36m[Marp Watch]\x1b[0m Automatische compilatie en live reload zijn ingeschakeld.\n');
}

function startServer(port) {
  const server = http.createServer(handleRequest);
  server.listen(port, () => {
    currentPort = port;
    printBanner(port);
    if (!hasOpenedBrowser) {
      hasOpenedBrowser = true;
      openBrowser(`http://localhost:${port}/presentations/`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`\x1b[33m[Marp Watch]\x1b[0m Poort ${port} is bezet, probeer ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('\x1b[31m[Server Error]\x1b[0m', err.message);
    }
  });
}

let isCompiling = false;
let timeout = null;

function runBuild(changedFile) {
  if (isCompiling) return;
  isCompiling = true;

  try {
    const fullInputPath = path.resolve(presentationsDir, changedFile);
    const filename = path.basename(fullInputPath);
    console.log(`\x1b[33m[Wijziging gedetecteerd]\x1b[0m ${filename} is gewijzigd. Bezig met compileren...`);

    if (filename.endsWith('.md')) {
      const fullOutputPath = fullInputPath.replace(/\.md$/, '.html');
      execSync(`npx @marp-team/marp-cli --no-stdin "${fullInputPath}" --html -o "${fullOutputPath}"`, {
        cwd: rootDir,
        stdio: 'inherit'
      });

      const injectPath = path.join(__dirname, 'inject-scripts.js');
      delete require.cache[require.resolve(injectPath)];
      require(injectPath);

      const relPath = path.relative(rootDir, fullOutputPath).replace(/\\/g, '/');
      const directUrl = `http://localhost:${currentPort}/${relPath}`;

      console.log(`\x1b[32m[Marp Watch ✓]\x1b[0m Compilatie geslaagd.`);
      console.log(`  > \x1b[1mOpen presentatie:\x1b[0m \x1b[36m${directUrl}\x1b[0m\n`);
    } else {
      execSync('npx @marp-team/marp-cli --no-stdin "presentations/**/*.md" --html', {
        cwd: rootDir,
        stdio: 'inherit'
      });

      const injectPath = path.join(__dirname, 'inject-scripts.js');
      delete require.cache[require.resolve(injectPath)];
      require(injectPath);

      console.log(`\x1b[32m[Marp Watch ✓]\x1b[0m Alle presentaties opnieuw gecompileerd.\n`);
    }

    notifyReload();
  } catch (err) {
    console.error('\x1b[31m[Build Error]\x1b[0m', err.message);
  } finally {
    isCompiling = false;
  }
}

// Start HTTP server
startServer(currentPort);

// Watch presentations directory recursively
fs.watch(presentationsDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const ext = path.extname(filename).toLowerCase();

  // Only trigger on markdown or css changes
  if (ext === '.md' || ext === '.css') {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      runBuild(filename);
    }, 250);
  }
});
