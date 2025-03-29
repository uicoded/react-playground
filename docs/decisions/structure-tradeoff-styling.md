# Structure Trade-offs Styling

## Separate styles from components

Example on Navigation component

1. The Navigation component has its own dedicated CSS file (`Navigation.css`)
2. The styles are imported globally in `index.css` rather than being imported directly in the component
3. This creates a global CSS scope where Navigation styles are available throughout the application

## Best Practices for Component Styling in React

Here are some better approaches for organizing component styles in a React application:

### 1. Co-located Component CSS Modules

```typescript
import styles from './Navigation.module.css';
// Then use like: className={styles.listNav}
```

**Benefits:**

- CSS is scoped to the component
- Prevents style leakage and naming conflicts
- Keeps related code together
- Better for code splitting

### 2. CSS-in-JS Solutions

Using libraries like styled-components or emotion:

```typescript
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 15px;
  border-radius: 8px;
  max-width: 300px;
`;

// Then use like: <Nav>...</Nav>
```


**Benefits:**

- Dynamic styling based on props
- No need for separate CSS files
- Styles are truly encapsulated with the component

### 3. Utility-First CSS (Tailwind CSS)

```typescript
// Using utility classes directly in JSX
<nav className="p-4 rounded-lg max-w-xs">
```

**Benefits:**

- Rapid development
- Consistent design system
- No need to write and maintain custom CSS

## Suggestion 1: CSS Modules

1. **Use CSS Modules**: Rename `Navigation.css` to `Navigation.module.css` and import it directly in the component
2. **Component-specific styles**: Keep all component-specific styles in the module
3. **Shared styles**: Move any shared styles to a separate `common.css` or theme files
4. **Remove global imports**: Remove the import from `index.css` and let each component manage its own styles

### Implementation Example

```typescript
import { JSX, useState, useEffect, useMemo } from 'react';
import styles from './Navigation.module.css';

// ...existing code...

function Navigation({ data, onExampleSelect, selectedItem: propSelectedItem, multipleOpen = false }: NavigationProps) {
  // ...existing code...
  
  return (
    <nav className={styles.listNav} aria-label="Produce Navigation">
      <ul className={styles.categoryList}>
        {categoryTree.map(node => renderCategory(node))}
      </ul>
    </nav>
  );
}
```

This approach keeps your styles modular, maintainable, and properly encapsulated with the components they belong to, which becomes increasingly important as the application grows.