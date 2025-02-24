/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { REDDIT_URL } from "./consts";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import { SubReddit } from "./SubReddit";

function App() {
  const [subRedditSearch, setSubRedditSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<SubReddit[]>([]);
  const [preventSearch, setPreventSearch] = useState(false);
  const searchTimeout = useRef<number | null>(null);

  const searchForSubReddit = async (searchName: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await fetch(
        `${REDDIT_URL}/subreddits/search.json?q=${searchName}`
      );

      if (result.ok) {
        const content = await result.json();
        const subReddits = content.data.children.map(
          (child: any) =>
            ({
              id: child.data.id,
              name: child.data.display_name,
            } as SubReddit)
        );

        setResults(subReddits);
      } else {
        setError(result.statusText);
      }
    } catch {
      setError("An error occurred while fetching results.");
    }
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (subRedditSearch) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      if (preventSearch) {
        setPreventSearch(false);
      } else {
        searchTimeout.current = window.setTimeout(() => {
          searchForSubReddit(subRedditSearch);
        }, 1000);
      }
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subRedditSearch]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="searchContainer">
          <InputWrapper
            label="Search"
            name="srName"
            error={error}
            loading={loading}
            content={subRedditSearch}
            value={subRedditSearch}
            onInput={(event) => {
              setSubRedditSearch(event.currentTarget.value);
            }}
          />
          {results.length > 0 && (
            <ul className="dropdown">
              {results.map((result) => (
                <li
                  className="item"
                  key={result.id}
                  onClick={() => {
                    setPreventSearch(true);
                    setSubRedditSearch(result.name);
                    setResults([]);
                  }}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Search for Posts</button>
      </form>
    </main>
  );
}

export default App;
