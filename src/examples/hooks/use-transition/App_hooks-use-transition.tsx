import { useState, useTransition, use, Suspense } from 'react'
// response returns a promise that resolves after delay
import { getResponse, type ResponseData } from '../../../examples/suspense/response'
import { ErrorBoundary } from 'react-error-boundary';

// Define Planet type
type Planet = 'earth' | 'mars';

// Create a single cache to store data promises by planet or error
const dataCache = new Map<Planet | 'error', Promise<ResponseData>>();

// Function to get a cached promise for a planet's data
function getPlanetData(planetOrError: Planet | 'error') {
  if (!dataCache.has(planetOrError)) {
    // Create a promise that resolves to the parsed JSON data
    const dataPromise = getResponse(planetOrError)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        return response.json() as Promise<ResponseData>;
      });

    dataCache.set(planetOrError, dataPromise);
  }

  return dataCache.get(planetOrError)!;
}

// Custom hook to handle the data fetching
function usePlanetData(planetOrError: Planet | 'error'): string {
  // ✅ Use the cached data promise or fetch it if not available
  // ✅ Take advantage of suspense by using use()
  const data = use(getPlanetData(planetOrError));
  return data.data;
}

// Message component accepts planet or error
function Message({ planetOrError }: { planetOrError: Planet | 'error' }) {
  const data = usePlanetData(planetOrError);
  return <div>{data}</div>;
}

export default function App() {
  // ✅ Use the useTransition hook to manage transition
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Planet | 'error' | ''>('');

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as Planet | 'error' | '';

    startTransition(() => {
      setSelected(value);
    });
  }

  return (
    <>
      <div>
        <label htmlFor="planet-select">Choose a planet: </label>
        <select
          id="planet-select"
          value={selected}
          onChange={handleSelectChange}
          disabled={isPending}
        >
          <option value="">--Select a planet--</option>
          <option value="earth">Earth</option>
          <option value="mars">Mars</option>
          <option value="error">Error Example</option>
        </select>

        {isPending && <p>⏳ Transition in progress...</p>}
      </div>

      {selected && (
        <ErrorBoundary fallback={<div>☠️ Error loading planet data</div>}>
          <Suspense fallback={<div>loading message details..</div>}>
            <Message planetOrError={selected} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}

/**
  * useTransition hook advantages:
  * 1. Allows marking state updates as non-urgent transitions
  * 2. Prevents UI freezing during heavy updates
  * 3. Shows pending state while transition is in progress
  * 4. Keeps UI responsive by not blocking user interactions
  * 5. Works well with Suspense for loading states 👈
  * 6. Helps prioritize urgent updates over non-urgent ones
  */
