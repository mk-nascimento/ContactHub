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
export const pathnameToTitle = (str: string) => str.slice(1).replace(/\b\w/g, (match) => match.toUpperCase());

/**
 * Formats a phone number input in the format "(XX) X XXXX XXXX".
 *
 * @param {React.FormEvent<HTMLInputElement>} event - The event object containing the input element.
 * @returns {React.FormEvent<HTMLInputElement>} The modified event object with the formatted phone number.
 */
export const phoneMask = (event: React.FormEvent<HTMLInputElement>): React.FormEvent<HTMLInputElement> => {
  event.currentTarget.minLength = event.currentTarget.maxLength = 15;

  if (!RegExp(/^\(\d{2}\)\s*\d\s*\d{4}\s\d{4}$/).exec(event.currentTarget.value))
    event.currentTarget.value = event.currentTarget.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})(\d{4})$/, '$1 $2 $3');

  return event;
};
