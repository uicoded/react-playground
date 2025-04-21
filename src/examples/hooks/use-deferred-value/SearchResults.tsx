import { useEffect, useState} from 'react'
import { albumService, Album } from "./albums";

// Component to display result of album query
export default function SearchResult({query} : {query: string}) {
  const [results, setResults] = useState<Album[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await albumService(query);
      setResults(data);
    };
    fetchResults();
  }, [query]);

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
