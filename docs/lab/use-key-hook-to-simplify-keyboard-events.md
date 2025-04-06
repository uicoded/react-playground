# Understanding the useKey Hook

The `useKey` hook from the [`react-use`](https://github.com/streamich/react-use) library provides a convenient way to handle keyboard events in React components.

```typescript
useKey('Escape', () => onClose?.());
```

## Advantages of useKey

1. **Simplicity**: It abstracts away the complexity of setting up event listeners manually
2. **Automatic cleanup**: The hook handles adding and removing event listeners properly
3. **Focused scope**: Only triggers when the specified key is pressed
4. **No need for useEffect boilerplate**: Eliminates the need to write your own useEffect with addEventListener/removeEventListener

## Key Names Reference

The key names used with `useKey` follow the standard `KeyboardEvent.key` values. Here are some common ones:

- `Escape` - Escape key
- `Enter` - Enter/Return key
- `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` - Arrow keys
- `Tab` - Tab key
- `Space` - Spacebar
- `Backspace`, `Delete` - Deletion keys
- `a`, `b`, `c`, etc. - Alphabetic keys
- `0`, `1`, `2`, etc. - Numeric keys

For a complete list of key values, you can refer to:

1. [MDN KeyboardEvent.key documentation](command:_cody.vscode.open?%22https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FKeyboardEvent%2Fkey%2FKey_Values%22)
2. The react-use documentation for useKey

To implement this functionality manually without the hook, you would need something like:

```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose?.();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);
```
