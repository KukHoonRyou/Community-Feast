from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from models import db, User, Eats, Dibs, Review, FoodTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'your_secret_key'  # 앱의 시크릿 키 설정

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'login'  # 로그인 페이지의 엔드포인트 설정

with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify(message='Login successful'), 200
    else:
        return jsonify(error='Invalid username or password'), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User Name Already Exist.'}), 400
    
    user = User(username=username, email_address=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Sign Up Successful'}), 201

@app.route('/api/logout', methods=['POST'])
# @login_required
def logout():
    logout_user()
    return jsonify(message='Logout successful'), 200

@app.route('/users', methods=['GET'])
# @login_required
def get_users():
    try:
        users = User.query.all()
        user_data = []
        for user in users:
            user_data.append(user.to_dict())
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['GET'])
# @login_required
def get_user(id):
    try:
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users', methods=['POST'])
# @login_required
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
# @login_required
def update_user(id):
    try:
        user = User.query.get_or_404(id)
        data = request.get_json()
        user.from_dict(data)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['DELETE'])
# @login_required
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
# @login_required
def get_eats():
    try:
        eats = Eats.query.all()
        eats_data = []
        for eat in eats:
            eats_data.append(eat.to_dict())
        return jsonify(eats_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['GET'])
# @login_required
def get_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        return jsonify(eat.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats', methods=['POST'])
# @login_required
def create_eat():
    try:
        data = request.get_json()
        eat = Eats()
        eat.from_dict(data)
        db.session.add(eat)
        db.session.commit()
        return jsonify(eat.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['PATCH'])
# @login_required
def update_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        data = request.get_json()
        eat.from_dict(data)
        db.session.commit()
        return jsonify(eat.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['DELETE'])
# @login_required
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
# @login_required
def get_dibs():
    try:
        dibs = Dibs.query.all()
        dibs_data = []
        for dib in dibs:
            dibs_data.append(dib.to_dict())
        return jsonify(dibs_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['GET'])
# @login_required
def get_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)
        return jsonify(dib.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs', methods=['POST'])
# @login_required
def create_dib():
    try:
        data = request.get_json()
        dib = Dibs()
        dib.from_dict(data)
        db.session.add(dib)
        db.session.commit()
        return jsonify(dib.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['PATCH'])
# @login_required
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
# @login_required
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
# @login_required
def get_reviews():
    try:
        reviews = Review.query.all()
        reviews_data = []
        for review in reviews:
            reviews_data.append(review.to_dict())
        return jsonify(reviews_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews/<int:id>', methods=['GET'])
# @login_required
def get_review(id):
    try:
        review = Review.query.get_or_404(id)
        return jsonify(review.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews', methods=['POST'])
# @login_required
def create_review():
    try:
        data = request.get_json()
        review = Review()
        review.from_dict(data)
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/reviews/<int:id>', methods=['PATCH'])
# @login_required
def update_review(id):
    try:
        review = Review.query.get_or_404(id)
        data = request.get_json()
        review.from_dict(data)
        db.session.commit()
        return jsonify(review.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/reviews/<int:id>', methods=['DELETE'])
# @login_required
def delete_review(id):
    try:
        review = Review.query.get_or_404(id)
        db.session.delete(review)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/foodtags', methods=['GET'])
# @login_required
def get_foodtags():
    try:
        foodtags = FoodTag.query.all()
        foodtags_data = []
        for foodtag in foodtags:
            foodtags_data.append(foodtag.to_dict())
        return jsonify(foodtags_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags/<int:id>', methods=['GET'])
# @login_required
def get_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        return jsonify(foodtag.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags', methods=['POST'])
# @login_required
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
# @login_required
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
# @login_required
def delete_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        db.session.delete(foodtag)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)