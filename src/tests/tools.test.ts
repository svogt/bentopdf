// toolCategories.test.ts

import { categories } from '@/js/config/tools';
import { describe, it, expect } from 'vitest';

describe('Tool Categories Configuration', () => {
  // 1. Basic Structure and Type Checking
  it('should be an array of category objects', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  // 2. Loop through each category to perform specific checks
  describe.each(categories)('Category: "$name"', (category) => {
    // Check that the category object itself is well-formed
    it('should have a non-empty "name" string and a non-empty "tools" array', () => {
      expect(typeof category.name).toBe('string');
      expect(category.name.length).toBeGreaterThan(0);
      expect(Array.isArray(category.tools)).toBe(true);
      expect(category.tools.length).toBeGreaterThan(0);
    });

    // **KEY CHANGE**: This test now ensures IDs are unique only WITHIN this specific category.
    it('should not contain any duplicate tool IDs within its own list', () => {
      const toolIds = category.tools.map((tool: any) => tool.id || tool.href).filter(Boolean);
      const uniqueToolIds = new Set(toolIds);

      // This assertion checks for duplicates inside THIS category only.
      expect(uniqueToolIds.size).toBe(toolIds.length);
    });

    // 3. Loop through each tool inside the category to validate its schema
    describe.each(category.tools)('Tool: "$name"', (tool: any) => {
      it('should have the correct properties with non-empty string values', () => {
        // Check for property existence - tools should have either id or href
        expect(tool.id || tool.href).toBeTruthy();
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('icon');
        expect(tool).toHaveProperty('subtitle');

        // Check for non-empty string types for each property
        const identifier = tool.id || tool.href;
        expect(typeof identifier).toBe('string');
        expect(identifier.length).toBeGreaterThan(0);
        
        for (const key of ['name', 'icon', 'subtitle']) {
          const value = tool[key as keyof typeof tool];
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
