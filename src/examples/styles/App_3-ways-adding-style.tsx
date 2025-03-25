// For the 2nd example CSS Modules
// When you name a file with *.module.css, build tools like Vite recognize 
// this convention and process the file as a CSS Module.
//
// CSS Modules is a specification/methodology that:
//  1. Locally scopes CSS class names to prevent global namespace collisions
//  2. Automatically generates unique class names during build time
//  3. Allows you to import these styles as JavaScript objects in your components
import styles from "./App_3-ways-adding-style.module.css";

// For the 3rd example Styled Components
import styled from "styled-components";

export default function App() {

  /* First example: inline styles */
  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const inputStyle = {
    display: "block",
    padding: "8px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "80%",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  /* END First example: inline styles */

  /* Third example: Styled Components */
  const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    max-width: 400px;
    margin: 0 auto;
  `;

  const StyledInput = styled.input`
    display: 'block';
    padding: 8px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 80%;
  `;

  const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  `;
  /* END Third example: Styled Components */

  return (
    <>
      <h2>Inline style</h2>
      <div style={containerStyle}>
        <input style={inputStyle} value={"Taylor"} />
        <button style={buttonStyle}>Add</button>
      </div>

      <h2>CSS Modules</h2>
      <div className={styles.container}>
        <input className={styles.input} value={"Taylor"} />
        <button className={styles.button}>Add</button>
      </div>

      <h2>CSS-in-JS with styled-components</h2>
      <Container>
        <StyledInput value={"Taylor"} />
        <Button>Add</Button>
      </Container>
    </>
  );
}
