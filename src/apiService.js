const baseURL = "http://localhost:5000";

const defaultHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}


export const modifyBlogPost = async (blogId, title, content) => {
  try {
    const response = await fetch(`${baseURL}/routes/blogposts/${blogId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...defaultHeaders() },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error modifying blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (blogId) => {
  try {
    const response = await fetch(`${baseURL}/routes/blogposts/${blogId}`, {
      method: 'DELETE',
      headers: defaultHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

// Auth API
export const signUp = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/routes/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/routes/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseURL}/routes/logout`, { 
      method: 'POST', 
      headers: defaultHeaders() 
    });
    if (!response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || 'Invalid response from server.');
      } catch {
        throw new Error(text || 'Invalid response from server.');
      }
    }
    return response.json();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};


export const createBlogPost = async (title, content, image) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    const response = await fetch(`${baseURL}/routes/blogposts`, {
      method: 'POST',
      headers: {
          ...defaultHeaders()
      },
      body: formData
  });
  

    if (!response.ok) {
        throw new Error(`Failed to create blog post (HTTP ${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};





export const getBlogPosts = async () => {
  try {
    const response = await fetch(`${baseURL}/routes/blogposts`, {
      headers: defaultHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user blog posts:", error);
    throw error;
  }
};

// Review API
export const createReview = async (blogId, reviewText) => {
  try {
    const response = await fetch(`${baseURL}/routes/blogposts/${blogId}/reviews`, {
      method: 'POST',
      headers: {
        ...defaultHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: reviewText })

      // body: JSON.stringify({ text: reviewText })  // assuming your backend expects the key to be "text"
    });
    if (!response.ok) {
      throw new Error(`Failed to create review (HTTP ${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};


export const getReviews = async (blogId) => {
  try {
    const response = await fetch(`${baseURL}/routes/blogposts/${blogId}/reviews`, {
      headers: defaultHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
