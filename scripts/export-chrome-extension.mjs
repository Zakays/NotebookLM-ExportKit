/*
 * NotebookLM ExportKit
 * Copyright (C) 2026 kristol07
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const buildDir = resolve(rootDir, '.output/chrome-mv3');
const targetDir = resolve(rootDir, 'chrome-extension');

if (!existsSync(buildDir)) {
  console.error('Build not found at .output/chrome-mv3. Run "pnpm build" first.');
  process.exit(1);
}

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}

mkdirSync(targetDir, { recursive: true });
cpSync(buildDir, targetDir, { recursive: true });

console.log('Chrome extension generated in ./chrome-extension');
console.log('Load this folder in chrome://extensions with Developer mode enabled.');
