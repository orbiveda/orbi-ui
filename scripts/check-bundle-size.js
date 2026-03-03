#!/usr/bin/env node
/**
 * Bundle Size Guardrails
 * 
 * Validates that built bundles don't exceed size thresholds.
 * Helps catch performance regressions early.
 * 
 * Usage: node scripts/check-bundle-size.js
 * 
 * Exit codes:
 * - 0: All bundles within limits
 * - 1: One or more bundles exceeded limits
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import * as terser from 'terser';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

// Size thresholds (in bytes)
// For each entry we enforce raw and gzip limits
const THRESHOLDS = {
  'packages/react/dist/index.js': { raw: 25 * 1024, gzip: 9 * 1024 }, // 25KB raw, 9KB gzip
  'packages/core/dist/index.js': { raw: 15 * 1024, gzip: 6 * 1024 }, // 15KB raw, 6KB gzip
  'packages/tokens/dist/index.js': { raw: 8 * 1024, gzip: 4 * 1024 }, // 8KB raw, 4KB gzip
};

// Individual component size thresholds
const COMPONENT_THRESHOLD = 8 * 1024; // 8 KB per component



/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (err) {
    return null;
  }
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gzip size for a buffer or string
 */
function gzipSize(buffer) {
  return zlib.gzipSync(buffer).length;
}

/**
 * Minified size using terser
 */
function minifiedSize(code) {
  const res = terser.minify(code, { module: true });
  if (res.error) throw res.error;
  return Buffer.byteLength(res.code, 'utf8');
}

/**
 * Check if size is within limit
 */
function checkSize(filePath, thresholds, name) {
  const size = getFileSize(filePath);
  
  if (size === null) {
    console.log(`${colors.yellow}⚠ ${name}: File not found${colors.reset}`);
    console.log(`  Expected: ${filePath}`);
    return true; // Don't fail CI if file doesn't exist yet
  }

  const code = fs.readFileSync(filePath, 'utf8');
  let minSize;
  try {
    minSize = minifiedSize(code);
  } catch (err) {
    console.log(`${colors.yellow}⚠ ${name}: minification failed (${err.message})${colors.reset}`);
    minSize = Buffer.byteLength(code, 'utf8');
  }
  const gzSize = gzipSize(code);

  const rawPass = size <= thresholds.raw;
  const gzPass = gzSize <= thresholds.gzip;

  const rawStatus = rawPass ? '✓' : '✗';
  const gzStatus = gzPass ? '✓' : '✗';

  console.log(
    `${name} raw: ${formatBytes(size)} / ${formatBytes(thresholds.raw)} ${rawPass ? colors.green : colors.red}${rawStatus}${colors.reset}`
  );
  console.log(
    `${name} gzip: ${formatBytes(gzSize)} / ${formatBytes(thresholds.gzip)} ${gzPass ? colors.green : colors.red}${gzStatus}${colors.reset}`
  );

  if (!rawPass) {
    const over = formatBytes(size - thresholds.raw);
    console.log(`  ${colors.red}Raw exceeds limit by ${over}${colors.reset}`);
  }
  if (!gzPass) {
    const over = formatBytes(gzSize - thresholds.gzip);
    console.log(`  ${colors.red}Gzip exceeds limit by ${over}${colors.reset}`);
  }

  return rawPass && gzPass;
}

/**
 * Main check function
 */
function main() {
  console.log(`${colors.cyan}=== Bundle Size Validation ===${colors.reset}\n`);

  let allPass = true;

  // Check main entry points (raw + gzip)
  console.log(`${colors.cyan}Main Entry Points:${colors.reset}`);
  for (const [filePath, thresholds] of Object.entries(THRESHOLDS)) {
    const fullPath = path.join(process.cwd(), filePath);
    const packageName = filePath.split('/')[1] || 'root';
    const pass = checkSize(fullPath, thresholds, `@orbi/${packageName}`);
    if (!pass) allPass = false;
  }

  console.log();

  // Check individual component modules
  console.log(`${colors.cyan}Component Modules (${formatBytes(COMPONENT_THRESHOLD)} each):${colors.reset}`);
  const componentsDir = path.join(process.cwd(), 'packages/react/dist');
  
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');
    
    if (jsFiles.length > 0) {
      jsFiles.forEach(file => {
        const filePath = path.join(componentsDir, file);
        const componentName = file.replace('.js', '');
        const pass = checkSize(filePath, COMPONENT_THRESHOLD, `  ${componentName}`);
        if (!pass) allPass = false;
      });
    } else {
      console.log('  (No component modules found)');
    }
  }

  console.log();

  // Summary
  if (allPass) {
    console.log(`${colors.green}✓ All bundles within size limits${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${colors.red}✗ Some bundles exceeded size limits${colors.reset}`);
    console.log('\nTo reduce bundle size:');
    console.log('  1. Remove unused dependencies from package.json');
    console.log('  2. Check for Tree-Shaking opportunities');
    console.log('  3. Verify build output with source maps');
    console.log('  4. Run: npm run build:react -- --analyze-size\n');
    process.exit(1);
  }
}

// Run checks
main();
