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
    <ul>
      {results.map(result => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  )
}

