import { use, Suspense } from "react";
// import { useState, useEffect, Suspense } from 'react' // use for the second example

// response returns a promise that resolves after delay
import { getResponse, ResponseData } from "./response";

// ✅ All Promises need to be defined outside the component
// Ideally create a cached promise (not shown here)
const responsePromise = getResponse('earth');
// Both will fail on exception
// const responsePromise = getResponse("error"); // 👈 this intentionally throws an error. Otherwise it should be deatlh witn inside the resource
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
    <Suspense fallback={<div>loading message details..</div>}>
      <Message />
    </Suspense>
  );
}

/**
 * Because Message is wrapped in Suspense, the fallback will be displayed until the Promise is resolved.
 * When the Promise is resolved, the value will be read by the `use` API and the Message component will
 * replace the Suspense fallback.
 */
