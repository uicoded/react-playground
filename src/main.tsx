import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Examples from './Examples.tsx'
// Swap this 👇 for the example app that you're testing
// import App from './App_default.tsx'
// import App from './examples/forms/App_forms-uncontrolled-inputs-default-value'
// import App from './examples/App_error-boundary.tsx'
// import App from './examples/hooks/use-state/App_hooks-use-state.tsx'
// import App from './examples/hooks/use-state/App_hooks-use-state-initial-value.tsx'
// import App from './examples/hooks/use-effect/App_hooks-use-effect.tsx'
// import App from './examples/hooks/use-effect/App_hooks-use-effect-scenarios.tsx'
// import App from './examples/hooks/use-effect/App_hooks-use-effect-conditional.tsx'
// import App from './examples/hooks/use-effect/App_hooks-use-effect-set-interval.tsx'
// import App from './examples/hooks/use-ref/App_hooks-use-ref-nw.tsx'
// import App from './examples/hooks/use-ref/App_hooks-use-ref.tsx'
// import App from './examples/hooks/use-id/App_hooks-use-id.tsx'
// import App from './examples/styles/App_3-ways-adding-style.tsx'
// import './examples/styles/App_styled-box.css';
// import App from './examples/styles/App_styled-box.tsx'
// import App from './examples/App_using-keys.tsx'
// import App from './examples/local-storage/App_local-storage-dynamic-value.tsx'
// import App from './examples/local-storage/App_local-storage-hook.tsx'
// import App from './examples/local-storage/App_local-storage-immediate-value.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Examples />
    {/* <App /> */}
  </StrictMode>,
)
