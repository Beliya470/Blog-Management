from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from marshmallow import Schema, fields, validates, ValidationError
import os

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    blogposts = db.relationship('BlogPost', backref='author', lazy=True)
    reviews = db.relationship('Review', backref='reviewer', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password = generate_password_hash(password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class BlogPost(db.Model):
    __tablename__ = 'blog_posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reviews = db.relationship('Review', backref='blogpost', lazy=True)

    def __repr__(self):
        return f'<BlogPost {self.title}>'

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # new field
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blogpost_id = db.Column(db.Integer, db.ForeignKey('blog_posts.id'), nullable=False)

    def __repr__(self):
        return f'<Review {self.id} Rating {self.rating}>'

# Marshmallow schemas for serialization
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, required=True)

    @validates('password')
    def validate_password(self, value):
        if len(value) < 6:
            raise ValidationError('Password must be at least 6 characters long.')

class BlogPostSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    content = fields.Str(required=True)
    user_id = fields.Int(required=True)

class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True)
    rating = fields.Int(required=True, error_messages={'required': 'Rating is required.'})
    user_id = fields.Int(required=True)
    blogpost_id = fields.Int(required=True)

    @validates('rating')
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise ValidationError('Rating must be between 1 and 5.')

# Create instances of the schemas
user_schema = UserSchema()
blogpost_schema = BlogPostSchema()
review_schema = ReviewSchema()

# Sample database URI print statement (optional)
db_uri = os.environ.get('DATABASE_URI')
print("DATABASE_URI:", db_uri)
