import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProfileCard from "./ProfileCard/ProfileCard";
import { User } from "../../../../App";
import { ROUTES } from '../../../../Routes';
import axios from "axios";
import PostType from "../../../../Types/Post";
import PostView from "../Homepage/PostsView/PostView";

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<PostType[]>(`${ROUTES.posts}/user/${user.username}`);
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const avatarUrl = `${ROUTES.images}/${user.username}/profile.png`;

  return (
    <div>
      <ProfileCard
        avatarUrl={avatarUrl}
        postsCount={posts.length}
        username={user.username}
      />

      <div style={{ maxWidth: 480, margin: "2rem auto" }}>
        <h2>Your Posts</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <PostView posts={posts} user={user} Loading={loading} />
      </div>
    </div>
  );
};

export default ProfilePage;
