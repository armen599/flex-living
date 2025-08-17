/**
 * Utility functions for generating and managing unique IDs
 */

let globalIdCounter = 100000;

/**
 * Generate a unique ID for reviews
 * @param prefix - Optional prefix for the ID
 * @returns A unique numeric ID
 */
export function generateUniqueId(prefix?: string): number {
  globalIdCounter += 1;
  return globalIdCounter;
}

/**
 * Generate a unique ID with a specific prefix
 * @param prefix - The prefix to use
 * @returns A unique string ID
 */
export function generateUniqueStringId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Ensure a collection of items has unique IDs
 * @param items - Array of items with ID properties
 * @param idField - The field name for the ID (default: 'id')
 * @returns Array with unique IDs
 */
export function ensureUniqueIds<T extends { [key: string]: any }>(
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

/**
 * Reset the global ID counter (useful for testing)
 */
export function resetIdCounter(): void {
  globalIdCounter = 100000;
}

/**
 * Get the current ID counter value
 */
export function getCurrentIdCounter(): number {
  return globalIdCounter;
} 