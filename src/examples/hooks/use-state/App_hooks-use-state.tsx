import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  function handleClick() {
	  setAge(a => a + 1);
	  setAge(a => a + 1);
	  setAge(a => a + 1);
  }

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <button onClick={handleClick}>
        Increment age 3x
      </button>

      <p>Hello, {name}. You are {age}.</p>
      <hr/>
      <p><a href="https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state">Updating state based on the previous state</a></p>
    </>
  );
}