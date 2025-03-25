import { useState, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 6: Managing authentication status
export default function UseEffect_authStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | {name: string, email: string}>(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  
  // Check authentication on mount and when token changes
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return;
    }
    
    // Simulate token validation
    const validateToken = async () => {
      // In a real app, this would be an API call to validate the token
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate token validation result
      const isValid = token.length > 3; // Dummy validation logic
      
      if (isValid) {
        setIsLoggedIn(true);
        // Simulate getting user data
        setUser({ name: 'John Doe', email: 'john@example.com' });
      } else {
        // Token is invalid
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('authToken');
        setToken(null);
      }
    };    
    validateToken();
    
    // Setup listener for storage events (if token changes in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        setToken(e.newValue);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);
  
  const handleLogin = () => {
    // Simulate successful login
    const newToken = 'token_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };
  
  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>6. Managing Authentication Status</h2>
      
      <div className={styles.authContainer}>
        {isLoggedIn ? (
          <>
            <p className={styles.text}>
              Logged in as: {user?.name} ({user?.email})
            </p>
            <button 
              className={styles.secondaryButton} 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className={styles.text}>Not logged in</p>
            <button 
              className={styles.primaryButton} 
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
      
      <p className={styles.description}>
        useEffect synchronizes component state with authentication status and 
        manages token validation
      </p>
    </div>
  );
}