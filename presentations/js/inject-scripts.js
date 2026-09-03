const fs = require('fs');
const path = require('path');

const presentationsDir = path.join(__dirname, '..');
const scriptsTarget = path.join(presentationsDir, 'js', 'scripts.js');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

if (fs.existsSync(presentationsDir)) {
  const htmlFiles = getAllHtmlFiles(presentationsDir);

  htmlFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Detect available language siblings in the same module folder
    const folderFiles = fs.readdirSync(path.dirname(filePath));
    const availableLangs = [];
    if (folderFiles.some(f => f.startsWith('dutch.'))) availableLangs.push('dutch');
    if (folderFiles.some(f => f.startsWith('english.'))) availableLangs.push('english');
    if (folderFiles.some(f => f.startsWith('french.'))) availableLangs.push('french');

    const metaTag = `<meta name="marp-languages" content="${availableLangs.join(',')}">`;
    if (!content.includes('name="marp-languages"')) {
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${metaTag}\n</head>`);
        modified = true;
      }
    } else {
      content = content.replace(/<meta name="marp-languages"[^>]*>/, metaTag);
      modified = true;
    }

    if (!content.includes('scripts.js')) {
      const relPath = path.relative(path.dirname(filePath), scriptsTarget).replace(/\\/g, '/');
      content = content.replace('</body>', `<script src="${relPath}"></script></body>`);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      const displayPath = path.relative(presentationsDir, filePath).replace(/\\/g, '/');
      console.log(`[inject-scripts] Updated ${displayPath} (langs: ${availableLangs.join(', ')})`);
    }
  });
}

