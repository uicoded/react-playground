import React, { useState, Suspense, useEffect } from "react";
import { ExampleItem } from "../types/ExampleItem";

type ExampleProps = {
  item: ExampleItem;
};

function Example({ item }: ExampleProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ExampleComponent, setExampleComponent] = useState<React.ComponentType | null>(null);

  const loadExample = () => {
    setLoading(true);
    setError(null);

    // Load CSS files if they exist in the paths array
    if (item.paths) {
      const cssFiles = item.paths.filter((p) => p.endsWith(".css"));
      cssFiles.forEach((cssPath) => {
        if (isValidPath(cssPath)) {
          const importPath = cssPath.replace(/^\.\//, "");

          // Dynamically import the example component
          // @vite-ignore is used to prevent Vite from processing the path statically.
          import(/* @vite-ignore */ `../examples/${importPath}`).catch((err) => {
            console.error(`Failed to load CSS: ${cssPath}`, err);
          });
        } else {
          setError(`Invalid CSS path: ${cssPath}`);
          setLoading(false);
        }
      });
    }

    // Find the TSX file to load as the component
    // In case of paths array, use the last path (put the tsx last after css files)
    // Currently only single txs file is supported
    const path = item.path || (item.paths && item.paths[item.paths.length - 1]);

    if (!path) {
      setError("No valid path found for this example");
      setLoading(false);
      return;
    }

    const tsxPath = item.paths ? item.paths.find((p) => p.endsWith(".tsx")) || path : path;

    if (isValidPath(tsxPath)) {
      // Convert the path to a format that can be used with dynamic imports
      const importPath = tsxPath.replace(/\.tsx$/, "").replace(/^\.\//, "");

      // Dynamically import the example component
      // @vite-ignore is used to prevent Vite from processing the path statically.
      import(/* @vite-ignore */ `../examples/${importPath}`)
        .then((module) => {
          setExampleComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          console.error(`Failed to load example: ${tsxPath}`, err);
          setError(`Failed to load example: ${tsxPath}. ${err.message}`);
          setLoading(false);
        });
    } else {
      setError(`Invalid path: ${tsxPath}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExample();
  }, [item]);

  return (
    <div className="example">
      {error && <div>{error}</div>}

      {!loading && !error && ExampleComponent && (
        <div className="example-content">
          <Suspense fallback={<div>loading</div>}>
            <ExampleComponent />
          </Suspense>
        </div>
      )}
    </div>
  );
}

// Helper function to validate path format
function isValidPath(path: string): boolean {
  // Validate path format - only allow alphanumeric characters, underscores, hyphens, and forward slashes
  // Prevent path traversal attacks by disallowing ".." in paths
  return (
    Boolean(path) &&
    /^[a-zA-Z0-9_\-\/\.]+$/.test(path) && // Note: added dot to allow file extensions
    !path.includes("..")
  );
}

export default Example;
