# app.py

from flask import Flask, jsonify, request, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange
import os

# Local model imports
from models import db, User, BlogPost, Review

app = Flask(__name__)
CORS(app)  # handling Cross-Origin Resource Sharing
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SECRET_KEY')  # for session management

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

# Define forms
class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('password')])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class BlogPostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])

class ReviewForm(FlaskForm):
    content = TextAreaField('Content', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])

# User routes
@app.route('/')
def index():
    return "Hello, world!"


@app.route('/login', methods=['POST'])
def login_user():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            session['user_id'] = user.id
            return jsonify({'message': 'Logged in successfully'}), 200
        return jsonify({'error': 'Invalid credentials'}), 401
    return jsonify({'error': 'Login failed', 'errors': form.errors}), 400

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return make_response(jsonify({'error': 'User not found'}), 404)
    
    return jsonify({
        'id': user.id,
        'username': user.username
        # Include any other fields as needed
    }), 200

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username
        # Include any other fields as needed
    } for user in users]), 200

# BlogPost routes
@app.route('/blogposts', methods=['POST'])
def create_blogpost():
    form = BlogPostForm()
    if form.validate_on_submit():
        new_blogpost = BlogPost(title=form.title.data, content=form.content.data, user_id=session.get('user_id'))
        
        db.session.add(new_blogpost)
        db.session.commit()
        
        return jsonify({'message': 'Blog post created successfully'}), 201
    return jsonify({'error': 'Blog post creation failed', 'errors': form.errors}), 400

@app.route('/blogposts/<int:blogpost_id>', methods=['GET'])
def get_blogpost(blogpost_id):
    blogpost = BlogPost.query.get(blogpost_id)
    if blogpost is None:
        return make_response(jsonify({'error': 'Blog post not found'}), 404)
    
    return jsonify({
        'id': blogpost.id,
        'title': blogpost.title,
        'content': blogpost.content,
        'user_id': blogpost.user_id
        # Include any other fields as needed
    }), 200

@app.route('/blogposts', methods=['GET'])
def get_all_blogposts():
    blogposts = BlogPost.query.all()
    return jsonify([{
        'id': blogpost.id,
        'title': blogpost.title,
        'content': blogpost.content,
        'user_id': blogpost.user_id
        # Include any other fields as needed
    } for blogpost in blogposts]), 200

@app.route('/blogposts/<int:blogpost_id>', methods=['PUT'])
def update_blogpost(blogpost_id):
    form = BlogPostForm()
    blogpost = BlogPost.query.get(blogpost_id)
    if blogpost is None:
        return make_response(jsonify({'error': 'Blog post not found'}), 404)
    
    if form.validate_on_submit():
        blogpost.title = form.title.data
        blogpost.content = form.content.data
        # Update any other fields as needed
        
        db.session.commit()
        
        return jsonify({'message': 'Blog post updated successfully'}), 200
    return jsonify({'error': 'Update failed', 'errors': form.errors}), 400

@app.route('/blogposts/<int:blogpost_id>', methods=['DELETE'])
def delete_blogpost(blogpost_id):
    blogpost = BlogPost.query.get(blogpost_id)
    if blogpost is None:
        return make_response(jsonify({'error': 'Blog post not found'}), 404)
    
    db.session.delete(blogpost)
    db.session.commit()
    
    return jsonify({'message': 'Blog post deleted successfully'}), 200

# Review routes
@app.route('/reviews', methods=['POST'])
def create_review():
    form = ReviewForm()
    if form.validate_on_submit():
        new_review = Review(content=form.content.data, rating=form.rating.data, user_id=session.get('user_id'))
        # Assume the blogpost_id is included in the form
        blogpost_id = form.data.get('blogpost_id')
        new_review.blogpost_id = blogpost_id
        
        db.session.add(new_review)
        db.session.commit()
        
        return jsonify({'message': 'Review created successfully'}), 201
    return jsonify({'error': 'Review creation failed', 'errors': form.errors}), 400


# Additional routes for fetching and managing reviews would follow here, similar to the BlogPost routes.
@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return make_response(jsonify({'error': 'Review not found'}), 404)
    
    return jsonify({
        'id': review.id,
        'content': review.content,
        'rating': review.rating,
        'user_id': review.user_id,
        'blogpost_id': review.blogpost_id
        # Include any other fields as needed
    }), 200

@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return jsonify([{
        'id': review.id,
        'content': review.content,
        'rating': review.rating,
        'user_id': review.user_id,
        'blogpost_id': review.blogpost_id
        # Include any other fields as needed
    } for review in reviews]), 200

@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    form = ReviewForm()
    review = Review.query.get(review_id)
    if review is None:
        return make_response(jsonify({'error': 'Review not found'}), 404)
    
    if form.validate_on_submit():
        review.content = form.content.data
        review.rating = form.rating.data
        # Update any other fields as needed
        
        db.session.commit()
        
        return jsonify({'message': 'Review updated successfully'}), 200
    return jsonify({'error': 'Update failed', 'errors': form.errors}), 400

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return make_response(jsonify({'error': 'Review not found'}), 404)
    
    db.session.delete(review)
    db.session.commit()
    
    return jsonify({'message': 'Review deleted successfully'}), 200


if __name__ == '__main__':
    app.run(port=5555)
