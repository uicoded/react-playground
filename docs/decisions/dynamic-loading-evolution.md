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

### Cons

- Seems to be slower.
- More complex.
- Additiona prebuild step.
- Works with Suspense.
