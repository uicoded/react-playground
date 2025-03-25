import { useState } from "react";

function getQueryParam() {
  console.log("getQueryParam() called");
  const params = new URLSearchParams(window.location.search);
  return params.get("query") ?? "";
}

export default function App() {
  // ---- This is the core principle to demonstrate -----
  // ❌ This will call getQueryParam on every render, undermining our optimization! 😵
  // const [query, setQuery] = useState(getQueryParam())
  // ✅ This will _only_ call getQueryParam on init. Great!
  const [query, setQuery] = useState(getQueryParam);
  // ----------------------------------------------------

  // Derived state
  const words = query.split(" ");
  const dogChecked = query.includes("dog");
  const catChecked = query.includes("cat");

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setQuery(newWords.filter(Boolean).join(" ").trim());
  }

  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="searchInput">Search:</label>
            <input
              id="searchInput"
              name="query"
              type="search"
              // Controlled text input
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                // Controlled checkbox
                checked={dogChecked}
                onChange={(e) => handleCheck("dog", e.currentTarget.checked)}
              />{" "}
              🐶 dog
            </label>
            <label>
              <input
                type="checkbox"
                // Controlled checkbox
                checked={catChecked}
                onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
              />{" "}
              🐱 cat
            </label>
          </div>
        </form>
        <p>When passing initializer function to the <a href="https://react.dev/reference/react/useState"><code>useState()</code></a>.<br/>
        <a href="https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state">Avoid recreating the initial state</a> 
        by passing the function not function call.</p>
        <p>
        ❌ <code>const [todos, setTodos] = useState(createInitialTodos());</code><br/>
        ✅ <code>const [todos, setTodos] = useState(createInitialTodos);</code><br/>
        </p>
        <p><a href="?query=cat+dog">?query=cat+dog</a> 👈 Start with this URL</p>
      </div>
    </>
  );
}
