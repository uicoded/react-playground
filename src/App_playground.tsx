import { useState } from 'react';

import './components/index.css'
import './App_playground.css'

import Navigation from './components/Navigation.tsx'
import Example from './components/Example.tsx'
import examplesData from './examples/examples.json'
import { ExampleItem } from './types/ExampleItem.ts';

export default function Playground() {
  const [selectedExample, setSelectedExample] = useState<ExampleItem>({name: "home", path: "App_default.tsx"});

  const handleExampleSelect = (item: ExampleItem) => {
    if (item.path) {
      setSelectedExample(item);
    }
    // TODO: item.paths
  };

  return (
    <div className="playground">
      <div className="main-nav">
        <Navigation data={examplesData} selectedItem={selectedExample.path} onExampleSelect={handleExampleSelect} />
      </div>
      <div className="view">
        <Example item={selectedExample} />
      </div>
    </div>
  )
}