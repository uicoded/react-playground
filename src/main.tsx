import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Playground from './App_playground.tsx';
// import Playground from './App_playground-static.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>
)