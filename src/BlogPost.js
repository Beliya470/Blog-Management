import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/blogposts/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPost(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : post ? (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  ) : (
    <p>{error}</p>
  );
}

export default BlogPost;
