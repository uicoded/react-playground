import { useDeferredValue, useMemo, use } from 'react';
import { albumService } from "./albums";

export default function SearchResult({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  const albumPromise = useMemo(() =>
    albumService(deferredQuery),
    [deferredQuery]
  );

  const albums = use(albumPromise);

  return (
    <div>
      {query === '' ? (
        <p>Start typing to search albums</p>
      ) : (
        <>
          {query !== deferredQuery ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {albums.length > 0 ? (
                albums.map(result => (
                  <li key={result.id}>{result.title}</li>
                ))
              ) : (
                <li>No albums found</li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
