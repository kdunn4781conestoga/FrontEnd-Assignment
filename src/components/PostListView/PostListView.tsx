import React from 'react';
import './PostListView.css'; // Make sure to create this CSS file
import { Post } from '../../Post';
import PostView from '../PostView/PostView';

interface PostListViewProps {
  loading: boolean;
  favourites: string[];
  posts: Post[];
  handleAddFavourite: (id: string, favourite: boolean) => void;
}

const PostListView: React.FC<PostListViewProps> = ({ posts, favourites, handleAddFavourite }) => {
  return (
    <div className="container">
        {posts.length > 0 && 
            posts.map((post) => (
                <PostView key={post.id} post={post} initialFav={post.id in favourites} handleAddFavourite={handleAddFavourite}/>
            ))
        }
    </div>
  );
};

export default PostListView;
