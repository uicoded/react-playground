import { use, Suspense } from 'react'
// response returns a promise that resolves after delay
import { response } from './response'

// With use hook - clean and concise
function Message() {
  // use() can be used with promises and context
  const details = use(response) as { data: string };
  return <p>{details.data}</p>
}

/**  * /
// Without use hook - more verbose, same functionality
function Message() {
  const [details, setDetails] = useState<{ data: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  if (!details && !error) {
    // This pattern triggers suspense by throwing the promise
    throw response.then(
      (result) => setDetails(result),
      (err) => setError(err)
    );
  }

  if (error) throw error;

  return <p>{details?.data}</p>;
}
/**  */

export default function App() {
	return (
		<Suspense fallback={<div>loading message details..</div>}>
			<Message />
		</Suspense>
	)
}

/**
 * Because Message is wrapped in Suspense, the fallback will be displayed until the Promise is resolved.
 * When the Promise is resolved, the value will be read by the `use` API and the Message component will
 * replace the Suspense fallback.
 */
