// Use useState callback function when the storage value must be available immediately
// This example reads a theme (light or dark) from localStorage before the component renders,
// ensuring the correct theme is applied immediately. (If that would be an issue)

// Callback fn:
// ✅ Prevents localStorage access on every render – The function runs only once.
// ✅ Ensures the theme is correctly loaded before render – The UI won't flicker due to state changes.
// ✅ Handles missing values safely – If localStorage is empty, "light" is used as a default.

// 🚫 What Happens Without the Callback?
// If we use useState(localStorage.getItem("theme") || "light"),
// ☠️ localStorage.getItem("theme") runs on every render, causing unnecessary performance hits.
// ☠️ If localStorage.getItem("theme") is expensive (e.g., parsing a large object), it slows down rendering.

// 🔹 When to Use a Callback (useState(() => ...))?
// 🔹 Fetching from localStorage, sessionStorage, or cookies
// 🔹 Expensive initial calculations (e.g., computing derived data)
// 🔹 Parsing JSON or complex initialization logic

// Notable difference to useEffect:
// – Runs before the initial render (during state initialization).
// – Accesses localStorage synchronously during initial render.
// - Can handle errors in the callback function directly.

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Using a function to initialize state from localStorage
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  // Sync theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
