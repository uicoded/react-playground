# `useOptimistic()` Fully Typed

Here is the fully typed hook.

```tsx
function useOptimistic<StateType, UpdateType>(
  initialState: StateType,
  applyUpdate: (currentState: StateType, update: UpdateType) => StateType
): [StateType, (update: UpdateType) => void] {
  const [state, setState] = React.useState(initialState);

  function addOptimisticUpdate(update: UpdateType) {
    setState((prevState) => applyUpdate(prevState, update));
  }

  return [state, addOptimisticUpdate];
}
```

When used in an messages example:

```tsx
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
```

Generics type parameters `<Message[], string>` Explained:

1. **`Message[]`** (the **state type**):
   - This defines the type of the optimistic state being managed.
   - In this case, `optimisticMessages` will be typed as an array of `Message` objects.

2. **`string`** (the **update type**):
   - This defines the type of data you’ll pass into the updater function (`addOptimisticMessage`).
   - Here, `string` represents a new message's text, which will be used to create an optimistic message.

>[!NOTE]
> Generics propagate through callbacks and their params.
> Second generic is the type used as a parameter inside the reducer, which is not obvious from the hook signature at first glance.
