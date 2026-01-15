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

const fetchPosts = async (): Promise<PostType[]> => {
  const res = await axios.get<PostType[]>(ROUTES.posts);
  return res.data;
};

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar(); 

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
        showSnackbar("Failed to fetch posts", "error");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [user, showSnackbar]);

  if (!user) {
    return (
      <div className="not-logged-in">
        <h1>Please log in to view posts.</h1>
        <p>Sorry but this site is reserved for kerem students only.</p>
        <p>Zeus, Methoda, Gefen please go away.</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <PostView posts={posts} user={user} Loading={loading} />
    </div>
  );
};

export default Homepage;
