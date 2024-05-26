from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from sqlalchemy.orm import joinedload

# Import models
from models import db, User, Eats, Dibs, Review, FoodTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.environ.get('SECRET_KEY', 'your_secret_key')  # Secure your secret key

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Create database tables
with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/api/current-user', methods=['GET'])
@login_required
def get_current_user():
    user = current_user
    return jsonify(
        id=user.id,
        username=user.username,
        email_address=user.email_address,
        first_name=user.first_name,
        last_name=user.last_name,
        isAdmin=user.isAdmin
    ), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({
            'message': 'Login successful',
            'userId': user.id,
            'isAdmin': user.isAdmin
        }), 200
    else:
        return jsonify(error='Invalid username or password'), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    is_admin = data.get('isAdmin', False)
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User Name Already Exist.'}), 400
    
    user = User(username=username, email_address=email, isAdmin=bool(is_admin), first_name=first_name, last_name=last_name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Sign Up Successful'}), 201

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify(message='Logout successful'), 200

@app.route('/users', methods=['GET'])
@login_required
def get_users():
    try:
        users = User.query.all()
        user_data = [user.to_dict() for user in users]
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['GET'])
@login_required
def get_user(id):
    try:
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users', methods=['POST'])
@login_required
def create_user():
    try:
        data = request.get_json()
        user = User()
        user.from_dict(data)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['PATCH'])
@login_required
def update_user(id):
    try:
        user = User.query.get_or_404(id)
        if user.id != current_user.id and not current_user.isAdmin:
            return jsonify(error='Unauthorized access'), 403

        data = request.get_json()
        user.from_dict(data)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    try:
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/eats', methods=['GET'])
@login_required
def get_eats():
    try:
        eats = Eats.query.all()
        eats_data = [eat.to_dict() for eat in eats]
        return jsonify(eats_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['GET'])
@login_required
def get_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        return jsonify(eat.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats', methods=['POST'])
@login_required
def create_eat():
    try:
        data = request.get_json()
        user_id = current_user.id
        eat = Eats()
        eat.from_dict(data)
        eat.user_id = user_id
        if 'food_tags' in data:
            eat.food_tags = [FoodTag.query.get(tag_id) for tag_id in data['food_tags']]
        db.session.add(eat)
        db.session.commit()
        return jsonify(eat.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['PATCH'])
@login_required
def update_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        data = request.get_json()

        # is_available을 포함한 데이터를 개별적으로 처리
        if 'is_available' in data:
            eat.is_available = data['is_available']

        # 다른 필드를 업데이트
        for key, value in data.items():
            if key != 'is_available' and key != 'food_tags':
                setattr(eat, key, value)

        # food_tags 필드가 있는 경우 별도로 처리
        if 'food_tags' in data:
            eat.food_tags = [FoodTag.query.get(tag_id) for tag_id in data['food_tags']]

        db.session.commit()
        return jsonify(eat.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['DELETE'])
@login_required
def delete_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        db.session.delete(eat)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/dibs', methods=['GET'])
@login_required
def get_dibs():
    try:
        dibs = Dibs.query.all()
        dibs_data = [dib.to_dict() for dib in dibs]
        return jsonify(dibs_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['GET'])
@login_required
def get_dib(id):
    try:
        if id == 0:  # id가 0인 경우 현재 사용자의 모든 Dibs 반환
            dibs = Dibs.query.options(joinedload(Dibs.eats).joinedload(Eats.user)).filter_by(user_id=current_user.id).all()
            dibs_data = [dib.to_dict() for dib in dibs]
            return jsonify(dibs_data), 200
        else:  # 특정 Dibs id에 대해 정보를 반환
            dib = Dibs.query.options(joinedload(Dibs.eats).joinedload(Eats.user)).get_or_404(id)
            dib_data = dib.to_dict()
            return jsonify(dib_data), 200
    except Exception as e:
        app.logger.error(f"Error fetching dib: {e}")
        return jsonify(error=str(e)), 500


@app.route('/dibs', methods=['POST'])
@login_required
def create_dib():
    try:
        data = request.get_json()
        dib = Dibs()
        dib.from_dict(data)
        dib.user_id = current_user.id  # 현재 로그인한 사용자의 ID 설정
        db.session.add(dib)
        db.session.commit()
        return jsonify(dib.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['PATCH'])
@login_required
def update_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)
        data = request.get_json()
        dib.from_dict(data)
        db.session.commit()
        return jsonify(dib.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['DELETE'])
@login_required
def delete_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)
        db.session.delete(dib)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500


@app.route('/reviews', methods=['GET'])
def get_reviews():
    dibs_id = request.args.get('dibs_id')
    user_id = request.args.get('user_id')
    
    if dibs_id:
        reviews = Review.query.filter_by(dibs_id=dibs_id).all()
    elif user_id:
        reviews = Review.query.filter_by(user_id=user_id).all()
    else:
        reviews = []
    
    return jsonify([review.to_dict() for review in reviews])
    
@app.route('/reviews/<int:id>', methods=['GET'])
@login_required
def get_review(id):
    try:
        review = Review.query.get_or_404(id)
        return jsonify(review.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    new_review = Review(
        rating=data['rating'],
        comment=data['comment'],
        dibs_id=data['dibs_id'],
        user_id=data['user_id'],
        eats_id=data['eats_id']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@app.route('/reviews/<int:review_id>', methods=['PATCH'])
def update_review(review_id):
    review = Review.query.get(review_id)
    if review:
        data = request.get_json()
        review.rating = data.get('rating', review.rating)
        review.comment = data.get('comment', review.comment)
        db.session.commit()
        return jsonify(review.to_dict())
    else:
        return jsonify({'error': 'Review not found'}), 404

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'error': 'Review not found'}), 404

@app.route('/foodtags', methods=['GET'])
@login_required
def get_foodtags():
    try:
        foodtags = FoodTag.query.all()
        foodtags_data = [foodtag.to_dict() for foodtag in foodtags]
        return jsonify(foodtags_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags/<int:id>', methods=['GET'])
@login_required
def get_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        return jsonify(foodtag.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags', methods=['POST'])
@login_required
def create_foodtag():
    try:
        data = request.get_json()
        foodtag = FoodTag()
        foodtag.from_dict(data)
        db.session.add(foodtag)
        db.session.commit()
        return jsonify(foodtag.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/foodtags/<int:id>', methods=['PATCH'])
@login_required
def update_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        data = request.get_json()
        foodtag.from_dict(data)
        db.session.commit()
        return jsonify(foodtag.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/foodtags/<int:id>', methods=['DELETE'])
@login_required
def delete_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        db.session.delete(foodtag)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500
    
@app.route('/foodtags/<int:id>/eats', methods=['GET'])
@login_required
def get_eats_by_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        eats = foodtag.eats
        return jsonify([eat.to_dict() for eat in eats]), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)