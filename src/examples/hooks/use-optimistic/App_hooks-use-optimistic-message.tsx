import { useState } from "react";
import Thread from "./Thread.tsx";

async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  // Randomly fail 50% of the time to demonstrate error handling
  if (Math.random() < 0.5) {
    throw new Error("Failed to deliver message");
  }
  return message;
}

type Message = { text: string; sending: boolean; key: number; error?: boolean }

export default function App() {

  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(formData: FormData) {
    const message = formData.get("message");
    if (typeof message !== "string") return;

    // Clear any previous errors when starting a new message send
    setError(null);

    try {
      const sentMessage = await deliverMessage(message);
      setMessages((messages) => [...messages, { text: sentMessage, sending: false, key: messages.length + 1 }]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Set error message to display to the user
      setError("Failed to deliver message. Please try again.");
      // We don't need to update the state here as useOptimistic will revert to the original state
    }
  }

  return (
    <>
      {error && (
        <div className="error-message" style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '8px',
          border: '1px solid'
        }}>
          {error}
        </div>
      )}

      <Thread messages={messages} sendMessage={sendMessage} />

      <div className="info-text" style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <p>Note: Messages have a 50% chance of failing to demonstrate error handling with useOptimistic.</p>
        <p>When an error occurs, the optimistic update is automatically reverted.</p>
      </div>
    </>
  );
}
