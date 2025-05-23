import { LazyComponent } from '../types/LazyComponent';
// Generated by `npm run prebuild`
import generatedImports from './generatedImports';

// This creates a mapping of paths to lazy-loaded components
const exampleMap: Record<string, LazyComponent> = { ...generatedImports };

// Debug: Log all registered components
console.log('Registered components:', Object.keys(exampleMap));

export default exampleMap;
