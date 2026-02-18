const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
const FOLDERS = ['.agent', 'standards', 'references', 'adapters'];

function init(cwd) {
  const resolvedCwd = path.resolve(cwd);
  const resolvedRoot = path.resolve(PACKAGE_ROOT);
  if (resolvedCwd === resolvedRoot || resolvedCwd.startsWith(resolvedRoot + path.sep)) {
    console.log('You are inside the Blueprint OS package. Run from your project directory instead:\n');
    console.log('  cd /path/to/your-project');
    console.log('  npx blueprint-os init\n');
    return;
  }

  console.log('Installing Blueprint OS...\n');

  for (const folder of FOLDERS) {
    const src = path.join(PACKAGE_ROOT, folder);
    const dest = path.join(cwd, folder);

    if (!fs.existsSync(src)) {
      console.warn(`  Skipping ${folder}/ (not found in package)`);
      continue;
    }

    fs.cpSync(src, dest, { recursive: true });
    console.log(`  ✓ ${folder}/`);
  }

  const specsDir = path.join(cwd, 'specs');
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
    console.log('  ✓ specs/ (created)');
  }

  console.log('\nDone. Blueprint OS is ready.');
  console.log('\nNext: Read adapters/cursor.md for Cursor setup, or run:');
  console.log('  npx blueprint-os --help');
}

module.exports = { init };
