# Error Boundary

```tsx
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={styles.errorContainer}>
      <h3>Something went wrong!</h3>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}

//...

// Shipping action with error handling
  async function shipAction(formData: FormData): Promise<void> {
    // Show optimistic UI immediately
    addOptimisticShipment(formData);

    try {
      // Simulate API delay
      await new Promise((resolve, reject) => {}

      //...

      // Update the actual state after the "API call" completes
      setShipment(newShipment);
    } catch (error) {
      // On error, revert to the previous state by setting shipment to its current value
      // This will cause optimisticShipment to revert as well
      setShipment(shipment);

      // Throw the error to be caught by the Error Boundary 
      // ⚠️ Sorry since it is inside async, Error Boundary will not catch this
      throw error;
    }
  }

//...
return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Optional: Additional reset logic if needed
          }}
        >
)
```

>[!IMPORTANT]
> React Error Boundaries cannot catch errors in async functions or event handlers. They only catch errors during rendering, lifecycle methods, and constructors.
