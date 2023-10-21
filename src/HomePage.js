import React from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
    const location = useLocation();

    if (location.pathname !== "/") {
        return null;
    }

    return (
        <div>
            <div className="navbar">
                <h1>BLOG MANAGEMENT SYSTEM</h1>
            </div>

            <div className="main-content">
                <img src="/chat6.png" alt="Blogging" />

                {/* <img src="/chat6.png" alt="Blogging" /> */}

                <div className="info">
                    <h2>Unlock the Power of Blogging</h2>
                    <p>Embark on a journey through the world of words with our advanced Blog Management System. Explore, create, and manage content, providing and receiving insights along the way.</p>
                    <h3>Experience Seamless Content Management</h3>
                </div>

                <div className="blog-intro" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img src="/Image3.webp" alt="Blogging " style={{ flex: 1, maxWidth: '50%', height: 'auto' }} />
                    <div style={{ flex: 2 }}>
                        <h2>Experience an Intuitive Content Journey</h2>
                        <h3>Dive into our Comprehensive Blogging Platform</h3>
                        <p>Step into the world of Blog Management. Our state-of-the-art system aids users in articulating and disseminating their ideas effortlessly. Whether it's creating posts or reviewing them, our platform boasts features for a smooth and captivating experience.</p>
                    </div>
                </div>

                <div className="random-blog-posts">
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Random Blog Posts</h2>

                    <div className="blog-posts-container" style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                        <div className="post">
                            <img src="/BL1.jpg" alt="Blog post " />
                            <h3>UK removes countervailing tariff on steel bar, rod imports from India</h3>
                            <a href="/login">Read More</a>
                        </div>

                        <div className="post">
                            <img src="/ddd.png" alt="Blog post " />
                            <h3>Whether you are an industrial hedger, physical market trader or desk trader, we offer two ways of accessing our markets...</h3>
                            <a href="/login">Read More</a>
                        </div>

                        <div className="post">
                            <img src="/eee.png" alt="Blog post " />
                            <h3>Indian supreme court rules to protect sacred hills against UK mine operation Vedanta Resources...</h3>
                            <a href="/login">Read More</a>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <p>Discover the World of Blogging</p>
                    <div className="social-icons">
                        <img src="/IN3.png" alt="Twitter" />
                        <img src="/IN2.png" alt="Facebook" />
                        <img src="/IN.jpg" alt="Instagram" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
