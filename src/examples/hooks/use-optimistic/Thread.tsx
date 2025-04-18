import { useRef, useOptimistic } from "react";

// Define types for the message object
type Message = {
  text: string;
  sending?: boolean;
  error?: boolean;
};

// Define props interface for the Thread component
type ThreadProps = {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
};

export default function Thread({ messages, sendMessage }: ThreadProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message.trim()) return;

    addOptimisticMessage(message);
    formRef.current?.reset();

    try {
      await sendMessage(formData);
    } catch (err) {
      // When an error occurs, useOptimistic will automatically revert to the original state
      // The optimistic update will be automatically reverted
    }
  }

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
  - If the async operation (e.g., a server request), React reverts to the original state. 👈 TODO: More clarity on this..
  - Unlike `useTransition`, it doesn't inherently manage pending states—you handle the async flow manually or pair it with other hooks.

  See: docs/react-hooks-use-optimistic-fully-typed.md for details
  */

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <div className="message-thread">
      <div className="messages">
        {optimisticMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sending ? 'sending' : ''}`}
          >
            {message.text}
            {!!message.sending && <small> (Sending...)</small>}
          </div>
        ))}
      </div>

      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
