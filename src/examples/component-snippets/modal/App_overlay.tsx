import { useState } from "react";
import Overlay from "./Overlay";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Overlay
        show={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <p>
          This overlay uses{" "}
          <a href="https://github.com/streamich/react-use/blob/master/docs/useKey.md">
            <code>useKey()</code>
          </a>{" "}
          to handle ESC key press and{" "}
          <a href="https://github.com/streamich/react-use/blob/HEAD/docs/useClickAway.md">
            <code>useClickAway()</code>
          </a>{" "}
          to handle outside the overview display click
        </p>
      </Overlay>
    </>
  );
}
