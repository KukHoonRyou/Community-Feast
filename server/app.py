from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db, User, Eats, Dibs, Review, FoodTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/users', methods=['GET'])
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
def get_user(id):
    try:
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users', methods=['POST'])
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
def get_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        return jsonify(eat.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats', methods=['POST'])
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
def get_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)
        return jsonify(dib.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs', methods=['POST'])
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
    try:
        reviews = Review.query.all()
        reviews_data = []
        for review in reviews:
            reviews_data.append(review.to_dict())
        return jsonify(reviews_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews/<int:id>', methods=['GET'])
def get_review(id):
    try:
        review = Review.query.get_or_404(id)
        return jsonify(review.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews', methods=['POST'])
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
def get_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        return jsonify(foodtag.to_dict()), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags', methods=['POST'])
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