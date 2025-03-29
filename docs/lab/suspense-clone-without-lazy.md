 # Suspense clone without using lazy

This mimics Suspense functionality without using React.lazy(), but instead by manually implementing a similar pattern with the dynamic import.

```typescript
import React, { useState, useEffect } from "react";

// Custom implementation to mimic Suspense functionality
class ComponentLoader {
  private promise: Promise<any> | null = null;
  private result: any = null;
  private error: Error | null = null;

  constructor(private filePath: string) {
    this.load();
  }

  load() {
    if (!this.promise) {
      this.promise = import(/* @vite-ignore */ `${this.filePath}`)
        .then(module => {
          this.result = module.default;
          return module.default;
        })
        .catch(err => {
          this.error = err;
          throw err;
        });
    }
    return this.promise;
  }

  getComponent() {
    if (this.error) throw this.error;
    if (!this.result) throw this.promise;
    return this.result;
  }
}

// Custom hook to use our loader
function useComponentLoader(filePath: string) {
  const [, forceUpdate] = useState({});
  const loaderRef = React.useRef<ComponentLoader | null>(null);
  
  if (!loaderRef.current || loaderRef.current.filePath !== filePath) {
    loaderRef.current = new ComponentLoader(filePath);
  }
  
  useEffect(() => {
    let mounted = true;
    loaderRef.current?.load()
      .then(() => {
        if (mounted) forceUpdate({});
      })
      .catch(() => {
        if (mounted) forceUpdate({});
      });
    return () => { mounted = false; };
  }, [filePath]);

  return loaderRef.current;
}

// Custom Suspense implementation
export function CustomSuspense({ 
  fallback, 
  children 
}: { 
  fallback: React.ReactNode, 
  children: React.ReactNode 
}) {
  const [error, setError] = useState<Error | null>(null);
  
  try {
    if (error) throw error;
    return <>{children}</>;
  } catch (e) {
    if (e instanceof Promise) {
      e.then(
        () => setError(null),
        (err) => setError(err)
      );
      return <>{fallback}</>;
    }
    // For other errors, rethrow
    throw e;
  }
}

export default function DynamicComponent({ filePath }: { filePath: string }) {
  const loader = useComponentLoader(filePath);
  
  try {
    const Component = loader.getComponent();
    return <Component />;
  } catch (e) {
    if (e instanceof Promise) {
      // This will be caught by the CustomSuspense component
      throw e;
    }
    // Handle error case
    return <div>Error loading component: {(e as Error).message}</div>;
  }
}
```

App component using custom Suspense implementation:

```typescript
import { useState } from "react";
import DynamicComponent, { CustomSuspense } from "./MyDynamicComponent";

export default function App() {
  const [path, setPath] = useState("MyComponent.tsx");

  return (
    <div>
      <button onClick={() => setPath("MySlowComponent.tsx")}>
        Load Another Component
      </button>
      
      <CustomSuspense fallback={<div>Loading component...</div>}>
        <DynamicComponent filePath={path} />
      </CustomSuspense>
    </div>
  );
}
```

This implementation mimics React's Suspense pattern by:

1. Creating a loader class that manages the dynamic import promise
2. Throwing the promise when the component is not yet loaded (similar to how React.lazy works)
3. Catching that promise in the CustomSuspense component and showing a fallback
4. Re-rendering once the promise resolves

Note: The real [Suspense](https://react.dev/reference/react/Suspense) implementation is more complex and handles various edge cases, but this should demonstrate the core concept.