import { useEffect, useState } from "react";

function BlockToRemove ({children}: {children: React.ReactNode}) {
  useEffect(() => {
    // Effect logic
    console.log('Block side-effect called');
    return () => {// Cleanup function
      console.log('Block cleanup called');
    }
  });
  
  return (
    <div style={{
      padding: '1em',
      color: 'black',
      backgroundColor: 'lightcoral',
      display: 'inline-block',
      width: 'auto',
      margin: '1em',
      border: '2px solid red'
    }}>{children}</div>
  )
}

export default function App() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Effect logic
    console.log('App side-effect called');
    return () => { // Cleanup function
      console.log('App cleanup called');
    }
  });

  return (
    <>
      <h1>useEffect</h1>
      <p><label><input type="checkbox" checked={visible} onChange={e => setVisible(e.currentTarget.checked)} /> Visible</label></p>
      {visible ? <BlockToRemove>Element for removal</BlockToRemove> : 'hidden'}
      <p>Check the console for the chain of events and align with you useEffect understanding.</p>
      <p>On load:</p>
      <ol>
        <li>Block side-effect called</li>
        <li>App side-effect called</li>
      </ol>
      <p>On deselect:</p>
      <ol>
        <li>Block side-effect called</li>
        <li>App cleanup called</li>
        <li>App side-effect called</li>
      </ol>
      <p>On select:</p>
      <ol>
        <li>App cleanup called</li>
        <li>Block side-effect called</li>
        <li>App side-effect called</li>
      </ol>
    </>
  );
}
