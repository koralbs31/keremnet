import React, { useEffect, useState } from 'react';
import './Homepage.css'
import Post from '../../../Post/Post';
import PostType from '../../../../Types/Post';

const fetchPosts = async (): Promise<PostType[]> => {
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

const Homepage: React.FC = () => {
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
        loadPosts();
    }, []);

    return (
        <div className="homepage">
            <main className="homepage-main">
                {loading ? (
                    <div className="homepage-loading">Loading posts...</div>
                ) : (
                    <ul className="homepage-posts">
                        {posts.map((post, idx) => (
                            <li className="homepage-post" key={post.title + post.publishedAt + idx}>
                                <Post
                                    title={post.title}
                                    author={post.author}
                                    publishedAt={post.publishedAt}
                                    content={post.content}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default Homepage;
