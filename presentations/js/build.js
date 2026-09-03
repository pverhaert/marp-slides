const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '../..');
const presentationsDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distPresDir = path.join(distDir, 'presentations');

console.log('\n\x1b[36m[Build]\x1b[0m Start productie-build voor Netlify...');

// 1. Dist map schoonmaken
if (fs.existsSync(distDir)) {
  try {
    const entries = fs.readdirSync(distDir);
    for (const entry of entries) {
      fs.rmSync(path.join(distDir, entry), { recursive: true, force: true });
    }
  } catch (e) {
    // Bestanden overschrijven indien locked
  }
}
fs.mkdirSync(distPresDir, { recursive: true });

// 2. Marp compilatie van alle markdown bestanden
console.log('\x1b[36m[Build]\x1b[0m 1/4 Compileren van alle presentaties met Marp...');
execSync('npx @marp-team/marp-cli --no-stdin "presentations/**/*.md" --html', {
  cwd: rootDir,
  stdio: 'inherit'
});

// 3. Inject scripts in gegenereerde HTML
console.log('\x1b[36m[Build]\x1b[0m 2/4 Injecteren van scripts.js in alle slides...');
const injectPath = path.join(__dirname, 'inject-scripts.js');
delete require.cache[require.resolve(injectPath)];
require(injectPath);

// 4. Filteren en selectief kopiëren naar dist (EXCLUSIEF .md en build-scripts)
function copyFiltered(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // Map 'js' slaan we over om alleen scripts.js specifiek mee te nemen
      if (srcPath === path.join(presentationsDir, 'js')) {
        continue;
      }
      copyFiltered(srcPath, destPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // NOOIT markdown bestanden opnemen in dist!
      if (ext === '.md') continue;

      const allowedExts = [
        '.html', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif',
        '.ico', '.woff', '.woff2', '.ttf', '.json'
      ];
      if (allowedExts.includes(ext)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log('\x1b[36m[Build]\x1b[0m 3/4 Kopiëren van HTML presentaties, stijlen en assets (geen .md)...');
copyFiltered(presentationsDir, distPresDir);

// Client-side js kopiëren (enkel scripts.js)
const distJsDir = path.join(distPresDir, 'js');
fs.mkdirSync(distJsDir, { recursive: true });
fs.copyFileSync(path.join(presentationsDir, 'js', 'scripts.js'), path.join(distJsDir, 'scripts.js'));

// Root redirect pagina in dist/index.html
console.log('\x1b[36m[Build]\x1b[0m 4/4 Aanmaken van root portaal redirect...');
const rootIndexHtml = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/presentations/assets/favicon.svg">
  <meta http-equiv="refresh" content="0; url=/presentations/">
  <title>Thomas More ITF Presentaties</title>
  <script>window.location.href = '/presentations/';</script>
</head>
<body style="background:#0f141c;color:#e6edf3;font-family:sans-serif;padding:40px;">
  <p>Doorsturen naar <a href="/presentations/" style="color:#009cab;">Presentaties portaal</a>...</p>
</body>
</html>
`;
fs.writeFileSync(path.join(distDir, 'index.html'), rootIndexHtml, 'utf8');

console.log('\x1b[32m[Build ✓]\x1b[0m Productie-build succesvol afgerond in dist/.\n');
