# React Components

## New
Create a React function component in TypeScript that follows best practices. 
The component should:

- [x]  Use TypeScript’s type keyword for defining props.
- [x]  Accept at least one prop with a clearly defined type.
- [x]  Use function declaration.
- [x]  Use capital letter for the component name.
- [x]  Use a default export.
- [x]  Be structured with proper TypeScript annotations.

Ensure the component is simple yet reusable, demonstrating good practices for
typing props and structuring the component.

### Function Declaration Style

Create `MyComponent.tsx`

```tsx
type MyComponentProps = {
  onEvent?: () => void;
  optionalProp?: boolean;
};

function MyComponent({
  optionalProp = false,
  onEvent,
}: MyComponentProps) {
  return <span>Hello world</span>;
}

export default MyComponent;
```