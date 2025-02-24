import { useEffect, useRef, useState } from "react";
import "./App.css";
import { REDDIT_URL } from "./consts";
import InputWrapper from "./components/InputWrapper/InputWrapper";

function App() {
  const [subRedditSearch, setSubRedditSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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

        console.log(content);
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
        </div>
        <button type="submit">Search for Posts</button>
      </form>
    </>
  );
}

export default App;
