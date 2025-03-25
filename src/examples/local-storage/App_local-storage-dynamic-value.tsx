// Use useEffect when the storage value is not urgent and can update dynamically
// Notable difference with useState:
// - Runs after the initial render (in the effect phase).
// - Accesses localStorage asynchronously after the initial render.
// - Errors must be handled within the effect (or in a try-catch).

import { useState, useEffect } from "react";

export default function App(){
  const [theme, setTheme] = useState("light"); // Default theme

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync accross the tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme" && event.newValue) {
        setTheme(event.newValue);
      }
    }; 
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};
