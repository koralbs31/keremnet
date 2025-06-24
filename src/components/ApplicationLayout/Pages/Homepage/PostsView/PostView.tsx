import React, { useState } from 'react';
import './PostView.css';
import PostType from '../../../../../Types/Post';
import Post from '../../../../Post/Post';
import PostModal from '../../../../../Modals/PostModal';
import Button from '@mui/material/Button';

interface Props {
  posts: PostType[];
  Loading?: boolean;
}

const PostView: React.FC<Props> = ({ posts, Loading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const handleViewPost = (post: PostType) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  return (
    <div className="homepage">
      <main className="homepage-main">
        {Loading ? (
          <div className="homepage-loading">Loading posts...</div>
        ) : (
          <ul className="homepage-posts">
            {posts.map((post, index) => (
              <li className="homepage-post" key={post.title + post.publishedAt + index}>
                <Post {...post} />
                <Button variant="contained" onClick={() => handleViewPost(post)}>View Post</Button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {modalOpen && selectedPost && (
        <PostModal setOpenModal={setModalOpen} post={selectedPost} />
      )}
    </div>
  );
};

export default PostView;