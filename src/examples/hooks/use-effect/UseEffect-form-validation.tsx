import { useState, useEffect } from "react";
import styles from './UseEffectScenarios.module.css';

// Scenario 7: Form validation with useEffect
export default function UseEffect_formValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Run validation when form inputs change
  useEffect(() => {
    // Don't show errors until the field has been interacted with
    const newErrors = {
      email: dirty.email ? validateEmail(email) : '',
      password: dirty.password ? validatePassword(password) : ''
    };
    
    setErrors(newErrors);
    
    // Check if the form is valid overall
    const valid = 
      email.length > 0 && 
      password.length > 0 && 
      !newErrors.email && 
      !newErrors.password;
    
    setIsFormValid(valid);
  }, [email, password, dirty.email, dirty.password]);
  
  // Validation functions
  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
    return '';
  };
  
  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      alert('Form submitted successfully!');
    } else {
      // Mark all fields as dirty to show validation errors
      setDirty({ email: true, password: true });
    }
  };
  
  return (
    <div className={styles.scenario}>
      <h2 className={styles.scenarioTitle}>7. Form Validation with useEffect</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setDirty(prev => ({ ...prev, email: true }))}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setDirty(prev => ({ ...prev, password: true }))}
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>
        
        <button 
          type="submit" 
          className={`${styles.primaryButton} ${!isFormValid ? styles.disabledButton : ''}`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
      
      <p className={styles.description}>
        useEffect performs validation as fields change, but only shows errors after fields have been touched
      </p>
    </div>
  );
}