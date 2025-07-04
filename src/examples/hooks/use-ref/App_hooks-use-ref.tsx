import { useRef, useEffect, useState } from "react";

export default function App() {
  const testDivRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState<Boolean>(true);

  useEffect(() => {
    const testDiv = testDivRef.current;
    // testDivRef is the div DOM node!
    console.log("`testDiv` loaded with: ", testDiv);
  }, []);

  let inputElement: HTMLInputElement | null = null;

  // Callback ref
  const setInputFn = (element: HTMLInputElement) => {
    inputElement = element;
    console.log("`setInputFn` called and `inputElement` loaded with:", element);
    return function cleanup() {
      console.log("the input is getting removed from page");
    };
  };

  useEffect(() => {
    if (inputElement) {
      inputElement.focus(); // Focuses the input element
    }
  }, []);

  return (
    <>
      <h1>ref</h1>
      <p>
        Refs let a component{" "}
        <a href="https://react.dev/learn/referencing-values-with-refs">
          {" "}
          hold some information that isn’t used for rendering
        </a>
        , like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are
        an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as
        the built-in browser APIs.
      </p>
      <p>
        You can use an object created by <code>useRef</code>
      </p>
      <div ref={testDivRef} className="testBlock">
        test block
      </div>
      <p>
        {" "}
        Or you can provide a function that React will call with the DOM element or component instance when it is mounted
        or updated.
        {showInput && <input ref={setInputFn} type="text" />}
      </p>
      <p>
        On the input <button onClick={() => setShowInput(false)}>removal</button> you should see the cleanup function
        executed.
      </p>
      <p>
        If the component using the ref unmounts normally (through React's lifecycle), React would call the callback with
        null, triggering any cleanup logic. But when manually removing the element from the DOM using remove(), React's
        ref system isn't aware of this change.
      </p>
    </>
  );
}
