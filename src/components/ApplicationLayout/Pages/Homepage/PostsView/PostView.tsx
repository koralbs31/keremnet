import React from 'react';
import './PostView.css';
import PostType from '../../../../../Types/PostType';
import Post from '../../../../Post/Post';

interface Props {
    Posts: PostType[];
    Loading?: boolean;
}

const PostView: React.FC<Props> = ({ Posts, Loading }) => {
    return (
        <div className="homepage">
            <main className="homepage-main">
                {Loading ? (
                    <div className="homepage-loading">Loading posts...</div>
                ) : (
                    <ul className="homepage-posts">
                        {Posts.map((post, index) => (
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