import { useFormStatus } from "react-dom";
import { mockSubmitResponseWithDelay as action } from './response.ts';

// Submit button with pending state
function Submit() {
  /**
   * https://react.dev/reference/react-dom/hooks/useFormStatus
   * Gives status information of the last form submission
   * const { pending, data, method, action } = useFormStatus();
   */
  const status = useFormStatus();
  return <button disabled={status.pending}>{status.pending ? "Submitting..." : "Submit"}</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
