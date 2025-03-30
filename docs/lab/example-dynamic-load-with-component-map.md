# Example Component Dynamic Load with Component Map

## How React.lazy() Works

```typescript
const exampleComponents = {
  'App_default': lazy(() => import('../examples/App_default')),
  'hooks/use-effect/App_hooks-use-effect': lazy(() => import('../examples/hooks/use-effect/App_hooks-use-effect')),
};
```

The key behavior is:

1. The **import is not executed immediately** when this code runs
2. The import only happens **when the component is actually rendered** for the first time
3. React.lazy() returns a special component that triggers the dynamic import when it's rendered
4. This works with Suspense to show a fallback while loading

With this approach components are only loaded when they're actually needed, not when the mapping is created.

## Using `import`

 `import(/* @vite-ignore */` ../examples/${importPath}`)` has these characteristics:

1. It's fully dynamic - the path is constructed at runtime
2. It bypasses Vite's static analysis with `@vite-ignore`
3. It works well in development but causes issues in production builds

The React.lazy approach:

1. Still loads components dynamically when rendered
2. Allows Vite to statically analyze which files to include in the build
3. Works properly in both development and production

## Maintaining Dynamic Loading

Use Vite's glob import feature to create the mapping dynamically while still preserving lazy loading:

```typescript
// utils/createComponentMap.ts
// This creates a mapping of paths to lazy-loaded components
const componentMap = {};

// Use Vite's glob import feature to get all example components
const modules = import.meta.glob('./**.tsx');

// Create lazy-loaded components for each module
Object.entries(modules).forEach(([path, importFn]) => {
  const key = path.replace(/^\.\//, '').replace(/\.tsx$/, '');
  componentMap[key] = React.lazy(importFn);
});

export default componentMap;
```

Then in `Example.tsx`:

```typescript
import componentMap from '../utils/createComponentMap';

// Later in your useEffect:
const componentKey = path.replace(/\.tsx$/, "").replace(/^\.\//, "");
const Component = componentMap[componentKey];

if (Component) {
  setExampleComponent(() => Component);
  setLoading(false);
} else {
  setError(`Component not found: ${componentKey}`);
  setLoading(false);
}
```

## Best of Both Worlds

You can even create a more flexible solution that preserves your current dynamic approach for development but uses the static mapping for production:

```typescript
import React, { useState, Suspense, useEffect, lazy } from "react";
import { ExampleItem } from "../types/ExampleItem";
import componentMap from '../examples/componentMap';

function Example({ item }: ExampleProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ExampleComponent, setExampleComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Handle CSS files as before...
    
    const path = item.path || (item.paths && item.paths[item.paths.length - 1]);
    
    if (!path) {
      setError("No valid path found for this example");
      setLoading(false);
      return;
    }

    const componentKey = path.replace(/\.tsx$/, "").replace(/^\.\//, "");
    
    // Try to get the component from our mapping first
    const Component = componentMap[componentKey];
    
    if (Component) {
      setExampleComponent(() => Component);
      setLoading(false);
    } else {
      // Fall back to dynamic import for development or missing components
      const importPath = componentKey;
      
      import(/* @vite-ignore */ `../examples/${importPath}`)
        .then((module) => {
          setExampleComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          console.error(`Failed to load example: ${path}`, err);
          setError(`Failed to load example: ${path}. ${err.message}`);
          setLoading(false);
        });
    }
  }, [item]);

  // Rest of component as before...
}
```

This approach gives you the best of both worlds - proper production builds with Vite's static analysis, while still maintaining the flexibility of dynamic imports when needed.

## Difference Between Direct Dynamic Import and Using componentMap

Both approaches accomplish dynamic loading of components, but they have important differences:

### Direct Dynamic Import in Example.tsx

```typescript
import(/* @vite-ignore */ `../examples/${importPath}`)
  .then((module) => {
    setExampleComponent(() => module.default);
    setLoading(false);
  })
```

**Characteristics:**

1. **Runtime Path Resolution**: Uses string interpolation to determine the import path at runtime
2. **Manual Promise Handling**: You manually handle the promise resolution, errors, and state updates
3. **No Pre-compilation**: The `@vite-ignore` comment tells Vite not to analyze this import at build time
4. **Flexibility**: Can load components from paths determined completely at runtime
5. **No Code Splitting Optimization**: Vite can't optimize these imports during build

### Using componentMap Approach

```typescript
const Component = componentMap[componentKey];
// Then use <Component /> in your JSX
```

**Characteristics:**

1. **Build-time Path Collection**: All possible components are discovered at build time
2. **Automatic Code Splitting**: Vite automatically creates optimized chunks for each component
3. **Type Safety**: The componentMap provides type checking for component keys
4. **Simplified Usage**: No need to handle promises manually in your component
5. **Suspense Integration**: Works seamlessly with React.Suspense for loading states

### Key Advantages of componentMap

1. **Better Performance**: Vite can optimize the code splitting more effectively
2. **Cleaner Component Code**: No promise handling logic in your rendering components
3. **Type Safety**: TypeScript can validate the component keys at compile time
4. **Centralized Component Registry**: Single place to manage all dynamic components

## Summary:

The main tradeoff is that componentMap requires all possible components to be known at build time, while the direct dynamic import can handle truly dynamic paths determined only at runtime.