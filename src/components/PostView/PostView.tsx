import React, { useState } from "react";
import "./PostView.css"; // Make sure to create this CSS file
import { Post } from "../../Post";

interface PostViewProps {
  post: Post;
  initialFav: boolean;
  handleAddFavourite: (id: string, favourite: boolean) => void;
}

const PostView: React.FC<PostViewProps> = ({
  post,
  initialFav,
  handleAddFavourite,
}) => {
  const [favourited, setFavourited] = useState(initialFav);

  const handleGoto = () => {
    window.open(post.url, "_blank");
  };

  return (
    <div className="flex-vertical postView">
      <div className="flex-horizontal">
        <p>{post.score}</p>
        <h2>{post.title}</h2>
      </div>
      <div className="flex-horizontal">
        <button
          onClick={() => {
            setFavourited(true);
            handleAddFavourite(post.id, !favourited);
          }}
        >
          {favourited ? "Unfavourite" : "Favourite"}
        </button>
        <button onClick={handleGoto}>Go to</button>
      </div>
      <p>{`r/${post.subreddit}`}</p>
    </div>
  );
};

export default PostView;
