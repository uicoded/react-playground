import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Effect logic
    console.log('side-effect called');
    const interval = setInterval(() => setTime(time + 1), 1000);
    return () => {// Cleanup function
      console.log('cleanup called: ', time);
      clearInterval(interval);
    }
  }, [time]);

  return (
    <>
      <h1>useEffect</h1>
      <h2>What This Does</h2>

      <div className="Example">Time: {time}</div>

      <ul>
        <li>
          The Timer component displays a number (time) that increments every
          second (1000 milliseconds).
        </li>
        <li>useState(0) initializes time to 0.</li>
        <li>
          useEffect sets up a side effect: an interval that updates time every
          second.
        </li>
        <li>
          The rendered output is a &lt;div&gt; showing the current value of
          time.
        </li>
      </ul>

      <h2>Why Use useEffect?</h2>

      <p>
        <a href="https://react.dev/reference/react/useEffect">
          <code>useEffect()</code>
        </a>{" "}
        is necessary because it manages <strong>side effects</strong> in React
        functional components. A side effect is anything that interacts with the
        outside world or needs to happen outside the normal render flow—like
        setting up timers, fetching data, or subscribing to events. In this
        case, creating and managing a timer (setInterval) is a side effect
        because it:
      </p>

      <ol>
        <li>
          Involves JavaScript’s native setInterval, which runs independently of
          React’s rendering.
        </li>
        <li>
          Needs to be started when the component mounts or updates and stopped
          when it unmounts to avoid memory leaks.
        </li>
      </ol>

      <p>
        Without{" "}
        <a href="https://react.dev/reference/react/useEffect">
          <code>useEffect()</code>
        </a>
        , you’d have to manually manage the timer in the component’s body, which
        would lead to issues like multiple intervals running simultaneously or
        no cleanup when the component unmounts.
      </p>

      <h3>Notes to cleanup Function</h3>

      <p style={{padding: '1em', backgroundColor: 'teal', color: 'black', display: 'inline-block'}}>Note that the interval is cleared after each <code>time</code> update thanks to the 
      cleanup function. <br/>And when the effect is called again the timer is set again.</p>

      <p>
        Reminder: The cleanup function in React&#39;s useEffect hook is called in two main
        scenarios:
      </p>

      <ol>
        <li>
            <strong>Component Unmounting</strong>: The cleanup function is
            invoked when the component using the useEffect hook is removed from
            the screen
            <a href="https://www.zipy.ai/blog/understanding-react-useeffect-cleanup-function">
              4
            </a>
            . This ensures that any side effects, such as timers or
            subscriptions, are properly cleaned up to prevent memory leaks or
            unexpected behavior.
        </li>
        <li>
            <strong>Before Re-running Effects</strong>: In React 17 and later,
            the cleanup function is called before the effect runs again due to a
            change in its dependencies
            <a href="https://blog.saeloun.com/2021/06/11/react-17-runs-use-effect-cleanup-asynchronously/">
              1
            </a>
            <a href="https://reacttraining.com/blog/useEffect-cleanup">6</a>
            . This happens asynchronously after the screen has been updated,
            which improves performance for larger applications.
        </li>
      </ol>

      <p>It&#39;s important to note that:</p>

      <ul>
        <li>
            The cleanup function runs asynchronously in React 17+, after the
            screen has been updated
            <a href="https://blog.saeloun.com/2021/06/11/react-17-runs-use-effect-cleanup-asynchronously/">
              1
            </a>
        </li>
        <li>
            React will execute all effect cleanup functions (for all components)
            before running any new effects
            <a href="https://blog.saeloun.com/2021/06/11/react-17-runs-use-effect-cleanup-asynchronously/">
              1
            </a>
        </li>
        <li>
            The cleanup function is not called on the initial render, only on
            subsequent re-renders when dependencies change or when the component
            unmounts
            <a href="https://stackoverflow.com/questions/57023074/why-is-the-cleanup-function-from-useeffect-called-on-every-render">
              8
            </a>
        </li>
      </ul>

      <p>
        This behavior ensures that side effects are properly managed throughout
        the component lifecycle, preventing issues like memory leaks and
        improving overall application stability.
      </p>
    </>
  );
}
