export default function isValidPath(path: string): boolean {
  // Basic validation to prevent path traversal
  return !path.includes('..') &&
         !path.startsWith('/') &&
         (path.endsWith('.tsx') || path.endsWith('.css'));
}