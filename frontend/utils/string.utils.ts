/**
 * Capitalizes the first letter of pathname.
 *
 * @param str - The input string to be modified.
 * @returns The modified string with the first letter of each word capitalized.
 *
 * @example
 * const result = pathnameToTitle("hello world");
 * console.log(result); // Output: "Hello World"
 */
export const pathnameToTitle = (str: string) =>
  str.slice(1).replace(/\b\w/g, (match) => match.toUpperCase());
