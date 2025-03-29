import MyComponent from "./MyComponent"; // Imported immediately

const App = () => (
  <div>
    <h1>Regular component import</h1>
    <MyComponent /> {/* Always loaded, even if not needed */}
  </div>
);

export default App;

/**
 * 🔥 What Happens Here?

1. On Initial Page Load:
    - `MyComponent.js` is downloaded because it is imported at the top.
    - The app loads the main bundle (e.g., App.js) and `MyComponent.js`.

2. Even if `MyComponent` is not used in the app, it's still downloaded.


  ✅ Key Takeaways:
   - MyComponent.js is included in the initial bundle and loads immediately
     whether it's visible or not.

 */