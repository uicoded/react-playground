# Q: Does the `useOptimistic()` update based on base variable update?

In react useOptimistic hook. I set optimistic value `optimisticShipment` that is based on `shipment` state. Later the `shipment` state value updates. 

Does useOptimistic hook update the `optimisticShipment` value to MIRROR the new `shipment` state? The whole purpose of optimistic value, rather than maintaining two values: normal and optimistic. 

```tsx
const [shipment, setShipment] = useState<ShippingItem | null>(null);
const [optimisticShipment, addOptimisticShipment] = useOptimistic(
    shipment,
    (_, formData: FormData) => {}
);
```

## SUMMARY

1. Initially, `optimisticShipment` equals `shipment` (which is null)
2. When `addOptimisticShipment(newValue)` is called, the update function runs to create a temporary optimistic state
3. When `setShipment(newValue)` is called later, `optimisticShipment` automatically mirrors the new shipment value without calling the update function again (here the fn ( _ , formData))

This behavior is what makes `useOptimistic` useful - it lets you temporarily show an optimistic UI state and then automatically transitions to the real state once it's available, without requiring additional code to manage that transition.
 
The `useOptimistic()` hook itself does not check or track the pending state of promises or async operations. It doesn't have any built-in mechanism to detect if the base state (`shipment`) is an unresolved Promise (or not in our case).

---

## DEEP DIVE

Let’s address your question about the `useOptimistic` hook in React: when the `shipment` state updates, does the `optimisticShipment` value automatically update to mirror the new `shipment` state? To answer this, I’ll explain how `useOptimistic` works and apply it to your specific code, ensuring the explanation is clear and complete.

### Understanding `useOptimistic`
The `useOptimistic` hook in React is designed to manage optimistic updates—temporary state changes shown to the user while an asynchronous operation (like a server request) is pending. It allows you to provide an immediate, hopeful UI update, which can later be confirmed or reverted based on the operation’s outcome. The hook takes two arguments:

1. **The current state**: In your case, `shipment`, which is initialized as `null` and typed as `ShippingItem | null`.
2. **A reducer function**: This function computes the optimistic state based on the current state and some input (e.g., `formData`). It has the signature `(currentState, action) => newOptimisticState`.

The hook returns an array with two elements:
- **`optimisticShipment`**: The current optimistic value, which the UI can use to reflect either the confirmed state or a temporary optimistic update.
- **`addOptimisticShipment`**: A function you call to apply an optimistic update, passing an action (e.g., `formData`) to the reducer.

In your code:
```javascript
const [shipment, setShipment] = useState<ShippingItem | null>(null);
const [optimisticShipment, addOptimisticShipment] = useOptimistic(
    shipment,
    (_, formData: FormData) => {}
);
```
The reducer function is empty (`(_, formData: FormData) => {}`), meaning it doesn’t yet compute a new optimistic value. This might be a placeholder, but I’ll address both the current code and the intended behavior.

### How `optimisticShipment` Relates to `shipment`
The `optimisticShipment` value is tied to the `shipment` state because `shipment` is passed as the first argument to `useOptimistic`. Here’s how it behaves:

- **When no optimistic updates are pending**: If you haven’t called `addOptimisticShipment`, or if all pending updates have been resolved, `optimisticShipment` equals `shipment`. This ensures the optimistic value mirrors the current confirmed state.
- **When an optimistic update is pending**: After calling `addOptimisticShipment(formData)`, the reducer computes a new optimistic value based on `shipment` and `formData`. During this period, `optimisticShipment` reflects that temporary value, differing from `shipment` until the update is confirmed or reverted.

### Does `optimisticShipment` Update When `shipment` Changes?
Yes, when the `shipment` state updates (e.g., via `setShipment(newShipment)`), the `useOptimistic` hook re-evaluates `optimisticShipment` based on the new `shipment` value. This happens because `shipment` is a dependency of the hook. React hooks re-run their logic when their inputs change, and `useOptimistic` is designed to keep `optimisticShipment` in sync with `shipment`, adjusted by any pending optimistic updates.

#### Case 1: No Pending Updates
If no optimistic updates are pending (i.e., you haven’t called `addOptimisticShipment` recently, or previous updates have resolved), `optimisticShipment` will mirror the new `shipment` value immediately after `shipment` updates. For example:
- Initial state: `shipment` is `null`, so `optimisticShipment` is `null`.
- Update: `setShipment(newShipment)` changes `shipment` to `newShipment`.
- Result: `optimisticShipment` becomes `newShipment`, mirroring the updated `shipment`.

In your current code, since the reducer is empty and doesn’t return a value, calling `addOptimisticShipment` doesn’t alter `optimisticShipment`. Thus, `optimisticShipment` always equals `shipment`, and when `shipment` updates, `optimisticShipment` updates to match it.

#### Case 2: With a Proper Reducer and Pending Updates
Assuming the reducer is implemented, like this:
```javascript
const [optimisticShipment, addOptimisticShipment] = useOptimistic(
    shipment,
    (currentShipment, formData) => computeOptimisticShipment(currentShipment, formData)
);
```
Here’s a typical flow:
1. **Initial state**: `shipment` is `null`, `optimisticShipment` is `null`.
2. **Optimistic update**: Call `addOptimisticShipment(formData)`, and the reducer returns an optimistic value (e.g., `{ id: 1, status: "pending" }`). Now, `optimisticShipment` is `{ id: 1, status: "pending" }`, while `shipment` remains `null`.
3. **State update**: After the server confirms the update, you call `setShipment(newShipment)` (e.g., `newShipment` is `{ id: 1, status: "confirmed" }`).
4. **Result**: Once `shipment` updates, `useOptimistic` recalculates `optimisticShipment`. If the optimistic update is resolved (e.g., the server response matches the optimistic change), `optimisticShipment` mirrors the new `shipment`: `{ id: 1, status: "confirmed" }`.

In React’s `useOptimistic`, when the underlying state (`shipment`) changes, the hook ensures `optimisticShipment` reflects the latest `shipment` value, either by adopting it directly (if no pending updates remain) or by reapplying any pending optimistic updates to the new state.

### Addressing Your Code’s Empty Reducer
In your provided code, the reducer doesn’t return anything, which in JavaScript means it implicitly returns `undefined`. However, `useOptimistic` likely falls back to the current state (`shipment`) when the reducer doesn’t produce a valid optimistic value. Thus:
- `optimisticShipment` starts as `null` (matching `shipment`).
- Calling `addOptimisticShipment(formData)` doesn’t change `optimisticShipment` because the reducer is ineffective.
- When `shipment` updates to `newShipment`, `optimisticShipment` updates to `newShipment`.

This aligns with the hook’s purpose: to avoid maintaining two separate states. The UI uses `optimisticShipment` as the single source of truth, which reflects either the confirmed state or an optimistic preview.

### Answering Your Question
**Does the `useOptimistic` hook update `optimisticShipment` to mirror the new `shipment` state when `shipment` updates?**

Yes. When `shipment` changes (e.g., via `setShipment`), `optimisticShipment` updates to reflect the new `shipment` value, assuming no pending optimistic updates. In your current code, with an empty reducer, `optimisticShipment` always mirrors `shipment` because no optimistic changes are applied. With a proper reducer, `optimisticShipment` mirrors `shipment` when no updates are pending or after they’re resolved, fulfilling the goal of using one value (`optimisticShipment`) in the UI rather than tracking both normal and optimistic states separately.

This behavior ensures a seamless optimistic UI experience: `optimisticShipment` serves as the UI’s state, adapting to both optimistic changes and confirmed updates to `shipment`.
