import { useState, useRef, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 5: Reading latest state with refs
export default function UseEffect_stateWithRefs() {
  const [message, setMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<string[]>([]);
  const messageRef = useRef('');
  
  // Keep ref in sync with state
  useEffect(() => {
    messageRef.current = message;
  }, [message]);
  
  const handleSaveMessage = () => {
    // Simulate delayed operation
    setTimeout(() => {
      // Using ref to access the latest state
      const currentMessage = messageRef.current;
      setSavedMessages(prev => [...prev, currentMessage]);
      alert(`Message saved: ${currentMessage}`);
    }, 3000);
  };
  
  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>5. Reading Latest State with Refs</h2>
      <input
        className={styles.fullWidthInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={handleSaveMessage}
        >
          Save Message (3s delay)
        </button>
        <button 
          className={styles.secondaryButton}
          onClick={() => setMessage('')}
        >
          Clear
        </button>
      </div>
      <p>Saved messages:</p>
      <ul className={styles.messageList}>
        {savedMessages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <p className={styles.description}>
        After clicking "Save", change the input text to see how the ref captures the latest value
      </p>
    </div>
  );
}