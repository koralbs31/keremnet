import React, { useEffect, useState } from 'react';
import './Homepage.css';
import PostType from '../../../../Types/Post';
import axios from 'axios';
import PostView from './PostsView/PostView';
import { ROUTES } from '../../../../Routes';
import { User } from '../../../../App';
import { useSnackbar } from '../../../../Modals/SnackbarContext';

interface HomepageProps {
  user: User | null;
}

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get<PostType[]>(ROUTES.posts);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to fetch posts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  if (!user) {
    return (
      <div className="not-logged-in">
        <h1>Please log in to view posts.</h1>
        <p>Sorry but this site is reserved for kerem students only.</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <PostView
        posts={posts}
        user={user}
        loading={loading}  
        refreshPosts={fetchPosts} 
      />
    </div>
  );
};

export default Homepage;
