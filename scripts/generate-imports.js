import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the examples.json file
const examplesJsonPath = path.resolve(__dirname, '../src/examples/examples.json');
const examplesData = JSON.parse(fs.readFileSync(examplesJsonPath, 'utf8'));

// Output file path
const outputFile = path.resolve(__dirname, '../src/utils/generatedImports.ts');

// Start building the output file content
let fileContent = `
// THIS FILE IS AUTO-GENERATED - DO NOT EDIT
// It contains explicit imports for all example components to ensure proper chunking

import React from 'react';
import { LazyComponent } from '../types/LazyComponent';

const generatedImports: Record<string, LazyComponent> = {};

`;

// Process all examples to create explicit imports
Object.entries(examplesData.examples).forEach(([category, categoryExamples]) => {
  categoryExamples.forEach((example) => {
    // Handle single path examples
    if (example.path && example.path.endsWith('.tsx')) {
      const path = example.path;
      const componentPath = path.replace('.tsx', '');
      const chunkName = `example-${componentPath.replace(/\//g, '-')}`;

      fileContent += `// ${example.name || 'Unnamed example'}\n`;
      fileContent += `generatedImports["${path}"] = React.lazy(() => import(/* @vite-chunk-name: "${chunkName}" */ "../examples/${componentPath}.tsx"));\n\n`;
    }

    // Handle multiple paths examples
    if (example.paths) {
      example.paths.forEach((path) => {
        if (path.endsWith('.tsx')) {
          const componentPath = path.replace('.tsx', '');
          const chunkName = `example-${componentPath.replace(/\//g, '-')}`;

          fileContent += `// ${example.name || 'Unnamed example'} (from paths)\n`;
          fileContent += `generatedImports["${path}"] = React.lazy(() => import(/* @vite-chunk-name: "${chunkName}" */ "../examples/${componentPath}.tsx"));\n\n`;
        }
      });
    }
  });
});

fileContent += `export default generatedImports;\n`;

// Write the file
fs.writeFileSync(outputFile, fileContent);
console.log(`Generated imports file at: ${outputFile}`);
