import { useRef, useOptimistic } from "react";

// Define types for the message object
type Message = {
  text: string;
  sending?: boolean;
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
    addOptimisticMessage(message);
    formRef.current?.reset();
    await sendMessage(formData);
  }

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
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
