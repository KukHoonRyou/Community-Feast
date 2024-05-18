#!/usr/bin/env python3

# Standard library imports
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Local imports
from models import db, User, Eats, Dibs, Review, FoodTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

with app.app_context():
    db.create_all()

# Resource Classes
class UserResource(Resource):
    def get(self, id=None):
        try:
            if id:
                user = User.query.get_or_404(id)
                return user.to_dict()
            else:
                users = User.query.all()
                return [user.to_dict() for user in users]
        except Exception as e:
            return jsonify(error=str(e)), 500

    def post(self):
        try:
            data = request.get_json()
            user = User.from_dict(data)
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def patch(self, id):
        try:
            user = User.query.get_or_404(id)
            data = request.get_json()
            user.from_dict(data)
            db.session.commit()
            return user.to_dict()
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def delete(self, id):
        try:
            user = User.query.get_or_404(id)
            db.session.delete(user)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

class EatsResource(Resource):
    def get(self, id=None):
        try:
            if id:
                eat = Eats.query.get_or_404(id)
                return eat.to_dict()
            else:
                eats = Eats.query.all()
                return [eat.to_dict() for eat in eats]
        except Exception as e:
            return jsonify(error=str(e)), 500

    def post(self):
        try:
            data = request.get_json()
            eat = Eats.from_dict(data)
            db.session.add(eat)
            db.session.commit()
            return eat.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def patch(self, id):
        try:
            eat = Eats.query.get_or_404(id)
            data = request.get_json()
            eat.from_dict(data)
            db.session.commit()
            return eat.to_dict()
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def delete(self, id):
        try:
            eat = Eats.query.get_or_404(id)
            db.session.delete(eat)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

class DibsResource(Resource):
    def get(self, id=None):
        try:
            if id:
                dib = Dibs.query.get_or_404(id)
                return dib.to_dict()
            else:
                dibs = Dibs.query.all()
                return [dib.to_dict() for dib in dibs]
        except Exception as e:
            return jsonify(error=str(e)), 500

    def post(self):
        try:
            data = request.get_json()
            dib = Dibs.from_dict(data)
            db.session.add(dib)
            db.session.commit()
            return dib.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def patch(self, id):
        try:
            dib = Dibs.query.get_or_404(id)
            data = request.get_json()
            dib.from_dict(data)
            db.session.commit()
            return dib.to_dict()
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def delete(self, id):
        try:
            dib = Dibs.query.get_or_404(id)
            db.session.delete(dib)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

class ReviewResource(Resource):
    def get(self, id=None):
        try:
            if id:
                review = Review.query.get_or_404(id)
                return review.to_dict()
            else:
                reviews = Review.query.all()
                return [review.to_dict() for review in reviews]
        except Exception as e:
            return jsonify(error=str(e)), 500

    def post(self):
        try:
            data = request.get_json()
            review = Review.from_dict(data)
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def patch(self, id):
        try:
            review = Review.query.get_or_404(id)
            data = request.get_json()
            review.from_dict(data)
            db.session.commit()
            return review.to_dict()
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def delete(self, id):
        try:
            review = Review.query.get_or_404(id)
            db.session.delete(review)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

class FoodTagResource(Resource):
    def get(self, id=None):
        try:
            if id:
                foodtag = FoodTag.query.get_or_404(id)
                return foodtag.to_dict()
            else:
                foodtags = FoodTag.query.all()
                return [foodtag.to_dict() for foodtag in foodtags]
        except Exception as e:
            return jsonify(error=str(e)), 500

    def post(self):
        try:
            data = request.get_json()
            foodtag = FoodTag.from_dict(data)
            db.session.add(foodtag)
            db.session.commit()
            return foodtag.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def patch(self, id):
        try:
            foodtag = FoodTag.query.get_or_404(id)
            data = request.get_json()
            foodtag.from_dict(data)
            db.session.commit()
            return foodtag.to_dict()
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

    def delete(self, id):
        try:
            foodtag = FoodTag.query.get_or_404(id)
            db.session.delete(foodtag)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

# Route Resources
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(EatsResource, '/eats', '/eats/<int:id>')
api.add_resource(DibsResource, '/dibs', '/dibs/<int:id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:id>')
api.add_resource(FoodTagResource, '/foodtags', '/foodtags/<int:id>')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)