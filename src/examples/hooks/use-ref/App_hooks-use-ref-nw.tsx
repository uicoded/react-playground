import { useRef, useEffect } from "react";

export default function App() {
  const testDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const testDiv = testDivRef.current;
    // testDivRef is the div DOM node!
    console.log('`testDiv` loaded with: ', testDiv);
  }, []);

  let inputElement: HTMLInputElement | null = null;

  // Callback ref
  const setInputFn = (element: HTMLInputElement) => {
    inputElement = element;
    console.log('`setInputFn` called and `inputElement` loaded with:', element);
    return function cleanup() {
      console.log('the input is getting removed from page');
    }
  };

  useEffect(() => {
    if (inputElement) {
      inputElement.focus(); // Focuses the input element
    }
  }, []);

  return (
    <>
      <h1>ref (not working removal)</h1>
      <p>
        You can use an object created by <code>useRef</code>
      </p>
      <div ref={testDivRef} className="testBlock">
        Or you can provide a function that React will call with the DOM element
        or component instance when it is mounted or updated.
        <input ref={setInputFn} type="text" />
      </div>
      <p>On the input <button onClick={()=>testDivRef.current?.remove()}>removal</button> you should see the cleanup
      function executed.</p>
      <p>If the component using the ref unmounts normally (through React's lifecycle), React would call the callback with null,
      triggering any cleanup logic. But when manually removing the element from the DOM using remove(), 
      React's ref system isn't aware of this change. 👈 which is our case</p>
    </>
  );
}
