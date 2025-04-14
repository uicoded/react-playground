# react-playground

## About

This is a playground for testing react features.  
It uses React + TypeScript + Vite boilerplate from [stackblitz](https://stackblitz.com/).  
Find all examples here: https://github.com/uicoded/react-playground

## Main Goals

- Unopionated test ground for react features.
- Test core features, browser related APIs, bring minimal dependencies.
- Preview all examples in the browser without constantly updating the `main.tsx` file or adding a router.

## How To Use

Clone this repo, install and run (`npm run dev`).  
Use your editor to browse the code and your browser to preview all examples.

Looking at `main.tsx` you can see that there is `Playground` component that eighter imports examples statically (inside `./App_playground-static.tsx`) or dynamically (inside `./App_playground.tsx`). The former enables you to test (and isolate) your examples by linking imports manually. The latter is used to preview all examples in the browser without constantly changing the `App` for imports by updating an `example.json` file and running `npm run examples`.

### `examples.json` file

`examples.json` file is used to generate the example tree Navigation and load the example components dynamically. `examples.json` has flat structure with keys defining the tree hierarchy by slashes (e.g. 'hooks/use-state' defines 'hooks' category with 'use-state' sub-category) and values define an items to load.

### Building

`npm run build` creates a `dist` folder with all examples and code splitting of example chunks. There is prebuild step that helps with the process. Read the [dynamic loading evolution](docs/decisions/dynamic-loading-evolution.md) documentation for more details.

### Serving

To start a local server after successful build (serving static files from the `dist` folder) run `npm run preview` (or `npx vite preview`). Or alternatively use provided [serve](https://www.npmjs.com/package/serve) server and start it by `npm run serve`.

## Prerequisites

[node.js](https://nodejs.org/en): tested with (v22.14.0).
Currently the example tree is generated from `examples.json` file.

## Conventions

- Each example exports `App`, example file has `App_` prefix.
- Most examples don't have long descriptions. Make comments directly in the code if necessary.
- Update the `examples.json` file after adding new example otherwise you won't see it automatically in the browser.

## Feedback

Contructive feedback welcome in [issues](https://github.com/uicoded/react-playground/issues).
