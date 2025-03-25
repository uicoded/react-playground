import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("1. Effect ran after render");
  });

  useEffect(() => {
    console.log("2. Effect ran on mount");
  }, []);

  useEffect(() => {
    console.log(`3. Count changed: ${count}`);
  }, [count]);

  useEffect(() => {
    console.log("4. Effect ran");
  
    return () => {
      console.log("4. Cleanup ran");
    };
  }, []);

  useEffect(() => {
    console.log("5. Subscribed!");
  
    return () => {
      console.log("5. Unsubscribed!");
    };
  }, [count]);
  

  return (
    <>
      <h1>useEffect</h1>

      <h2>When is it executed?</h2>

      <p>
        The <code>useEffect</code> hook in React is executed
        <strong>after the render phase</strong>, and its behavior depends on its
        dependency array. Here&#39;s how it works:
      </p>

      <h3>1. On Every Render (No Dependency Array)</h3>

      <p>
        If you don’t provide a dependency array, <code>useEffect</code> runs
        <strong>after every render</strong> (initial and subsequent re-renders).
      </p>

      <h3>
        2. On Mount Only (Empty Dependency Array <code>[]</code>)
      </h3>

      <p>
        If you pass an <strong>empty array</strong>, <code>useEffect</code> runs
        <strong>only once</strong> after the initial render (similar to
        <code>componentDidMount</code> in class components).
      </p>

      <h3>3. On State/Prop Change (Specific Dependencies)</h3>

      <p>
        If you pass an array with dependencies, <code>useEffect</code> runs
        <strong>only when those dependencies change</strong>.
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>Count + 1</button>{count}
      </p>

      <h3>4. On Unmount (Cleanup Function)</h3>

      <p>
        If <code>useEffect</code> returns a function, React calls this function
        <strong>when the component unmounts</strong> or
        <strong>before re-running the effect</strong> (for cleanup).
      </p>

      <h3>5. On Dependency Change (Before Re-Running)</h3>

      <p>
        If dependencies change, the cleanup function runs
        <strong>before executing the effect again</strong>.
      </p>
    </>
  );
}
