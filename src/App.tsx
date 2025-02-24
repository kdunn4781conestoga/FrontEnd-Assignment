/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { REDDIT_URL } from "./consts";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import { SubReddit } from "./SubReddit";
import { Post } from "./Post";
import PostListView from "./components/PostListView/PostListView";

function App() {
  const [subRedditSearch, setSubRedditSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<SubReddit[]>([]);
  const searchTimeout = useRef<number | null>(null);
  const [preventSearch, setPreventSearch] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showFavouritePosts, setShowFavouritePosts] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [favouritedPosts, setFavouritedPosts] = useState<Post[]>([]);

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

  const searchForPosts = async (subRedditName: string) => {
    setLoading(true);
    setError("");
    setPosts([]);
    try {
      const result = await fetch(
        `${REDDIT_URL}/r/${subRedditName}/hot.json?limit=10`
      );

      if (result.ok) {
        const content = await result.json();
        const posts = content.data.children.map(
          (child: any) =>
            ({
              id: child.data.id,
              title: child.data.title,
              score: child.data.score,
              url: child.data.url,
              subreddit: child.data.subreddit,
            } as Post)
        ) as Post[];

        return posts;
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

    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("srName") as string;

    searchForPosts(searchValue).then((posts: Post[] | undefined) => {
      setPosts(posts ?? []);
    });
  };

  const addToFavorites = (id: string, favourite: boolean) => {
    if (favourite) {
      const updatedFavorites = [...favourites, id];
      setFavourites(updatedFavorites);
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favourites.filter((f) => f != id);
      setFavourites(updatedFavorites);
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    }
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

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favourites');
    if (savedFavorites) {
      setFavourites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (favourites.length > 0) {
      }
    };

    fetchPosts();
  }, [favourites]);

  return (
    <main>
      <button type="button" onClick={() => {
        setShowFavouritePosts(!showFavouritePosts);
      }}>{!showFavouritePosts ? "Show" : "Hide"} Favourites</button>
      {showFavouritePosts ? (
        <PostListView loading posts={favouritedPosts} favourites={favourites} handleAddFavourite={addToFavorites}/>
      ) : (
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
          <PostListView posts={posts} loading={false} handleAddFavourite={addToFavorites} favourites={favourites}/>
        </>
      )}
    </main>
  );
}

export default App;
