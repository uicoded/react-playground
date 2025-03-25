import { useState, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 4: Data fetching with cleanup
export default function UseEffect_dataFetch() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    // Simulated API fetch
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isMounted) {
          setData(`Data for ID: ${id}`);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setData(null);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [id]); // Re-fetch when ID changes

  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>4. Data Fetching with Cleanup</h2>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => setId(prevId => prevId + 1)}
        >
          Next ID
        </button>
        <span className={styles.idLabel}>Current ID: {id}</span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{data}</p>
      )}
      <p className={styles.description}>
        Prevents state updates after unmount and handles race conditions
      </p>
    </div>
  );
}