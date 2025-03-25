import { useState, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 2: Synchronizing with external system
export default function UseEffect_externalSync() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Setup: Add event listener for window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>2. Synchronizing with External Systems</h2>
      <p>Current window width: {windowWidth}px</p>
      <p className={styles.description}>
        Resize your browser window to see this value update
      </p>
    </div>
  );
}