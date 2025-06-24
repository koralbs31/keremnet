import React, { useEffect, useState } from 'react';
import './Homepage.css';
import PostType from '../../../../Types/PostType';
import axios from 'axios';
import PostView from './PostsView/PostView';

const fetchPosts = async (): Promise<PostType[]> => {
    try {
        const response = await axios.get<PostType[]>('http://localhost:3000/posts');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch posts');
    }
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
            <PostView Posts={posts} Loading={loading} />
        </div>
    );
};

export default Homepage;