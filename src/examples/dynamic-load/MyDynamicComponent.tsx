import React, { useState, useEffect } from "react";

export default function DynamicComponent({ filePath }: { filePath: string }) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filePath) return;

    // Convert the path to a format that can be used with dynamic imports
    filePath = filePath.replace(/\.tsx$/, "").replace(/^\.\//, "");

    let isMounted = true;  // Flag initialized to true when effect runs

    // Set loading to true at the start of the import
    setLoading(true);

    import(/* @vite-ignore */ `./${filePath}`)
      .then((mod) => {
        if (isMounted) {  // Only update state if component is still mounted
          setComponent(() => mod.default);
          setLoading(false);  // Set loading to false on success
        }
      })
      .catch((err) => {
        console.error("Error loading component:", err);
        if (isMounted) {  // Only update state if component is still mounted
          setError(err);
          setLoading(false);  // Set loading to false on error
        }
      });

    return () => {
      isMounted = false;  // Set flag to false when component unmounts or effect re-runs
    };
  }, [filePath]);

  if (loading) return <div>Loading component...</div>;
  if (error) return <div>Error loading component: {error.message}</div>;
  if (!Component) return <div>Component not found</div>;

  return <Component />;
}


/**
 * Why use isMounted = true?

 1. Prevents memory leaks: When a component unmounts while an asynchronous operation
 (like dynamic imports) is still pending, the component might try to update state after
  it's no longer in the DOM.

 2. Avoids React warnings: Without this check, you might see warnings like:
"Can't perform a React state update on an unmounted component. This is a no-op,
 but it indicates a memory leak in your application."

 3. Handles race conditions: If the user navigates away quickly or the filePath prop changes rapidly, multiple async operations might be in flight simultaneously.
 */