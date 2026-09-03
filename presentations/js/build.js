const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '../..');
const presentationsDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('\n\x1b[36m[Build]\x1b[0m Start productie-build voor Netlify (dist root)...');

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
fs.mkdirSync(distDir, { recursive: true });

// 2. Marp compilatie van alle markdown bestanden
console.log('\x1b[36m[Build]\x1b[0m 1/3 Compileren van alle presentaties met Marp...');
execSync('npx @marp-team/marp-cli --no-stdin "presentations/**/*.md" --html', {
  cwd: rootDir,
  stdio: 'inherit'
});

// 3. Inject scripts in gegenereerde HTML
console.log('\x1b[36m[Build]\x1b[0m 2/3 Injecteren van scripts.js in alle slides...');
const injectPath = path.join(__dirname, 'inject-scripts.js');
delete require.cache[require.resolve(injectPath)];
require(injectPath);

// 4. Filteren en selectief kopiëren direct naar dist root (EXCLUSIEF .md en build-scripts)
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

console.log('\x1b[36m[Build]\x1b[0m 3/3 Kopiëren naar dist/ (portaal index, stijlen en presentaties)...');
copyFiltered(presentationsDir, distDir);

// Client-side js kopiëren (enkel scripts.js naar dist/js/scripts.js)
const distJsDir = path.join(distDir, 'js');
fs.mkdirSync(distJsDir, { recursive: true });
fs.copyFileSync(path.join(presentationsDir, 'js', 'scripts.js'), path.join(distJsDir, 'scripts.js'));

console.log('\x1b[32m[Build ✓]\x1b[0m Productie-build succesvol afgerond direct in dist/.\n');
