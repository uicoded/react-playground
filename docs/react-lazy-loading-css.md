# Lazy Loading CSS
Lazy loading CSS ensures that styles are loaded only when their associated components are rendered, reducing unused CSS on initial load.

### Methods:
1. **Import CSS Inside Components**:
   Import the CSS file directly within the component that uses it. This ensures that the CSS is bundled with the component and loaded only when the component is rendered.
   ```javascript
   import './styles.css'; // Inside the lazy-loaded component
   ```

2. **Dynamic Import for CSS**:
   For more control, you can dynamically load CSS files using JavaScript when a component is rendered:
   ```javascript
   function loadCSS(url) {
     const link = document.createElement('link');
     link.rel = 'stylesheet';
     link.href = url;
     document.head.appendChild(link);
   }

   React.useEffect(() => {
     loadCSS('/path/to/styles.css');
   }, []);
   ```

3. **Using Libraries or Frameworks**:
   Frameworks like Next.js offer options for lazy loading both components and styles using `next/dynamic`. For example:
   ```javascript
   import dynamic from 'next/dynamic';

   const LazyComponent = dynamic(() => import('./LazyComponent'), { ssr: false });
   ```

4. **CSS Modules with Lazy Loading**:
   If you're using CSS modules, ensure they are imported in the lazy-loaded component. However, note that some bundlers may still include all CSS in the initial build unless configured otherwise[3][7].

By combining these techniques, you can optimize your React application to load only necessary code and styles on demand, improving performance and reducing initial load times[1][3][5].

Citations:
[1] https://www.letsbuildui.dev/articles/how-to-lazy-load-react-components/
[2] https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c
[3] https://stackoverflow.com/questions/55338744/load-react-chunk-css-only-when-its-needed
[4] https://www.youtube.com/watch?v=nS5qbSJLGx8
[5] https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
[6] https://react.dev/reference/react/lazy
[7] https://github.com/facebook/create-react-app/issues/5987
[8] https://www.reddit.com/r/nextjs/comments/1djuflg/how_can_i_lazily_load_a_css_file_to_prevent_it/
