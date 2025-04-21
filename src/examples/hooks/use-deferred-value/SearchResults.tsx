import { useDeferredValue, useMemo, use } from 'react';
import { albumService } from "./albums";

export default function SearchResult({ query }: { query: string }) {
  // Defer the query value to avoid blocking the UI during typing
  const deferredQuery = useDeferredValue(query);

  // Create the promise for the deferred query
  const albumPromise = useMemo(() =>
    albumService(deferredQuery),
    [deferredQuery]
  );

  // Use the promise directly with the use() hook
  const results = use(albumPromise);

  return (
    <div>
      {query === '' ? (
        <p>Start typing to search albums</p>
      ) : (
        <ul>
          {results.length > 0 ? (
            results.map(result => (
              <li key={result.id}>{result.title}</li>
            ))
          ) : (
            // this will blink the result in between getting the results
            <li>No albums found</li>
          )}
        </ul>
      )}
    </div>
  );
}
