import React, { useState, useEffect } from 'react';
import { createBlogPost } from './apiService';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleCreateBlogPost = async () => {
    if (!authenticated) {
      setError('Please log in to create a blog post.');
      return;
    }
  
    try {
      const result = await createBlogPost(title, content);
      if (result.message === 'BlogPost created successfully!') {
        
        setSuccessMessage(result.message);
  
        
        setTitle('');
        setContent('');
  
        
        const updatedBlogPosts = await apiService.getBlogPosts();
        setBlogPosts(updatedBlogPosts);
      } else {
        setError('Failed to create the blog post.');
      }
    } catch (err) {
      setError('Failed to create the blog post.');
    }
  };
  

  return (
    <div>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleCreateBlogPost}>Create Blog Post</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateBlog;
