/**
 * @file Utils
 */

/**
 * Wait for a given amount of time
 * @param ms - Time to wait in milliseconds
 * @returns Promise that resolves after the given time
 */
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert kekab-case to PascalCase
 * @param str - String to convert
 * @returns PascalCase string
 */
export function pascalCase(str: string) {
  return str.split('-').map(capitalize).join('')
}
