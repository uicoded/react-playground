import { use, useState, Suspense } from "react";

// Define the type for the message promise
type MessagePromise = Promise<string>;

function Message({ messagePromise }: { messagePromise: MessagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}

function MessageContainer({ messagePromise }: { messagePromise: MessagePromise }) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}

function fetchMessage(): MessagePromise {
  return new Promise((resolve) => setTimeout(resolve, 1000, "⚛️"));
}

export default function App() {
  const [messagePromise, setMessagePromise] = useState<MessagePromise | null>(null);
  const [show, setShow] = useState(false);

  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  return (
    <div>
      <h1>use() hook</h1>
      <p>
        <a href="https://react.dev/reference/react/use">use</a> is a React API that lets you read the value of a
        resource like a{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>{" "}
        or {" "}<a href="https://react.dev/learn/passing-data-deeply-with-context">context</a>.
      </p>
      {show ? (
        <MessageContainer messagePromise={messagePromise!} />
      ) : (
        <button onClick={download}>Download message</button>
      )}
    </div>
  );
}
