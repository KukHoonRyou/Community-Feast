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
            user_dict = {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email_address': user.email_address,
                'phone_number': user.phone_number,
                'address': user.address,
                'allergic_info': user.allergic_info,
                'created_at': user.created_at,
                'updated_at': user.updated_at
            }
            user_data.append(user_dict)
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.get_or_404(id)
        user_dict = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email_address': user.email_address,
            'phone_number': user.phone_number,
            'address': user.address,
            'allergic_info': user.allergic_info,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
        return jsonify(user_dict), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        user = User.from_dict(data)
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
            eat_dict = {
                'id': eat.id,
                'eats_name': eat.eats_name,
                'category': eat.category,
                'description': eat.description,
                'cook_time': eat.cook_time,
                'quantity': eat.quantity,
                'allergic_ingredient': eat.allergic_ingredient,
                'perishable': eat.perishable,
                'image_url': eat.image_url,
                'is_available': eat.is_available,
                'created_at': eat.created_at,
                'updated_at': eat.updated_at,
                'user_id': eat.user_id
            }
            eats_data.append(eat_dict)
        return jsonify(eats_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats/<int:id>', methods=['GET'])
def get_eat(id):
    try:
        eat = Eats.query.get_or_404(id)
        eat_dict = {
            'id': eat.id,
            'eats_name': eat.eats_name,
            'category': eat.category,
            'description': eat.description,
            'cook_time': eat.cook_time,
            'quantity': eat.quantity,
            'allergic_ingredient': eat.allergic_ingredient,
            'perishable': eat.perishable,
            'image_url': eat.image_url,
            'is_available': eat.is_available,
            'created_at': eat.created_at,
            'updated_at': eat.updated_at,
            'user_id': eat.user_id
        }
        return jsonify(eat_dict), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/eats', methods=['POST'])
def create_eat():
    try:
        data = request.get_json()
        eat = Eats.from_dict(data)
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
            dib_dict = {
                'id': dib.id,
                'dib_status': dib.dib_status,
                'created_at': dib.created_at,
                'updated_at': dib.updated_at,
                'user_id': dib.user_id,
                'eats_id': dib.eats_id
            }
            dibs_data.append(dib_dict)
        return jsonify(dibs_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs/<int:id>', methods=['GET'])
def get_dib(id):
    try:
        dib = Dibs.query.get_or_404(id)
        dib_dict = {
            'id': dib.id,
            'dib_status': dib.dib_status,
            'created_at': dib.created_at,
            'updated_at': dib.updated_at,
            'user_id': dib.user_id,
            'eats_id': dib.eats_id
        }
        return jsonify(dib_dict), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/dibs', methods=['POST'])
def create_dib():
    try:
        data = request.get_json()
        dib = Dibs.from_dict(data)
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
            review_dict = {
                'id': review.id,
                'rating': review.rating,
                'comment': review.comment,
                'created_at': review.created_at,
                'updated_at': review.updated_at,
                'user_id': review.user_id,
                'eats_id': review.eats_id
            }
            reviews_data.append(review_dict)
        return jsonify(reviews_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews/<int:id>', methods=['GET'])
def get_review(id):
    try:
        review = Review.query.get_or_404(id)
        review_dict = {
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.created_at,
            'updated_at': review.updated_at,
            'user_id': review.user_id,
            'eats_id': review.eats_id
        }
        return jsonify(review_dict), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/reviews', methods=['POST'])
def create_review():
    try:
        data = request.get_json()
        review = Review.from_dict(data)
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
            foodtag_dict = {
                'id': foodtag.id,
                'name': foodtag.name
            }
            foodtags_data.append(foodtag_dict)
        return jsonify(foodtags_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags/<int:id>', methods=['GET'])
def get_foodtag(id):
    try:
        foodtag = FoodTag.query.get_or_404(id)
        foodtag_dict = {
            'id': foodtag.id,
            'name': foodtag.name
        }
        return jsonify(foodtag_dict), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/foodtags', methods=['POST'])
def create_foodtag():
    try:
        data = request.get_json()
        foodtag = FoodTag.from_dict(data)
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