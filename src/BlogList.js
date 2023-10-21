import React, { useEffect, useState } from 'react';
import { getBlogPosts } from './apiService';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Unexpected data structure received");
        }
      } catch (error) {
        setError("An error occurred while fetching posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {Array.isArray(posts) && posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default BlogList;
