import React from 'react';
import { LazyComponent } from '../types/LazyComponent';

// This creates a mapping of paths to lazy-loaded components
const componentMap: Record<string, LazyComponent> = {};

// Use Vite's glob import feature to get all example components
const modules = import.meta.glob('../components/**.tsx');

// Create lazy-loaded components for each module
Object.entries(modules).forEach(([path, importFn]) => {
  const key = path.replace(/^\.\//, '').replace(/\.tsx$/, '');
  componentMap[key] = React.lazy(() => importFn() as Promise<{ default: React.ComponentType<any> }>);
});

export default componentMap;
