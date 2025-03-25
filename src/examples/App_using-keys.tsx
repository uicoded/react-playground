import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: "apple", value: "🍎 apple" },
    { id: "orange", value: "🍊 orange" },
    { id: "grape", value: "🍇 grape" },
    { id: "pear", value: "🍐 pear" },
  ]);

  const [autoShuffle, setAutoShuffle] = useState(true);
  const [mainKey, setMainKey] = useState(0);

  useEffect(() => {
    if (autoShuffle) {
      // NOTE: setItems() can accept a fn
      const id = setInterval(() => setItems(shuffle), 3000);
      return () => clearInterval(id);
    }
  }, [autoShuffle]);

  function getChangeHandler(item: (typeof items)[number]) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      setItems((allItems) =>
        allItems.map((i) => ({
          ...i,
          value: i.id === item.id ? newValue : i.value,
        }))
      );
    };
  }

  return (
    <div className="keys">
      <main key={mainKey}>
        <h1>keys in React</h1>
        <p>
          Keys tell React which array item each component corresponds to, so
          that it can match them up later. This becomes important if your array
          items can move (e.g. due to sorting), get inserted, or get deleted. A
          well-chosen key helps React infer what exactly has happened, and make
          the correct updates to the DOM tree.
        </p>
        <p>
          <a href="https://react.dev/learn/rendering-lists#rules-of-keys">
            Rules of keys
          </a>
          :
        </p>
        <ul>
          <li>
            Keys must be unique among siblings. However, it’s okay to use the
            same keys for JSX nodes in different arrays.
          </li>
          <li>
            Keys must not change or that defeats their purpose! Don’t generate
            them while rendering. (see the third example not working)
          </li>
        </ul>
        <p>
          Did you know the Window has{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto">
            Crypto
          </a>{" "}
          basic cryptography features with{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID">
            randomUUID()
          </a>{" "}
          method?
        </p>
        <div>
          <p>
            Focus on a field and see if it keeps the focus after shuffle (Hint:
            it does only with a proper key
          </p>
          <h2>Without a key</h2>
          <ul style={{ display: "flex", gap: "10px" }}>
            {items.map((item, index) => (
              <li>
                <label htmlFor={`no-key-${item.id}-input`}>
                  No key #{index + 1}
                </label>
                <input
                  id={`no-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>With array index as key</h2>
          <ul style={{ display: "flex", gap: "10px" }}>
            {items.map((item, index) => (
              <li key={index}>
                <label htmlFor={`index-key-${item.id}-input`}>
                  Index key #{index + 1}
                </label>
                <input
                  id={`index-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>With a generated key</h2>
          <ul style={{ display: "flex", gap: "10px" }}>
            {items.map((item, index) => (
              <li key={self.crypto.randomUUID()}>
                <label htmlFor={`proper-key-${item.id}-input`}>
                  Proper key #{index + 1}
                </label>
                <input
                  id={`proper-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>With a proper key</h2>
          <ul style={{ display: "flex", gap: "10px" }}>
            {items.map((item, index) => (
              <li key={item.id}>
                <label htmlFor={`proper-key-${item.id}-input`}>
                  Proper key #{index + 1}
                </label>
                <input
                  id={`proper-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <aside style={{ marginTop: "40px" }}>
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <input
            id="autoshuffle"
            type="checkbox"
            checked={autoShuffle}
            onChange={(event) => setAutoShuffle(event.target.checked)}
          />
          <label htmlFor="autoshuffle">Auto-shuffle inputs</label>
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <p>
            NOTE: Assigning new key is akin to removing the element and bringing new copy of the component.
          </p>
          <button onClick={() => setMainKey((k) => k + 1)}>
            Reset Everything
          </button>
        </div>
      </aside>
    </div>
  );
}

function shuffle<ArrayType>(originalArray: Array<ArrayType>) {
  const array = [...originalArray];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
