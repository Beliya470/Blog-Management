# seed.py

from app import db, app
from models import User, BlogPost, Review
from faker import Faker
import random

fake = Faker()

def generate_users(num_users):
    users = []
    for _ in range(num_users):
        username = fake.user_name()
        # Ensure the username is unique
        while User.query.filter_by(username=username).first():
            username = fake.user_name()

        user = User(username=username)

        # Set the password
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        user.set_password(password)  # Assumes you have a method in your User model that sets the password

        # If there are other fields, set them here
        # For example, you might want to set an 'email' field
        user.email = fake.email()

        # Add the user to the list
        users.append(user)

    return users

def generate_blogposts(num_posts, users):
    blogposts = []
    for _ in range(num_posts):
        post = BlogPost(
            title=fake.sentence(),
            content=fake.text(max_nb_chars=1000),
            author=random.choice(users)  # Assumes 'author' is a field in BlogPost
        )
        blogposts.append(post)
    return blogposts

def generate_reviews(num_reviews, users, blogposts):
    reviews = []
    for _ in range(num_reviews):
        review = Review(
            content=fake.text(max_nb_chars=500),
            reviewer=random.choice(users),  # Assumes 'reviewer' is a field in Review
            blogpost=random.choice(blogposts)
        )
        reviews.append(review)
    return reviews

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        num_users = 10
        num_blogposts = 25
        num_reviews = 50

        users = generate_users(num_users)
        blogposts = generate_blogposts(num_blogposts, users)
        reviews = generate_reviews(num_reviews, users, blogposts)

        # Add the records to the session
        db.session.add_all(users)
        db.session.add_all(blogposts)
        db.session.add_all(reviews)

        # Commit the records to the database
        db.session.commit()

        print("Sample data has been seeded successfully.")
