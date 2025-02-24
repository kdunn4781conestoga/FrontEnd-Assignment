import React from 'react';
import './PostListView.css'; // Make sure to create this CSS file
import { Post } from '../../Post';
import PostView from '../PostView/PostView';

interface PostListViewProps {
  loading: boolean;
  posts: Post[];
}

const PostListView: React.FC<PostListViewProps> = ({ posts }) => {
  return (
    <div className="container">
        {posts.length > 0 && 
            posts.map((post) => (
                <PostView key={post.id} post={post}/>
            ))
        }
    </div>
  );
};

export default PostListView;
