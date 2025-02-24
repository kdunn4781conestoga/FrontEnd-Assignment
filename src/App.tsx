import { useState } from "react";
import "./App.css";

function App() {
  const [subRedditSearch, setSubRedditSearch] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="searchContainer">
          <input
            name="srName"
            content={subRedditSearch}
            value={subRedditSearch}
            onInput={(event) => {
              setSubRedditSearch(event.currentTarget.value);
            }}
          />
        </div>
        <button type="submit">Search for Posts</button>
      </form>
    </>
  );
}

export default App;
