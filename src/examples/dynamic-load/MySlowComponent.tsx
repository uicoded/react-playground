// No React import needed for this component
const slowFunction = () => {
  const start = performance.now();
  while (performance.now() - start < 2000) {
    // Block execution for 2 seconds
  }
};

const MyComponent = () => {
  slowFunction(); // Simulate heavy computation

  return <div>🐢 MySlowComponent Rendered!</div>;
};

export default MyComponent;
