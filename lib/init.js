const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
const FOLDERS = ['.agent', 'standards', 'references', 'adapters'];

const CORE_SKILLS = [
  'brainstorming',
  'creating-skills',
  'shaping-specs',
  'discovering-standards',
  'deploying-standards',
  'quality-assurance',
  'security-audit',
  'code-review',
  'find-skills',
];

function hasUserContent(dir, packageOnly) {
  if (!fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const name = e.name;
    if (e.isDirectory()) {
      if (!packageOnly.dirs.includes(name)) return true;
    } else {
      if (!packageOnly.files.includes(name)) return true;
    }
  }
  return false;
}

function shouldPreserveStandards(dest) {
  return hasUserContent(dest, { files: ['README.md'], dirs: [] });
}

function shouldPreserveReferences(dest) {
  return hasUserContent(dest, { files: ['README.md'], dirs: ['agent-workflow'] });
}

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

    if (folder === 'standards' && shouldPreserveStandards(dest)) {
      console.log(`  ⊘ standards/ (preserved - has project content)`);
      continue;
    }

    if (folder === 'references' && shouldPreserveReferences(dest)) {
      console.log(`  ⊘ references/ (preserved - has project content)`);
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

function update(cwd) {
  const resolvedCwd = path.resolve(cwd);
  const resolvedRoot = path.resolve(PACKAGE_ROOT);
  if (resolvedCwd === resolvedRoot || resolvedCwd.startsWith(resolvedRoot + path.sep)) {
    console.log('You are inside the Blueprint OS package. Run from your project directory instead:\n');
    console.log('  cd /path/to/your-project');
    console.log('  npx blueprint-os update\n');
    return;
  }

  const agentDest = path.join(cwd, '.agent', 'skills');
  if (!fs.existsSync(agentDest)) {
    console.log('Blueprint OS not found. Run "npx blueprint-os init" first.\n');
    return;
  }

  console.log('Updating Blueprint OS...\n');

  const skillsSrc = path.join(PACKAGE_ROOT, '.agent', 'skills');
  for (const skill of CORE_SKILLS) {
    const src = path.join(skillsSrc, skill);
    const dest = path.join(agentDest, skill);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
      console.log(`  ✓ .agent/skills/${skill}/`);
    }
  }

  const adaptersSrc = path.join(PACKAGE_ROOT, 'adapters');
  const adaptersDest = path.join(cwd, 'adapters');
  if (fs.existsSync(adaptersSrc)) {
    fs.cpSync(adaptersSrc, adaptersDest, { recursive: true });
    console.log('  ✓ adapters/');
  }

  const refsSrc = path.join(PACKAGE_ROOT, 'references');
  const refsDest = path.join(cwd, 'references');
  if (fs.existsSync(refsSrc) && fs.existsSync(refsDest)) {
    const agentWorkflowSrc = path.join(refsSrc, 'agent-workflow');
    const agentWorkflowDest = path.join(refsDest, 'agent-workflow');
    if (fs.existsSync(agentWorkflowSrc)) {
      fs.cpSync(agentWorkflowSrc, agentWorkflowDest, { recursive: true });
      console.log('  ✓ references/agent-workflow/');
    }
    const refsReadmeSrc = path.join(refsSrc, 'README.md');
    const refsReadmeDest = path.join(refsDest, 'README.md');
    if (fs.existsSync(refsReadmeSrc)) {
      fs.copyFileSync(refsReadmeSrc, refsReadmeDest);
      console.log('  ✓ references/README.md');
    }
  }

  const standardsReadmeSrc = path.join(PACKAGE_ROOT, 'standards', 'README.md');
  const standardsReadmeDest = path.join(cwd, 'standards', 'README.md');
  if (fs.existsSync(standardsReadmeSrc) && fs.existsSync(path.dirname(standardsReadmeDest))) {
    fs.copyFileSync(standardsReadmeSrc, standardsReadmeDest);
    console.log('  ✓ standards/README.md');
  }

  console.log('\nDone. Core skills, adapters, and framework references updated.');
  console.log('Preserved: specs/, your standards files, your references, community skills.');
}

module.exports = { init, update, CORE_SKILLS };
