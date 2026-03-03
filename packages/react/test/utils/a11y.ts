/**
 * Accessibility Testing Utilities
 * 
 * Provides reusable helpers for running axe accessibility checks
 * within vitest + @testing-library/react test suites.
 */

import { AxeResults, run } from 'axe-core';
import { RenderResult } from '@testing-library/react';

/**
 * Run axe accessibility audit on a DOM container
 * @param container - HTML element to audit
 * @returns Promise<AxeResults> - axe results object
 */
export async function runAxe(container: HTMLElement): Promise<AxeResults> {
  return new Promise((resolve, reject) => {
    run(container, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

/**
 * Render component and run axe audit
 * @param render - Test component render result
 * @returns Promise<AxeResults> - axe results object
 */
export async function renderWithAxe(render: RenderResult): Promise<AxeResults> {
  return await runAxe(render.container);
}

/**
 * Assert that axe found no violations
 * @param results - axe AxeResults object
 */
export function expectNoAxeViolations(results: AxeResults) {
  const violations = results.violations || [];
  if (violations.length > 0) {
    const details = violations
      .map((v: any) => `- ${v.id}: ${v.description}`)
      .join('\n');
    throw new Error(`Expected no a11y violations, but found ${violations.length}:\n${details}`);
  }
}

/**
 * Utility: Assert no a11y violations on component
 * Combines runAxe + expectNoAxeViolations into one step
 */
export async function assertAccessible(container: HTMLElement): Promise<AxeResults> {
  const results = await runAxe(container);
  expectNoAxeViolations(results);
  return results;
}
