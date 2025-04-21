import { useDeferredValue, useMemo, use } from 'react';
import { albumService } from "./albums";
import { useSpinDelay } from 'spin-delay';
import styles from './SearchResults.module.css';

export default function SearchResult({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  const albumPromise = useMemo(() =>
    albumService(deferredQuery),
    [deferredQuery]
  );

  const albums = use(albumPromise);

  // Delay messages to prevent UI interruptions
  const showStartTyping = useSpinDelay(query === '', {delay: 1500, minDuration: 1000})
  const showLoader = useSpinDelay(query !== deferredQuery, {delay: 300, minDuration: 500});
  const noAlbumsFound = useSpinDelay(albums.length === 0, {delay: 1600, minDuration: 200}); // delay needs to be longer than showStartTyping

  return (
    <div className={styles.container}>
      {showStartTyping ? (
        <p className={styles.message}>Start typing to search albums</p>
      ) : (
        <>
          {showLoader ? (
            <p className={styles.message}>Loading...</p>
          ) : (
            <ul className={`${styles.resultsList} ${albums.length === 0 ? styles.empty : ''}`}>
              {albums.length > 0 ? (
                albums.map((result, index) => (
                  <li
                    key={result.id}
                    className={styles.resultItem}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {result.title}
                  </li>
                ))
              ) : (
                noAlbumsFound && <li className={styles.message}>No albums found</li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
