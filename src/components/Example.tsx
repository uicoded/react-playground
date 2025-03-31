import React, { useState, Suspense, useEffect } from "react";
import { ExampleItem } from "../types/ExampleItem";
import exampleMap from "../utils/exampleMap";
import isValidPath from "../utils/isValidPath";

type ExampleProps = {
  item: ExampleItem;
};

function Example({ item }: ExampleProps) {
  const [error, setError] = useState<string | null>(null);
  const [ExampleComponent, setExampleComponent] = useState<React.ComponentType | null>(null);

  const loadExample = () => {
    setError(null);

    // Find the TSX file to load as the component
    const path = item.path || (item.paths && item.paths.find(p => p.endsWith('.tsx')));

    if (!path) {
      setError("No valid path found for this example");
      return;
    }

    if (!isValidPath(path)) {
      setError(`Invalid path: ${path}`);
      return;
    }

    console.log(`Attempting to load component: ${path}`);
    console.log('Available components:', Object.keys(exampleMap));

    // Load CSS files if they exist in the paths array
    if (item.paths) {
      const cssFiles = item.paths.filter((p) => p.endsWith(".css"));
      cssFiles.forEach((cssPath) => {
        if (isValidPath(cssPath)) {
          try {
            // Dynamically import the CSS
            import(`../examples/${cssPath.replace('.css', '')}.css`).catch((err) => {
              console.error(`Failed to load CSS: ${cssPath}`, err);
            });
          } catch (err) {
            console.error(`Error importing CSS: ${cssPath}`, err);
          }
        } else {
          console.warn(`Invalid CSS path: ${cssPath}`);
        }
      });
    }

    // Check if the component exists in exampleMap
    if (exampleMap[path]) {
      console.log(`Loading component from exampleMap: ${path}`);
      setExampleComponent(() => exampleMap[path]);
    } else {
      console.log(`Component not found in exampleMap, path: ${path}`);
      // console.log(`Component not found in exampleMap, trying direct import: ${path}`);
      // Try to import if not in the map
      // try {
      //   const componentPath = path.replace('.tsx', '');

      //   // Create a dynamic import with a specific chunk name
      //   const LazyComponent = React.lazy(() =>
      //     import(/* @vite-ignore */ `../examples/${componentPath}.tsx`)
      //       .catch(err => {
      //         console.error(`Failed to dynamically import: ${path}`, err);
      //         setError(`Component not found: ${path}. Error: ${err instanceof Error ? err.message : String(err)}`);
      //         return { default: () => null };
      //       })
      //   );

      //   setExampleComponent(() => LazyComponent);
      // } catch (err) {
      //   console.error(`Failed to dynamically import: ${path}`, err);
      //   setError(`Component not found: ${path}. Error: ${err instanceof Error ? err.message : String(err)}`);
      // }
    }
  };

  useEffect(() => {
    loadExample();
  }, [item]);

  if (error) {
    return <div className="example"><div className="error">{error}</div></div>;
  }

  return (
    <div className="example">
      {ExampleComponent && (
        <div className="example-content">
          <Suspense fallback={<div>Loading component...</div>}>
            <ExampleComponent />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default Example;
