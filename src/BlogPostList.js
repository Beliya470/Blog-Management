import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogPostList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/blogposts');
                setPosts(res.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
}

export default BlogPostList;
