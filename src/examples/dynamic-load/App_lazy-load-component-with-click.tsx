import { lazy, Suspense, useState } from "react";

const MyComponent = lazy(() => import("./MyComponent.tsx"));

const App = () => {
  const [show, setShow] = useState(false);
  const [hasBeenShownBefore, setHasBeenShownBefore] = useState(false);

  // simple check if component has been shown before
  const handleClick = () => {
    if (!hasBeenShownBefore && !show) {
      setHasBeenShownBefore(true);
    }
    setShow(true);
  };

  return (
    <div>
      <h1>Load component after it is added to the DOM</h1>
      <p>using <code>React.lazy()</code></p>
      <button onClick={handleClick}>Load Component</button>

      {hasBeenShownBefore ? (
        <p>Notice: Component is already in memory.
          <br/>Clicking will skip the loading next time this component is rendered.
          <br/>(Reload the whole page to reset)
        </p>
      ) : (
        <p>Tip: Open network dev tools before clicking the button</p>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        {show && <MyComponent />} {/* Loaded only when 'show' is true */}
      </Suspense>
    </div>
  );
};

export default App;

/**
 * 🔥 What Happens Here?s

1. On Initial Page Load:
    - `MyComponent.js` is not downloaded because it is wrapped in `React.lazy()`.
    - The app only loads the main bundle (e.g., App.js).

2. When Button is Clicked (setShow(true)):
    - `MyComponent` enters the React tree for the first time.
    - At this moment, React triggers a network request to fetch `MyComponent.js`.
    - The Suspense fallback (Loading...) is shown until the component loads.

3. On Subsequent Renders:
    - If `show` is toggled off and on again, `MyComponent.js` does not reload because
     it was already loaded into memory.


  ✅ Key Takeaways:

  - Lazy loading delays fetching the component until it's actually needed.
  - The first render triggers the network request, which is why there may be a visible delay.
  - Once loaded, the component stays in memory, so it doesn't need to be reloaded.

 */