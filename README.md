# CommunityFeast

<!-- Headings -->

## Description

CommunityFeast is an innovative food sharing platform that aims to reduce food waste and strengthen connections within local communities. 

## Wireframe

### Pages

![HomePage](./Planning/pages.png)

## User Stories

1. Users can POST their surplus food on the Eats page.
2. Users can SEE, UPDATE, and DELETE their Eats through UserAccount page when they log in.
3. Users can Dib food through DibButton which is stay under the EatsDetail page
4. Users can DELETE Dibs through UserAccount page.
5. Users can view information about the site on the “About” page.
6. Users can register on the website, where they set up a unique username and password.
7. Users can log into the website to make Eats and Dibs.
8. Admin users can manage Users, Eats, and Dibs on the website.

## React Components Tree

![ReactComponentsTree](./Planning/react_tree.png)

## Database Schema

![Database](./Planning/schema.png)

## Constraints

- All users should have an unique usernames
- A user can make only one dib within a specific period of time to prevent food waste and not interfere with others' chances to get food.
- Admin user should only be allowed to edit user info, Eats, and Dibs status


## Validations

- Ensure the eats ratings and dibs ratings are integers.
- Check the phone number and email address format in the users table 
- address must be unique
- Quantity in the Eats table must be an integer
- Eats count and Dibs count must be an integer
- Reservation status must be a valid string value
- Email address must be in a valid format
- The name of the user must be non-empty
- The username and password of the user must be non-empty
- Rating must be between 1 and 5
- Review comments must be non-empty

## API Routes

![API Routes](./Planning/API.png)

## Example of a Response Structure

GET /eats

![ResponseStructure](./Planning/get_eats.png)

## React Routes

![ReactRoutes](./Planning/react_routes.png)

## Stretch Goals

1. Eats Users can track Dibs users real time location through the app.

2. Users can receive text messages or an email regarding when somebody Dibs their Eats.

3. Users can use the application in various languages.

## Trello Board

![Trello Board](./Planning/Trello.png)