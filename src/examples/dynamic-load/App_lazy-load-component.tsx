import { lazy, Suspense } from "react";

const MyComponent = lazy(() => import("./MyComponent.tsx"));

const App = () => (
  <>
    <h1>Load component when rendered</h1>
    <p>using <code>React.lazy()</code></p>
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  </>
);

export default App;