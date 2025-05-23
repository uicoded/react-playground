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
  /*
  ✅ Use the useTransition hook to manage transition by getting handle of pending state and startTransition function.

  https://react.dev/reference/react/useTransition

  👉 Use it to prevent certain UI updates when component is suspended (here disable the select when data is loading)
  👉 Use it to mark state updates as non-urgent transitions, allowing React to prioritize more critical updates
    (e.g., user interactions like typing or clicking) to keep the UI responsive.

  `isPending`: A boolean indicating whether the transition is in progress.
  `startTransition`: A function you wrap around state updates to mark them as transitions.

  - Wrap state updates in startTransition(() => { ... }) to mark them as non-urgent.
  - React processes these updates in the background, prioritizing urgent updates (e.g., direct user input) first.
  - While the transition is pending, isPending is true, allowing you to show a loading state.
  - If the component is wrapped in a <Suspense> boundary (for cases like lazy-loaded components or data fetching),
    React can show a fallback UI while the transition is pending.
  */
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Planet | 'error' | ''>('');

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as Planet | 'error' | '';
    // ✅ Mark this state update as a transition
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
  * - Allows marking state updates as non-urgent transitions
  * - Prevents UI freezing during heavy updates
  * - Shows pending state while transition is in progress
  * - Keeps UI responsive by not blocking user interactions
  * - Works well with Suspense for loading states 👈
  * - Helps prioritize urgent updates over non-urgent ones
  *
  * Common Pitfalls:
  * - Don’t Use for Urgent Updates: Avoid wrapping critical updates (like form submissions or immediate UI feedback)
  *   in startTransition, as they might be delayed.
  * - Suspense Boundaries: If you’re using useTransition with dynamic imports or data fetching,
  *   ensure the component is wrapped in a <Suspense> boundary, or the app might not behave as expected.
  * - Not a Replacement for Debouncing: If you need to limit the frequency of updates (e.g., for search inputs),
  *   you might still need debouncing or throttling in addition to useTransition.
  */
