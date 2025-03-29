import { useEffect, useState } from "react";

const MyLoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simulate 3s delay
  }, []);

  return loading ? <div>⏳ Loading content...</div> : <div>🐢 MyLoadingComponent Loaded!</div>;
};

export default MyLoadingComponent;