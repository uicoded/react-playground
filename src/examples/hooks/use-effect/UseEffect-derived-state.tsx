import { useState, useMemo } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 3: Avoiding unnecessary useEffect for derived state
export default function UseEffect_derivedState() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  
  // ✅ Good: Calculate during rendering
  const fullName = `${firstName} ${lastName}`;
  
  // For expensive calculations, use useMemo
  const expensiveCalculation = useMemo(() => {
    // Simulating an expensive operation
    console.log('Running expensive calculation');
    return `${firstName} ${lastName}`.split('').reverse().join('');
  }, [firstName, lastName]);

  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>3. Avoiding Unnecessary useEffect</h2>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        />
        <input
          className={styles.input}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
        />
      </div>
      <p>Full name: {fullName}</p>
      <p>Expensive calculation: {expensiveCalculation}</p>
      <p className={styles.description}>
        Derived state is calculated during render, not in useEffect
      </p>
    </div>
  );
}