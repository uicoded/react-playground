# Lazy Loading React Components

React provides built-in support for lazy loading components using `React.lazy()` and `React.Suspense`. This allows you to defer the loading of a component's code until it is rendered for the first time.

## Steps:

1. **Use `React.lazy()` for Code Splitting**:  
    Replace the static import of a component with dynamic imports using `React.lazy()`:

```js
import { lazy } from 'react'; 
const MyComponent = lazy(() => import('./MyComponent'));`
```

2. **Wrap Lazy Components with `React.Suspense`**:  
    To handle loading states, wrap lazy-loaded components with `Suspense` and provide a fallback UI:

```js
import { Suspense } from 'react'; 
function App() {
   return (
	   <Suspense fallback={<div>Loading...</div>}>
			 <MyComponent />
		</Suspense>
	);
 }
 ```

The fallback content will be displayed until the component finishes loading [1](https://www.letsbuildui.dev/articles/how-to-lazy-load-react-components/)[2](https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c)[3](https://react.dev/reference/react/lazy).

3. **Multiple Lazy Components**:  
    You can lazy load multiple components within a single `Suspense` wrapper:

```js
const ComponentA = lazy(() => import('./ComponentA'));
const ComponentB = lazy(() => import('./ComponentB'));

function App() {
	return (
	    <Suspense fallback={<div>Loading...</div>}>
			<ComponentA />
			<ComponentB />
        </Suspense>
        );
}
```
