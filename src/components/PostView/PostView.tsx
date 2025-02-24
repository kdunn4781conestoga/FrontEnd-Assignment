import React, { useState } from "react";
import "./PostView.css"; // Make sure to create this CSS file
import { Post } from "../../Post";

interface PostViewProps {
  post: Post;
}

const PostView: React.FC<PostViewProps> = ({
  post,
}) => {
  const [favourited, setFavourited] = useState(false);

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
