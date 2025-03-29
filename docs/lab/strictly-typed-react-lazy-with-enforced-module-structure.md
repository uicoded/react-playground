# Strictly Typed React.lazy() with Enforced Module Structure

Enforce the module structure using an explicit type guard for the imported component.

```tsx
import React, { Suspense } from "react";

// Define the props for the lazy-loaded component
interface MyComponentProps {
  title: string;
}

// Define the expected module structure
type MyComponentModule = { default: React.ComponentType<MyComponentProps> };

// Enforce the correct module type
const loadMyComponent = (): Promise<MyComponentModule> =>
  import("./MyComponent") as Promise<MyComponentModule>;

const MyComponent = React.lazy(loadMyComponent);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent title="Hello, React.lazy!" />
    </Suspense>
  );
};

export default App;
```

Why is it strict?

1. Explicit type MyComponentModule:
  - Ensures that the imported module has a default export of the correct type.

2. Type Assertion on import():
  - Prevents accidental mismatches where the module does not contain a default export or has incorrect props.

3. Encapsulated Import Function (loadMyComponent):
  - Provides better type safety and improves readability.