import { useState } from "react";
import DynamicComponent from "./MyDynamicComponent";

export default function App() {
  const [path, setPath] = useState("./MyComponent.tsx");

  return (
    <div>
      <h1>Load compenent with dynamic import</h1>
      <p>using <code>DynamicComponent</code></p>
      <button onClick={() => setPath("./MySlowComponent.tsx")}>
        Load Another Component
      </button>
      <DynamicComponent filePath={path} />
    </div>
  );
};

/**
 * NOTE: example is simplified
 * DynamicComponent does not support relative or other than current paths.
 */