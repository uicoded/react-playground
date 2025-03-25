import { useId } from "react";
import { useMultipleIds } from "./useMultipleIds";

export default function App() {
  
  // NOTE: { length: 3 } acts like [ , , ] (an empty array of length 3).
  const ids = Array.from({ length: 3 }, () => useId());

  const hookIds = useMultipleIds(3);
  const [id4, id5, id6] = hookIds;

  return (
    <>
    <h1>useId()</h1>
    <p>⚠️ This works because React guarantees <a href="https://react.dev/reference/react/useId"><code>useId()</code></a> is stable across renders.</p>
    <div>
      <label htmlFor={ids[0]}>First Name</label>
      <input id={ids[0]} type="text" />
      
      <label htmlFor={ids[1]}>Last Name</label>
      <input id={ids[1]} type="text" />
      
      <label htmlFor={ids[2]}>Email</label>
      <input id={ids[2]} type="email" />
    </div>
    <hr />
    <div>
      <label htmlFor={id4}>First Name</label>
      <input id={id4} type="text" />
      
      <label htmlFor={id5}>Last Name</label>
      <input id={id5} type="text" />
      
      <label htmlFor={id6}>Email</label>
      <input id={id6} type="email" />
    </div>
    </>
  );
};
