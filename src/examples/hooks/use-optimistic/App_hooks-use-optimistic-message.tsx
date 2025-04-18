import { useState } from "react";
import Thread from "./Thread.tsx";

async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

type Message = { text: string; sending: boolean; key: number }

export default function App() {

  /*
  ✅ Use the `useOptimistic` hook to manage optimistic UI updates by getting handle of optimistic state and setOptimistic function.

  https://react.dev/reference/react/useOptimistic

  unlike `useTransition()` which can be used to prevent the UI from changing when the component is suspended,
  `useOptimistic()` allows the UI to update with the optimistic state while the real state is being updated
  in the background, giving the appearance of instant updates.

  👉 Use it for scenarios where you want to give users instant feedback, like submitting a form or toggling a like button before
   confirming with the server that the operation was successful.

  `optimisticValue`: The current value, which may reflect an optimistic update if one is in progress.
  `setOptimisticValue`: A function to set an optimistic value, typically called with an action (e.g., form data)
                        and paired with an async operation. I takes in two parameters. The `currentState` and the `optimisticValue`.

  - Provide the current state and an update function that computes the optimistic state based on an action.
  - When you call `setOptimisticValue`, React immediately updates the UI with the optimistic value.
  - If the async operation (e.g., a server request), React reverts to the original state.
  - Unlike `useTransition`, it doesn’t inherently manage pending states—you handle the async flow manually or pair it with other hooks.

  See: docs/react-hooks-use-optimistic-fully-typed.md for details
  */

  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello there!", sending: false, key: 1 }
  ]);

  async function sendMessage(formData: FormData) {
    const message = formData.get("message");
    if (typeof message !== "string") return;
    const sentMessage = await deliverMessage(message);
    setMessages((messages) => [...messages, { text: sentMessage, sending: false, key: messages.length + 1 }]);
  }

  return <Thread messages={messages} sendMessage={sendMessage} />;
}
