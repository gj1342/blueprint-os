#!/usr/bin/env node

const { init } = require('../lib/init');

const [cmd] = process.argv.slice(2);

if (cmd === 'init') {
  init(process.cwd());
} else {
  console.log('Blueprint OS - AI agent workflow system\n');
  console.log('Usage: npx blueprint-os init');
  console.log('\nCopies .agent/, standards/, and references/ into your project.');
  process.exit(1);
}
