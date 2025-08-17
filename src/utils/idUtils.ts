/**
 * Utility functions for generating and managing unique IDs
 */

/**
 * Generate a unique ID
 * @returns A unique numeric ID
 */
export function generateUniqueId(): number {
  return Date.now() + Math.random();
}

/**
 * Generate a unique string ID
 * @returns A unique string ID
 */
export function generateUniqueStringId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Ensure a collection of items has unique IDs
 * @param items - Array of items with ID properties
 * @param idField - The field name for the ID (default: 'id')
 * @returns Array with unique IDs
 */
export function ensureUniqueIds<T extends { [key: string]: number }>(
  items: T[],
  idField: string = 'id'
): T[] {
  const existingIds = new Set<number>();
  const result: T[] = [];

  for (const item of items) {
    let currentId = item[idField];

    // If ID already exists, generate a new unique one
    while (existingIds.has(currentId)) {
      currentId = generateUniqueId();
    }

    existingIds.add(currentId);
    result.push({ ...item, [idField]: currentId });
  }

  return result;
} 