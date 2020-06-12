# JazaNdai app

#### Car pooling website that allows drivers to post their travel routes and users to book them, version one (v1)

#### By Kipchirchir Emmanuel Langat

## Description 
* This is a car poooling application where users can post and book rides.
* There are two categories of users, drivers and riders
* The mode of payment for the app is blockchain (use of web 3)
* A minimalistic flask app interacts with blockchain server
* Use of celery for asynchronous processing of ride requests

## Installation/ setup instructions
* head over to `` and clone the repository.
* navigate into the cloned repository , create a virtualenviroment and activate it by `python3 -m virtualenv venv && source venv/bin/activate`
* Run `pip freeze -r requirements.txt` to install all the backend repo.
* Navigate into the frontend folder `cd frontend`
* Run `npm install` to install all the react dependancies.
* Navigate up one folder by `cd ..`
* Navigate into the `cd backend/blocks` and run the flask app by `flask run`
* Run the python server by `python3 manage.py runserver`
* **Happy hacking**


## Known Bugs
* The major headache is file uploads, there is no ftp server.....!!! if possible use your own.

## Technologies used
* Python3 
* Django
* Django rest framework
* Django rest knox
* Flask 
* Blockchain (etheruem)

## support and contact details
* To get in touch with the developer, use `emmanuelthedeveloper@gmail.com`

### License
* see the attached **LICENSE.md** file

Copyright (c) 2020 **Emmanuel Kipchirchir Langat**