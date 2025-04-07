export default function isValidPath(path: string): boolean {
  try {
    // Basic validation to prevent path traversal
    return !path.includes('..') &&
           !path.startsWith('/') &&
           (path.endsWith('.tsx') || path.endsWith('.css'));
  } catch (error) {
    console.error('Error validating path:', path, error);
    return false;
  }
}
