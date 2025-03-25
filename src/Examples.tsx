import { useState, Suspense } from 'react'
import examplesData from './examples.json'
import styled from "styled-components";

type ExampleItem = {
  name: string
  path?: string
  paths?: string[]
}

const ExampleListItem = styled.li`
  margin: 8px 0;
  list-style: none;
`;

const ExampleButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &.active {
    background-color: #2e7d32;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #4caf50;
  animation: spin 1s ease-in-out infinite;
  margin: 20px auto;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

type Example = { 
  item: ExampleItem
  isActive: boolean 
  onClick: () => void 
}

/**
 * Individual example item component that renders a button for each example
 */
const Example = ({ 
  item, 
  isActive, 
  onClick 
}: Example) => {
  const path = item.path || (item.paths && item.paths[item.paths.length - 1]);
  if (!path) return null;
  
  return (
    <ExampleListItem key={path}>
      <ExampleButton 
        onClick={onClick}
        className={isActive ? 'active' : ''}
      >
        {item.name}
      </ExampleButton>
    </ExampleListItem>
  );
};

type FolderProps = {
  displayName: string
  items: Array<ExampleItem>
  currentExample: string | null
  onExampleClick: (path: string, item: ExampleItem) => void
}

/**
 * Folder component that displays a group of related examples
 */
const Folder = ({ displayName, items, currentExample, onExampleClick }: FolderProps) => {
  return (
    <div className="folder">
      <h3 className="folder-name">
        {displayName}
      </h3>
      <ul className="example-list">
        {items && items.map(item => {
          if (!item) return null;
          const path = item.path || (item.paths && item.paths[item.paths.length - 1]);
          if (!path) return null;
          
          return (
            <Example 
              key={path}
              item={item} 
              isActive={currentExample === path}
              onClick={() => onExampleClick(path, item)}
            />
          );
        })}
      </ul>
    </div>
  );
};

/**
 * Renders a list of React examples organized by folder structure
 * Allows users to browse and select different example components
 * @returns {JSX.Element} A container with categorized example items
 */
export default function Examples() {
  const [currentExample, setCurrentExample] = useState<string | null>(null);
  const [ExampleComponent, setExampleComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { examples } = examplesData;
  
  const handleExampleClick = (path: string, item: ExampleItem) => {
    setCurrentExample(path);
    setLoading(true);
    setError(null);
    
    // Load CSS files if they exist in the paths array
    if (item.paths) {
      const cssFiles = item.paths.filter(p => p.endsWith('.css'));
      cssFiles.forEach(cssPath => {
        const importPath = cssPath
          .replace(/^\.\//, '')
          .replace(/^root\//, '');
        
        import(`./examples/${importPath}`)
          .catch(err => {
            console.error(`Failed to load CSS: ${cssPath}`, err);
          });
      });
    }
    
    // Find the TSX file to load as the component
    const tsxPath = item.paths ? 
      item.paths.find(p => p.endsWith('.tsx')) || path : 
      path;
    
    // Convert path to a format that can be used with dynamic imports
    // Remove file extension and convert to relative path
    const importPath = tsxPath
      .replace(/\.tsx$/, '')
      .replace(/^\.\//, '')
      .replace(/^root\//, '');
    
    // Dynamically import the example component
    import(`./examples/${importPath}`)
      .then(module => {
        setExampleComponent(() => module.default);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Failed to load example: ${tsxPath}`, err);
        setError(`Failed to load example: ${tsxPath}. ${err.message}`);
        setLoading(false);
      });
  };

  function renderFolders() {
    return Object.entries(examples).map(([folderPath, items]) => {
      const folderName = folderPath.split('/').pop() || folderPath;
      const isRoot = folderPath === 'root';
      const displayName = isRoot ? 'Root' : folderName.charAt(0).toUpperCase() + folderName.slice(1);
  
      return (
        <Folder 
          key={folderPath}
          displayName={displayName}
          items={items}
          currentExample={currentExample}
          onExampleClick={handleExampleClick}
        />
      );
    });
  }
  
  return (
    <div className="examples-container">
      <h1>React Examples</h1>
      <div className="folder-structure">
        {renderFolders()}
      </div>
      
      {currentExample && (
        <div className="example-preview">
          <h2>Selected Example: {currentExample}</h2>
          {loading && <LoadingSpinner />}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && ExampleComponent && (
            <div className="example-content">
              <Suspense fallback={<LoadingSpinner />}>
                <ExampleComponent />
              </Suspense>
            </div>
          )}
        </div>
      )}

      <style>{`
        .examples-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .folder-structure {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .folder {
          background:rgb(125, 122, 122);
          border-radius: 8px;
          padding: 15px;
          min-width: 250px;
        }
        
        .folder-name {
          margin-top: 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #242424;
          color: #242424;
        }
        
        .example-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .example-preview {
          margin-top: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f5f5f5;
          color: black;
        }
        
        .example-content {
          padding: 15px;
          background: white;
          border-radius: 4px;
          min-height: 200px;
          color: black;
        }
        
        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  )
}
