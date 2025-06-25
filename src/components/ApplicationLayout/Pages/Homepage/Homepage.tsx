import React, { useEffect, useState } from 'react';
import './Homepage.css';
import PostType from '../../../../Types/Post';
import axios from 'axios';
import PostView from './PostsView/PostView';
import { ROUTES } from '../../../../Routes';
import { User } from '../../../../App';

interface HomepageProps {
  user: User | null;
}

const fetchPosts = async (): Promise<PostType[]> => {
  try {
    return (await axios.get<PostType[]>(ROUTES.posts)).data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

const Homepage: React.FC<HomepageProps> = ({ user }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadPosts();
    } else {
      setLoading(false); 
    }
  }, [user]);

  if (!user) {
    return <div className="not-logged-in">
      <h1>Please log in to view posts.</h1>
      <p>Sorry but this site is reserved for kerem students only.</p>
      <p>Zeus, Methoda, Gefen please go away.</p>
      </div>;
  }

  return (
    <div className="homepage">
      <PostView posts={posts} Loading={loading} />
    </div>
  );
};


export default Homepage;
