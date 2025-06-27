import React, { useState } from 'react';
import './PostView.css';
import PostType from '../../../../../Types/Post';
import Post from '../../../../Post/Post';
import PostModal from '../../../../../Modals/PostModal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { User } from '../../../../../App';

interface Props {
  posts: PostType[];
  user: User | null;
  loading?: boolean;
  refreshPosts: () => void;
}

const PostView: React.FC<Props> = ({ posts, user, loading, refreshPosts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const handleViewPost = (post: PostType) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
    refreshPosts();  
  };

  return (
    <div className="homepage">
      <main className="homepage-main">
        {loading ? (
          <div className="homepage-loading">
            <CircularProgress />
          </div>
        ) : (
          <ul className="homepage-posts">
            {posts.map((post, index) => (
              <li className="homepage-post" key={post.id || index}>
                <Post post={post} user={user} onPostUpdated={refreshPosts} />
                <Button variant="contained" onClick={() => handleViewPost(post)}>
                  View Post
                </Button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {modalOpen && selectedPost && (
        <PostModal onClose={handleCloseModal} post={selectedPost} />
      )}
    </div>
  );
};

export default PostView;
