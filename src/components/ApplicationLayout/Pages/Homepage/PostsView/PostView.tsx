import React from 'react';
import './PostView.css';
import PostType from '../../../../../Types/Post';
import Post from '../../../../Post/Post';

interface Props {
    posts: PostType[];
    Loading?: boolean;
}

const PostView: React.FC<Props> = ({ posts, Loading }) => {
    return (
        <div className="homepage">
            <main className="homepage-main">
                {Loading ? (
                    <div className="homepage-loading">Loading posts...</div>
                ) : (
                    <ul className="homepage-posts">
                        {posts.map((post, index) => (
                            <li className="homepage-post" key={post.title + post.publishedAt + index}>
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

export default PostView;