export function joinStringsToSentence(strings: string[]): string {
  const formattedStrings = strings.map((str, index) => {
    const stringWithQuotes = `"${str}"`;
    if (index === strings.length - 1) return stringWithQuotes;
    return `${stringWithQuotes}, `;
  });
  return formattedStrings.join('');
}
