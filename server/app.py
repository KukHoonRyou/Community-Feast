from flask import Flask, jsonify, request  # Import necessary Flask components
from flask_cors import CORS  # Import CORS for cross-origin requests
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy for ORM
from flask_migrate import Migrate  # Import Migrate for database migrations
from flask_login import LoginManager, login_user, logout_user, login_required, current_user  # Import Flask-Login for user session management
from werkzeug.security import generate_password_hash, check_password_hash  # Import security utilities
import os  # Import os for environment variable access
from sqlalchemy.orm import joinedload  # Import joinedload for optimizing queries

# Import models
from models import db, User, Eats, Dibs, Review, FoodTag

app = Flask(__name__)  # Initialize Flask application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Set the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to save resources
app.json.compact = False  # Disable compact JSON responses
app.secret_key = os.environ.get('SECRET_KEY', 'your_secret_key')  # Secure the application with a secret key

CORS(app)  # Enable CORS for the app

db.init_app(app)  # Initialize SQLAlchemy with the app
migrate = Migrate(app, db)  # Initialize Flask-Migrate with the app and database

login_manager = LoginManager(app)  # Initialize Flask-Login with the app
login_manager.login_view = 'login'  # Set the login view

# Create database tables
with app.app_context():
    db.create_all()  # Create all tables in the database

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # Load a user by their ID

@app.route('/')
def index():
    return '<h1>Project Server</h1>'  # Root route for the server

@app.route('/api/current-user', methods=['GET'])
@login_required
def get_current_user():
    user = current_user  # Get the current logged-in user
    return jsonify(
        id=user.id,
        username=user.username,
        email_address=user.email_address,
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,  # Added phone number
        address=user.address,  # Added address
        allergic_info=user.allergic_info,  # Added allergic info
        isAdmin=user.isAdmin,
        created_at=user.created_at.isoformat()
    ), 200  # Return user details in JSON format

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON data from the request
    username = data['username']  # Extract username
    password = data['password']  # Extract password
    user = User.query.filter_by(username=username).first()  # Query user by username
    if user and user.check_password(password):
        login_user(user)  # Log in the user
        return jsonify({
            'message': 'Login successful',
            'userId': user.id,
            'isAdmin': user.isAdmin
        }), 200  # Return success message and user info
    else:
        return jsonify(error='Invalid username or password'), 401  # Return error for invalid credentials

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get JSON data from the request
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    is_admin = data.get('isAdmin', False)
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User Name Already Exist.'}), 400  # Check for existing username
    
    user = User(username=username, email_address=email, isAdmin=bool(is_admin), first_name=first_name, last_name=last_name)
    user.set_password(password)  # Set the user password
    db.session.add(user)  # Add user to the session
    db.session.commit()  # Commit the session
    
    return jsonify({'message': 'Sign Up Successful'}), 201  # Return success message

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # Log out the current user
    return jsonify(message='Logout successful'), 200  # Return success message

@app.route('/users', methods=['GET'])
@login_required
def get_users():
    try:
        users = User.query.all()  # Query all users
        user_data = [user.to_dict() for user in users]  # Convert users to dictionary
        return jsonify(user_data), 200  # Return user data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/users/<int:id>', methods=['GET'])
@login_required
def get_user(id):
    try:
        user = User.query.get_or_404(id)  # Query user by ID or return 404
        return jsonify(user.to_dict()), 200  # Return user data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/users', methods=['POST'])
@login_required
def create_user():
    try:
        data = request.get_json()  # Get JSON data from the request
        user = User()  # Create a new user instance
        user.from_dict(data)  # Populate user fields from data
        db.session.add(user)  # Add user to the session
        db.session.commit()  # Commit the session
        return jsonify(user.to_dict()), 201  # Return created user data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/users/<int:id>', methods=['PATCH'])
@login_required
def update_user(id):
    try:
        user = User.query.get_or_404(id)  # Query user by ID or return 404
        if user.id != current_user.id and not current_user.isAdmin:
            return jsonify(error='Unauthorized access'), 403  # Check for authorization

        data = request.get_json()  # Get JSON data from the request
        user.from_dict(data)  # Update user fields from data
        db.session.commit()  # Commit the session
        return jsonify(user.to_dict()), 200  # Return updated user data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/users/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    try:
        user = User.query.get_or_404(id)  # Query user by ID or return 404
        db.session.delete(user)  # Delete the user from the session
        db.session.commit()  # Commit the session
        return '', 204  # Return no content on success
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/eats', methods=['GET'])
@login_required
def get_eats():
    try:
        eats = Eats.query.all()  # Query all eats
        eats_data = [eat.to_dict() for eat in eats]  # Convert eats to dictionary
        return jsonify(eats_data), 200  # Return eats data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/eats/<int:id>', methods=['GET'])
@login_required
def get_eat(id):
    try:
        eat = Eats.query.get_or_404(id)  # Query eat by ID or return 404
        return jsonify(eat.to_dict()), 200  # Return eat data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/eats', methods=['POST'])
@login_required
def create_eat():
    try:
        data = request.get_json()  # Get JSON data from the request
        user_id = current_user.id  # Get current user ID
        eat = Eats()  # Create a new eat instance
        eat.from_dict(data)  # Populate eat fields from data
        eat.user_id = user_id  # Set the user ID for the eat
        if 'food_tags' in data:
            eat.food_tags = [FoodTag.query.get(tag_id) for tag_id in data['food_tags']]  # Set food tags
        db.session.add(eat)  # Add eat to the session
        db.session.commit()  # Commit the session
        return jsonify(eat.to_dict()), 201  # Return created eat data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/eats/<int:id>', methods=['PATCH'])
@login_required
def update_eat(id):
    try:
        eat = Eats.query.get_or_404(id)  # Query eat by ID or return 404
        data = request.get_json()  # Get JSON data from the request

        if 'is_available' in data:
            eat.is_available = data['is_available']  # Update is_available field

        for key, value in data.items():
            if key != 'is_available' and key != 'food_tag_ids':
                setattr(eat, key, value)  # Update other fields

        if 'food_tag_ids' in data:
            eat.food_tags = [FoodTag.query.get(tag_id) for tag_id in data['food_tag_ids']]  # Update food tags

        db.session.commit()  # Commit the session
        return jsonify(eat.to_dict()), 200  # Return updated eat data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/eats/<int:id>', methods=['DELETE'])
@login_required
def delete_eat(id):
    try:
        eat = Eats.query.get_or_404(id)  # Query eat by ID or return 404
        db.session.delete(eat)  # Delete the eat from the session
        db.session.commit()  # Commit the session
        return '', 204  # Return no content on success
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/dibs', methods=['GET'])
@login_required
def get_user_dibs():
    if current_user.isAdmin:
        dibs = Dibs.query.all()  # Query all dibs if admin
    else:
        dibs = Dibs.query.filter_by(user_id=current_user.id).all()  # Query dibs for the current user
    return jsonify([dib.to_dict() for dib in dibs])  # Return dibs data in JSON format

@app.route('/dibs/<int:id>', methods=['GET'])
@login_required
def get_dib(id):
    try:
        if id == 0:  # If id is 0, return all dibs for the current user
            dibs = Dibs.query.options(joinedload(Dibs.eats).joinedload(Eats.user)).filter_by(user_id=current_user.id).all()
            dibs_data = [dib.to_dict() for dib in dibs]
            return jsonify(dibs_data), 200
        else:  # Return data for a specific dib
            dib = Dibs.query.options(joinedload(Dibs.eats).joinedload(Eats.user)).get_or_404(id)
            dib_data = dib.to_dict()
            return jsonify(dib_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/dibs', methods=['POST'])
@login_required
def create_dib():
    try:
        data = request.get_json()  # Get JSON data from the request
        dib = Dibs()  # Create a new dib instance
        dib.from_dict(data)  # Populate dib fields from data
        dib.user_id = current_user.id  # Set the user ID for the dib
        db.session.add(dib)  # Add dib to the session
        db.session.commit()  # Commit the session
        return jsonify(dib.to_dict()), 201  # Return created dib data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/dibs/<int:id>', methods=['PATCH'])
@login_required
def update_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)  # Query dib by ID or return 404
        data = request.get_json()  # Get JSON data from the request
        dib.from_dict(data)  # Update dib fields from data
        db.session.commit()  # Commit the session
        return jsonify(dib.to_dict()), 200  # Return updated dib data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/dibs/<int:id>', methods=['DELETE'])
@login_required
def delete_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)  # Query dib by ID or return 404
        db.session.delete(dib)  # Delete the dib from the session
        db.session.commit()  # Commit the session
        return '', 204  # Return no content on success
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/reviews', methods=['GET'])
def get_reviews():
    dibs_id = request.args.get('dibs_id')  # Get dibs_id from query parameters
    user_id = request.args.get('user_id')  # Get user_id from query parameters
    
    if dibs_id:
        reviews = Review.query.filter_by(dibs_id=dibs_id).all()  # Query reviews by dibs_id
    elif user_id:
        reviews = Review.query.filter_by(user_id=user_id).all()  # Query reviews by user_id
    else:
        reviews = []
    
    return jsonify([review.to_dict() for review in reviews])  # Return reviews data in JSON format
    
@app.route('/reviews/<int:id>', methods=['GET'])
@login_required
def get_review(id):
    try:
        review = Review.query.get_or_404(id)  # Query review by ID or return 404
        return jsonify(review.to_dict()), 200  # Return review data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()  # Get JSON data from the request
    new_review = Review(
        rating=data['rating'],
        comment=data['comment'],
        dibs_id=data['dibs_id'],
        user_id=data['user_id'],
        eats_id=data['eats_id']
    )
    db.session.add(new_review)  # Add new review to the session
    db.session.commit()  # Commit the session
    return jsonify(new_review.to_dict()), 201  # Return created review data

@app.route('/reviews/<int:review_id>', methods=['PATCH'])
def update_review(review_id):
    review = Review.query.get(review_id)  # Query review by ID
    if review:
        data = request.get_json()  # Get JSON data from the request
        review.rating = data.get('rating', review.rating)  # Update rating field
        review.comment = data.get('comment', review.comment)  # Update comment field
        db.session.commit()  # Commit the session
        return jsonify(review.to_dict())  # Return updated review data
    else:
        return jsonify({'error': 'Review not found'}), 404  # Return error if review not found

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)  # Query review by ID
    if review:
        db.session.delete(review)  # Delete the review from the session
        db.session.commit()  # Commit the session
        return '', 204  # Return no content on success
    else:
        return jsonify({'error': 'Review not found'}), 404  # Return error if review not found

@app.route('/foodtags', methods=['GET'])
@login_required
def get_foodtags():
    try:
        foodtags = FoodTag.query.all()  # Query all food tags
        foodtags_data = [foodtag.to_dict() for foodtag in foodtags]  # Convert food tags to dictionary
        return jsonify(foodtags_data), 200  # Return food tags data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/foodtags/<int:id>', methods=['GET'])
@login_required
def get_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)  # Query food tag by ID or return 404
        return jsonify(foodtag.to_dict()), 200  # Return food tag data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/foodtags', methods=['POST'])
@login_required
def create_foodtag():
    try:
        data = request.get_json()  # Get JSON data from the request
        foodtag = FoodTag()  # Create a new food tag instance
        foodtag.from_dict(data)  # Populate food tag fields from data
        db.session.add(foodtag)  # Add food tag to the session
        db.session.commit()  # Commit the session
        return jsonify(foodtag.to_dict()), 201  # Return created food tag data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/foodtags/<int:id>', methods=['PATCH'])
@login_required
def update_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)  # Query food tag by ID or return 404
        data = request.get_json()  # Get JSON data from the request
        foodtag.from_dict(data)  # Update food tag fields from data
        db.session.commit()  # Commit the session
        return jsonify(foodtag.to_dict()), 200  # Return updated food tag data
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message

@app.route('/foodtags/<int:id>', methods=['DELETE'])
@login_required
def delete_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)  # Query food tag by ID or return 404
        db.session.delete(foodtag)  # Delete the food tag from the session
        db.session.commit()  # Commit the session
        return '', 204  # Return no content on success
    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify(error=str(e)), 500  # Return error message
    
@app.route('/foodtags/<int:id>/eats', methods=['GET'])
@login_required
def get_eats_by_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)  # Query food tag by ID or return 404
        eats = foodtag.eats  # Get eats associated with the food tag
        return jsonify([eat.to_dict() for eat in eats]), 200  # Return eats data in JSON format
    except Exception as e:
        return jsonify(error=str(e)), 500  # Return error message

if __name__ == '__main__':
    app.run(port=5555, debug=True)  # Run the Flask application on port 5555 with debug mode