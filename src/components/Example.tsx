import React, { useState, Suspense, useEffect, useRef } from "react";
import { ExampleItem } from "../types/ExampleItem";
import exampleMap from "../utils/exampleMap";
import isValidPath from "../utils/isValidPath";

type ExampleProps = {
  item: ExampleItem;
};

function Example({ item }: ExampleProps) {
  const [error, setError] = useState<string | null>(null);
  const [ExampleComponent, setExampleComponent] = useState<React.ComponentType | null>(null);
  const cssLinksRef = useRef<HTMLLinkElement[]>([]);

  // Clean up any previously added CSS links
  const cleanupCssLinks = () => {
    cssLinksRef.current.forEach(link => {
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
    cssLinksRef.current = [];
  };

  const loadExample = () => {
    setError(null);
    cleanupCssLinks();

    // Ensure paths is always an array
    const paths = item.paths || [];

    if (paths.length === 0) {
      setError("No paths found for this example");
      return;
    }

    // Find the TSX file to load as the component
    const tsxPath = paths.find(p => p.endsWith('.tsx'));

    if (!tsxPath) {
      setError("No valid TSX file found for this example");
      return;
    }

    if (!isValidPath(tsxPath)) {
      setError(`Invalid path: ${tsxPath}`);
      return;
    }

    console.log(`Attempting to load component: ${tsxPath}`);
    console.log('Available components:', Object.keys(exampleMap));

    // Load CSS files if they exist in the paths array
    const cssFiles = paths.filter((p) => p.endsWith(".css"));
    cssFiles.forEach((cssPath) => {
      if (isValidPath(cssPath)) {
        try {
          // Create a link element for the CSS
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';

          // Use the base path from Vite config
          const baseUrl = import.meta.env.BASE_URL || '/';

          // In development, we need to point to the source files
          // In production, we point to the built files
          const examplesPath = import.meta.env.DEV
          ? `${baseUrl}src/examples/`
          : `${baseUrl}examples/`;

          link.href = `${examplesPath}${cssPath}`;
          document.head.appendChild(link);

          // Store the link for later cleanup
          cssLinksRef.current.push(link);
          console.log(`CSS link added: ${cssPath}`);
        } catch (err) {
          console.error(`Error loading CSS: ${cssPath}`, err);
        }
      } else {
        console.warn(`Invalid CSS path: ${cssPath}`);
      }
    });

    // Check if the component exists in exampleMap
    if (exampleMap[tsxPath]) {
      console.log(`Loading component from exampleMap: ${tsxPath}`);
      setExampleComponent(() => exampleMap[tsxPath]);
    } else {
      console.log(`Component not found in exampleMap, path: ${tsxPath}`);
      // The commented-out dynamic import code is preserved but not used
      // as per the original implementation
    }
  };

  useEffect(() => {
    loadExample();

    // Cleanup function to remove CSS links when component unmounts or example changes
    return () => {
      cleanupCssLinks();
    };
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
