import { useState } from 'react'
import githubLogo from '/github.svg'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'

// Watch out: When using this in the dynamic playground, it leaves the styles in head
import './App_default.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="hello-world">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Playground</h1>
      <h2>react + vite + typescript</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/examples/App_default.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Find all examples in:
        <a href="https://github.com/uicoded/react-playground/" target="_blank" className="github-logo">
            <img src={githubLogo} alt="GitHub Logo" className="logo" />
            <span>GitHub Repo</span>
        </a>
      </p>
    </div>
  )
}

export default App
