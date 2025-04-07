# Dynamic Loading Evolution


## Version 1

Purely dynamic loading with import().

### Pros
- Simple
- Fast

### Cons
- Works only in dev


## Version 2

Dynamic loading with React.lazy() and Component Map

Prebuild step (`scripts/build-component-map.ts`) generates a component map `src/utils/generatedImports.ts` from `examples/examples.json` definition. This is used for Vite corrent code splitting, read more about [react-lazy-and-dynamic-imports](../react-lazy-and-dynamic-import-path.md).

### Pros

- Build the prod.  
  Code splitting works based on a single config `examples/examples.json`, does not require `vite.config.ts` manual adjustments (in two places) or ambiguous import all from the `src/examples` route.
- Works with Suspense.

### Cons

- Seems to be slower.
- More complex.
- Additiona prebuild step.


## Version 3

Upto this point styles were imported dynamically with bundler support for CSS import with `import()`, which had some limitations.
The browser native [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) is intended for loading JavaScript modules not CSS.
See [import JS and CSS — sandbox-js](https://github.com/uicoded/sandbox-js/tree/main/src/modules/import#) tests.

One simple solution to this is dynamically add a `<style>` tag to the document head. And remove it when the component is unmounted.

Sidenote: There is an option to import CSS inside a component. This will not however remove style when the component is unmounted.
