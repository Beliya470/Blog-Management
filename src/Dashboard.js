import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as apiService from "./apiService";
import './Dashboard.css';

const Dashboard = () => {

    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    
    const [reviewTexts, setReviewTexts] = useState({});

    // const [reviews, setReviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    
    const fetchBlogPosts = async () => {
        try {
            const data = await apiService.getBlogPosts();  // Make sure this function name is correct
            setBlogPosts(data);
        } catch (error) {
            console.error("Failed to fetch blog posts:", error);
        }
    };
    

    
    useEffect(() => {
        fetchBlogPosts();
        setSuccessMessage("Blog post created successfully!");

    }, []);    

    useEffect(() => {
        if (!localStorage.getItem("token") && location.pathname === "/dashboard") {
            navigate("/login");
        }
    }, [location, navigate]);

    useEffect(() => {
        console.log(blogPosts);
    }, [blogPosts]);

    const handlePostCreate = async () => {
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
            }

    
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await apiService.createBlogPost(title, content, image);

            // const response = await apiService.createBlogPost({ title, content, image });

            

            console.log("Newly created blog post:", response.blogPost);
            if (response.success) {
                
                fetchBlogPosts();

                
                setTitle("");
                setContent("");
                setImage(null);
                setSuccessMessage("");
            } else {
                console.error('Failed to create the blog post');
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    const handleDeletePost = async (blogId) => {
        try {
            await apiService.deleteBlogPost(blogId);
            
            setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== blogId));
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const handleCreateReview = async (blogId, reviewText) => {
        try {
            const response = await apiService.createReview(blogId, reviewText);

            // const response = await apiService.createReview(blogId, { content: reviewText });
    
            if (response.message === "Review added successfully!") {  // <-- This is the new condition
                setReviewTexts(prev => ({ ...prev, [blogId]: '' }));
                
                // Update the blogPosts state to include the new review for the particular blog post
                setBlogPosts(prevPosts => {
                    const updatedPosts = prevPosts.map(post => {
                        if (post.id === blogId) {
                            return {
                                ...post,
                                reviews: [...post.reviews, response.review]
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
                
            } else {
                console.error('Failed to create the review');
            }
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };
    
    
    
    // const handleLogOut = async () => {
    //     try {
    //         const response = await apiService.logout();
    //         if (response.success) {
    //             navigate("/login");  
    //         } else {
    //             console.error('Failed to logout');
    //         }
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };
     

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Blogging Hub 🌟!</h1>
            <p className="introduction">
                Dive into a world of stories, insights, and experiences. Read captivating blogs from others, share your 
                own tales, interact through comments, and manage your masterpieces—all from this dashboard.
            </p>
            
            {successMessage && <p className="success-message">{successMessage}</p>}
            <img src="Image1.jpeg" alt="Blogging Odyssey Begins!" className="dashboard-image" />
            <p>Create and Post your Blog!</p>
            
            <div className="post-form">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button onClick={handlePostCreate}>Create Post</button>
            </div>
            <div className="blog-posts">
                
                
                
                <h2>Your Blog Posts</h2>
                {blogPosts.filter(Boolean).map(post => (

                
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        
                        <img src={`/uploads/${post?.image_file}`} alt={post?.title} />
                        <p>{post?.content}</p>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        <div>
                            <textarea
                                placeholder="Leave a review..."
                                
                                value={reviewTexts[post.id] || ""}
                                onChange={(e) => setReviewTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                            />
                                {/* onChange={(e) => setReviewTexts(e.target.value)}
                            /> */}
                            <button onClick={() => handleCreateReview(post.id, reviewTexts[post.id] || "")}>Post Review</button>

                            {/* <button onClick={() => handleCreateReview(post.id)}>Post Review</button> */}
                        </div>
                        <div className="reviews">
                            {post.reviews && post.reviews.map(review => (
                            
                                <div key={review.id} className="review-item">
                                    <p>{review?.content || ''}</p>

                                
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
