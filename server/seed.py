#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import db, User, Eats, Dibs, Review, FoodTag

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        # Generate fake data for User model
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                password=fake.password(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email_address=fake.email(),
                phone_number=fake.phone_number(),
                address=fake.address(),
                allergic_info=fake.sentence(nb_words=6)
            )
            db.session.add(user)

        # Generate fake data for Eats model
        for _ in range(20):
            eat = Eats(
                eats_name=fake.word(),
                category=fake.word(),
                description=fake.paragraph(nb_sentences=2),
                cook_time=fake.time(),
                quantity=fake.random_int(min=1, max=10),
                allergic_ingredient=fake.word(),
                is_available=fake.random.choice([True] * 7 + [False] * 3),
                perishable=fake.boolean(),
                image_url=fake.image_url(),
                user_id=fake.random_int(min=1, max=10)
            )
            db.session.add(eat)

        # Generate fake data for Dibs model
        for _ in range(30):
            dib = Dibs(
                dib_status=fake.random.choice([True] * 7 + [False] * 3),
                user_id=fake.random_int(min=1, max=10),
                eats_id=fake.random_int(min=1, max=20)
            )
            db.session.add(dib)

        # Generate fake data for Review model
        for _ in range(40):
            review = Review(
                rating=fake.random_int(min=1, max=5),
                comment=fake.paragraph(nb_sentences=1),
                user_id=fake.random_int(min=1, max=10),
                eats_id=fake.random_int(min=1, max=20)
            )
            db.session.add(review)

        # Generate fake data for FoodTag model
        for _ in range(15):
            food_tag = FoodTag(
                name=fake.word()
            )
            db.session.add(food_tag)

        db.session.commit()
        print("Starting seed...")
        # Seed code goes here!
