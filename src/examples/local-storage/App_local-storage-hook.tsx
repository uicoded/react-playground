// Use useEffect when the storage value is not urgent and can update dynamically
// Use localStorage custom hook
import useLocalStorage from "./useLocalStorage.ts";

export default function App(){
  // NOTE: use a generic with a union type constraint (only "light" and "dark" allowed)
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light"); // Default theme

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};