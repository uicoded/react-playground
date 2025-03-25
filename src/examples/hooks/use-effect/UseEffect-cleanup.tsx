import { useState, useRef, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 1: Proper cleanup with intervals
export default function UseEffect_Cleanup() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      // Setup: Create interval when isRunning becomes true
      intervalRef.current = window.setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      
      // Cleanup: Clear interval when component unmounts or isRunning changes
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isRunning]); // Only re-run when isRunning changes

  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>1. Cleanup with Intervals</h2>
      <p className={styles.text}>Count: {count}</p>
      <button 
        className={styles.primaryButton}
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button 
        className={styles.secondaryButton}
        onClick={() => setCount(0)}
      >
        Reset
      </button>
      <p className={styles.description}>
        useEffect properly cleans up the interval when component unmounts or dependencies change
      </p>
    </div>
  );
}