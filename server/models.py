from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    email_address = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    allergic_info = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    isAdmin = db.Column(db.Boolean, nullable=False, default=False)

    eats = db.relationship('Eats', back_populates='user', cascade='all, delete', lazy=True)
    dibs = db.relationship('Dibs', back_populates='user', cascade='all, delete', lazy=True)
    given_reviews = db.relationship('Review', back_populates='user', foreign_keys='Review.user_id', lazy=True)

    eat_names = association_proxy('eats', 'eats_name')
    dib_statuses = association_proxy('dibs', 'dib_status')
    given_review_ratings = association_proxy('given_reviews', 'rating')

    serialize_rules = ('-password',)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def from_dict(self, data):
        for field in ['username', 'password', 'first_name', 'last_name', 'email_address', 'phone_number', 'address', 'allergic_info', 'isAdmin']:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email_address': self.email_address,
            'phone_number': self.phone_number,
            'address': self.address,
            'allergic_info': self.allergic_info,
            'isAdmin': self.isAdmin,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'eat_names': list(self.eat_names),
            'dib_statuses': list(self.dib_statuses),
            'given_review_ratings': list(self.given_review_ratings)
        }

    def get_id(self):
        return str(self.id)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        return username

    @validates('email_address')
    def validate_email(self, key, email):
        if not email or '@' not in email:
            raise ValueError("Invalid email address")
        return email

class Eats(db.Model, SerializerMixin):
    __tablename__ = "eats"

    id = db.Column(db.Integer, primary_key=True)
    eats_name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    cook_time = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    allergic_ingredient = db.Column(db.String(300), nullable=True)
    perishable = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    is_available = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', back_populates='eats')
    food_tags = db.relationship('FoodTag', secondary='eats_food_tag', lazy='subquery', back_populates='eats', cascade='all, delete')
    dibs = db.relationship('Dibs', back_populates='eats', lazy=True)
    reviews = db.relationship('Review', back_populates='eats', cascade='all, delete', lazy=True)

    tags = association_proxy('food_tags', 'name')
    dib_statuses = association_proxy('dibs', 'dib_status')
    review_ratings = association_proxy('reviews', 'rating')

    serialize_rules = ()

    def from_dict(self, data):
        for field in ['eats_name', 'category', 'description', 'cook_time', 'quantity', 'allergic_ingredient', 'perishable', 'image_url', 'user_id']:
            if field in data:
                setattr(self, field, data[field])
        if 'food_tags' in data:
            self.food_tags = [FoodTag.query.get(tag_id) for tag_id in data['food_tags']]

    def to_dict(self):
        return {
            'id': self.id,
            'eats_name': self.eats_name,
            'category': self.category,
            'description': self.description,
            'cook_time': self.cook_time,
            'quantity': self.quantity,
            'allergic_ingredient': self.allergic_ingredient,
            'perishable': self.perishable,
            'image_url': self.image_url,
            'is_available': bool(self.is_available),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'user_id': self.user_id,
            'food_tags': [tag.to_dict() for tag in self.food_tags],
            'tags': list(self.tags),
            'dib_statuses': list(self.dib_statuses),
            'review_ratings': list(self.review_ratings)
        }

    @validates('eats_name')
    def validate_eats_name(self, key, eats_name):
        if not eats_name:
            raise ValueError("Eats name cannot be empty")
        return eats_name

    @validates('quantity')
    def validate_quantity(self, key, quantity):
        if not isinstance(quantity, int):
            raise ValueError("Quantity must be an integer")
        if quantity < 0:
            raise ValueError("Quantity cannot be negative")
        return quantity

class Dibs(db.Model, SerializerMixin):
    __tablename__ = "dibs"

    id = db.Column(db.Integer, primary_key=True)
    dib_status = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    eats_id = db.Column(db.Integer, db.ForeignKey('eats.id'), nullable=True)

    user = db.relationship('User', back_populates='dibs')
    eats = db.relationship('Eats', back_populates='dibs')
    reviews = db.relationship('Review', back_populates='dibs', cascade='all, delete', lazy=True)

    user_names = association_proxy('user', 'username')
    eats_names = association_proxy('eats', 'eats_name')

    serialize_rules = ()

    def from_dict(self, data):
        for field in ['dib_status', 'user_id', 'eats_id']:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            'id': self.id,
            'dib_status': bool(self.dib_status),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'user_id': self.user_id,
            'eats_id': self.eats_id,
            'user_names': self.user.username if self.user else None,
            'eats_name': self.eats.eats_name if self.eats else None  # Eats의 이름 포함
        }

    @validates('dib_status')
    def validate_dib_status(self, key, dib_status):
        if dib_status not in [True, False]:
            raise ValueError("Dib status must be a boolean")
        return dib_status

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=True)
    comment = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    eats_id = db.Column(db.Integer, db.ForeignKey('eats.id'), nullable=True)
    dibs_id = db.Column(db.Integer, db.ForeignKey('dibs.id'), nullable=True)

    user = db.relationship('User', back_populates='given_reviews')
    eats = db.relationship('Eats', back_populates='reviews')
    dibs = db.relationship('Dibs', back_populates='reviews')

    user_names = association_proxy('user', 'username')
    eats_names = association_proxy('eats', 'eats_name')

    serialize_rules = ()

    def from_dict(self, data):
        for field in ['rating', 'comment', 'user_id', 'eats_id', 'dibs_id']:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'user_id': self.user_id,
            'eats_id': self.eats_id,
            'dibs_id': self.dibs_id,
            'user_names': list(self.user_names),
            'eats_names': list(self.eats_names)
        }

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")
        return rating

class FoodTag(db.Model, SerializerMixin):
    __tablename__ = "food_tag"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    eats = db.relationship('Eats', secondary='eats_food_tag', lazy='subquery', back_populates='food_tags', cascade='all, delete')

    serialize_rules = ()

    def from_dict(self, data):
        for field in ['name']:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Tag name cannot be empty")
        return name

class EatsFoodTag(db.Model):
    __tablename__ = "eats_food_tag"

    eats_id = db.Column(db.Integer, db.ForeignKey('eats.id'), primary_key=True)
    food_tag_id = db.Column(db.Integer, db.ForeignKey('food_tag.id'), primary_key=True)