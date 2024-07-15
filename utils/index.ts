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
