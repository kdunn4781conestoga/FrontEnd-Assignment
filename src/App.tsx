import { useEffect, useRef, useState } from "react";
import "./App.css";
import { REDDIT_URL } from "./consts";

function App() {
  const [subRedditSearch, setSubRedditSearch] = useState<string>("");
  const searchTimeout = useRef<number | null>(null);

  const searchForSubReddit = async (searchName: string) => {
    const result = await fetch(
      `${REDDIT_URL}/subreddits/search.json?q=${searchName}`
    );

    if (result.ok) {
      const content = await result.json();

      console.log(content);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (subRedditSearch) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = window.setTimeout(() => {
        searchForSubReddit(subRedditSearch);
      }, 1000);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subRedditSearch]);

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
