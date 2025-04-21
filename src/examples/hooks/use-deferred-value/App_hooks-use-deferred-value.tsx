import {useState, Suspense} from 'react';
import SearchResult from './SearchResults';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <label>
        Search albums:
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <Suspense fallback={<div>Loading albums...</div>}>
        <SearchResult query={query} />
      </Suspense>
    </div>
  );
}
