import { JSX, useState, useEffect, useMemo } from 'react';
import { default as ChevronIcon } from './icons/TriagleIcon';
import { ExampleItem as NavItem } from '../types/ExampleItem';

type NavData = {
  [category: string]: {
    [key: string]: NavItem[];
  };
};

type CategoryState = {
  [key: string]: boolean;
};

// Hierarchical structure for categories
type CategoryNode = {
  name: string;
  fullPath: string;
  items?: NavItem[];
  children: CategoryNode[];
};

type NavigationProps = {
  data: NavData;
  onExampleSelect?: (item: NavItem) => void;
  // TODO: currently this is only path, make it item
  selectedItem?: string | null;
  multipleOpen?: boolean;
  hideArrows?: boolean;
};

function Navigation({
  data,
  onExampleSelect,
  selectedItem: propSelectedItem,
  multipleOpen = false,
  hideArrows = false
}: NavigationProps) {
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState<CategoryState>({});
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State to track the selected item internally
  const [selectedItem, setSelectedItem] = useState<string | null>(propSelectedItem || null);

  // Find the category path for a given item path
  const findCategoryForItem = (itemPath: string): string | null => {
    const firstKey = Object.keys(data)[0] as keyof typeof data;

    for (const [categoryPath, items] of Object.entries(data[firstKey])) {
      for (const item of items) {
        if (item.path === itemPath || (item.paths && item.paths.includes(itemPath))) {
          return categoryPath;
        }
      }
    }
    return null;
  };

  // Expand parent categories for a given category path, respecting multipleOpen setting
  const expandParentCategories = (categoryPath: string) => {
    if (!categoryPath) return;

    const pathParts = categoryPath.split('/');
    let newExpandedState: CategoryState = {};

    // If multipleOpen is true, preserve existing expanded categories
    if (multipleOpen) {
      newExpandedState = { ...expandedCategories };
    } else {
      // For single-open mode, we need to be more selective
      // We'll keep categories at different levels than the ones we're expanding
      Object.entries(expandedCategories).forEach(([key, value]) => {
        // Keep categories that aren't in the path to our target
        // and aren't at the same level as any part of our path
        const keyParts = key.split('/');
        let keepCategory = true;

        for (let i = 0; i < Math.min(keyParts.length, pathParts.length); i++) {
          const partialTargetPath = pathParts.slice(0, i + 1).join('/');
          const partialKeyPath = keyParts.slice(0, i + 1).join('/');

          // If at this level, the paths differ but have the same depth,
          // we should close this category in single-open mode
          if (partialTargetPath !== partialKeyPath && keyParts.length === i + 1) {
            keepCategory = false;
            break;
          }
        }

        if (keepCategory) {
          newExpandedState[key] = value;
        }
      });
    }

    // Now expand all categories in the path
    let currentPath = '';
    for (let i = 0; i < pathParts.length; i++) {
      currentPath = currentPath ? `${currentPath}/${pathParts[i]}` : pathParts[i];
      newExpandedState[currentPath] = true;
    }

    setExpandedCategories(newExpandedState);
  };

  // Effect to handle initial and updated selectedItem prop
  useEffect(() => {
    if (propSelectedItem) {
      setSelectedItem(propSelectedItem);
      const categoryPath = findCategoryForItem(propSelectedItem);
      if (categoryPath) {
        expandParentCategories(categoryPath);
      }
    }
  }, [propSelectedItem, multipleOpen]);

  // Toggle category expansion
  function toggleCategory(path: string) {
    // Update selected category
    setSelectedCategory(path);

    // Only clear selected item when a category is selected in single-open mode
    // In multipleOpen mode, preserve the selected item
    if (!multipleOpen) {
      setSelectedItem(null);
    }

    setExpandedCategories(prev => {
      const isCurrentlyExpanded = prev[path];

      // If we're closing the current category, just return the updated state
      if (isCurrentlyExpanded) {
        return {
          ...prev,
          [path]: false
        };
      }

      // If multipleOpen is true, simply toggle this category
      if (multipleOpen) {
        return {
          ...prev,
          [path]: true
        };
      }

      // For single-open mode (multipleOpen = false)
      // Create a new state object
      const newState: Record<string, boolean> = {};

      // Get the parent path level
      const pathParts = path.split('/');
      const parentLevel = pathParts.length - 1;

      // Preserve expanded state of categories at different levels
      Object.entries(prev).forEach(([key, value]) => {
        const keyParts = key.split('/');
        const keyLevel = keyParts.length - 1;

        // If this is at a different level than the one we're toggling
        // OR if it's a descendant of the path we're toggling
        // then preserve its state
        if (keyLevel !== parentLevel ||
            (path.length < key.length && key.startsWith(path + '/'))) {
          newState[key] = value;
        }
      });
      // Set the current path to expanded
      newState[path] = true;

      return newState;
    });
  }


  // Build hierarchical tree from flat category paths
  function buildCategoryTree(): CategoryNode[] {
    const root: CategoryNode[] = [];
    const firstKey = Object.keys(data)[0] as keyof typeof data;

    Object.entries(data[firstKey]).forEach(([categoryPath, items]) => {
      const parts = categoryPath.split('/');
      let currentLevel = root;
      let currentPath = '';

      // Process each part of the path
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        // Find existing node at this level
        let node = currentLevel.find(n => n.name === part);

        if (!node) {
          // Create new node if it doesn't exist
          node = {
            name: part,
            fullPath: currentPath,
            children: []
          };
          currentLevel.push(node);
        }

        // If this is the last part, add items
        if (i === parts.length - 1) {
          node.items = items;
        }

        // Move to next level
        currentLevel = node.children;
      }
    });

    return root;
  }

  // Render a single example item
  function renderNavigationItem(item: NavItem) {
    const path = item.path || (item.paths && item.paths[item.paths.length - 1]);
    if (!path) return null;

    // Check if this item is active
    const isActive = selectedItem === path;

    return (
      <li key={path} className="nav-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // When an item is selected, clear the category selection
            setSelectedCategory(null);
            // Set this item as selected
            setSelectedItem(path);
            if (onExampleSelect) {
              onExampleSelect(item);
            }
          }}
          className={isActive ? 'active' : ''}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.name}
        </a>
      </li>
    );
  }

  // Recursively render a category and its children
  function renderCategory(node: CategoryNode, level: number = 0) {
    const isExpanded = !!expandedCategories[node.fullPath];
    const isSelected = selectedCategory === node.fullPath;
    const HeadingTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
    const categoryId = `category-${node.fullPath.replace(/\//g, '-')}`;
    const displayName = node.name.charAt(0).toUpperCase() + node.name.slice(1);

    // Determine if this category should be highlighted
    // A category is highlighted if it's selected AND no item is selected
    const isHighlighted = isSelected && !selectedItem;

    return (
      <li key={node.fullPath} className={`category category-level-${level}`}>
        <div className="category-header-wrapper">
          <HeadingTag
            className={`category-heading ${isExpanded ? 'category-heading-active' : ''} ${isHighlighted ? 'active' : ''}`}
          >
            <button
              onClick={() => toggleCategory(node.fullPath)}
              className="category-button"
              aria-expanded={isExpanded}
              aria-controls={categoryId}
            >
              <span className="category-text">{displayName}</span>
              {!hideArrows && <ChevronIcon className="toggle-icon" />}
            </button>
          </HeadingTag>
        </div>

        {isExpanded && (
          <ul id={categoryId} className="subcategory-list">
            {/* Render child categories */}
            {node.children.length > 0 &&
              node.children.map(child => renderCategory(child, level + 1))
            }

            {/* Render example items */}
            {node.items && node.items.map(item => renderNavigationItem(item))}
          </ul>
        )}
      </li>
    );
  }

  // Build the category tree
  const categoryTree = useMemo(() => buildCategoryTree(), [data]);

  return (
    <nav className="list-nav" aria-label="Produce Navigation">
      <ul className="category-list">
        {categoryTree.map(node => renderCategory(node))}
      </ul>
    </nav>
  );
}

export default Navigation;