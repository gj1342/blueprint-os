#!/usr/bin/env node

const { init, update } = require('../lib/init');

const [cmd] = process.argv.slice(2);

if (cmd === 'init') {
  init(process.cwd());
} else if (cmd === 'update') {
  update(process.cwd());
} else {
  console.log('Blueprint OS - AI agent workflow system\n');
  console.log('Usage:');
  console.log('  npx blueprint-os init    Install or reinstall (preserves standards/references if they have content)');
  console.log('  npx blueprint-os update   Safe update: refreshes core skills and adapters, preserves your content');
  console.log('\nUse "npx blueprint-os@latest init" or "npx blueprint-os@latest update" to get the latest version.');
  process.exit(1);
}
