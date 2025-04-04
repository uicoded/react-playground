import { use, Suspense } from 'react'
// import { useState, useEffect, Suspense } from "react"; // use for the second example

// response returns a promise that resolves after delay
import { getResponse, ResponseData } from "./response";
import { ErrorBoundary } from "react-error-boundary";

// ✅ All Promises need to be defined outside the component
// Ideally create a cached promise (not shown here)
// const responsePromise = getResponse('earth');
// Both will fail on exception
const responsePromise = getResponse("error"); // 👈 this intentionally throws an error. Otherwise it should be deatlh witn inside the resource
const dataPromise = responsePromise.then((res) => res.json());

/** 1. With use hook - clean and concise
 */
function Message() {
  // use() with cached promises
  const details = use(dataPromise) as ResponseData;
  return <p>{details.data}</p>;
}
/**  */

/**  * /
// 2. Without use hook - more verbose, same functionality
function Message() {
  const [details, setDetails] = useState<ResponseData | null>(null);

  useEffect(() => {
    dataPromise.then((data) => {
      setDetails(data);
    });
  }, []);

  if (!details) return null;
  return <p>{details.data}</p>;
}
/**  */

export default function App() {
  return (
    <ErrorBoundary fallback={<div>☠️ Error</div>}>
      <Suspense fallback={<div>loading message details..</div>}>
        <Message />
      </Suspense>
    </ErrorBoundary>
  );
}

/**
 * Because Message is wrapped in Suspense, the fallback will be displayed until the Promise is resolved.
 * When the Promise is resolved, the value will be read by the `use` API and the Message component will
 * replace the Suspense fallback.
 */

/**
  * Error Boundary
  * - Catches runtime errors during rendering, lifecycle methods, and constructors
  * - Displays a fallback UI instead of the crashed component tree
  * - Prevents the entire app from breaking when a component fails
  * - Only catches errors in components below it in the tree
  * - Does not catch errors in event handlers, async code, or SSR
  *
 * In this example:
 *  - catches errors in the Message component in both examples (1.,2.)
 *  - but the fallback does not work on Message using the useEffect hook ()
 */
