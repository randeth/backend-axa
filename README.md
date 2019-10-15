# AXA Backend Assesment

## List of endpoints

**GET**

All the GET endpoints must have an Authorization header with the value 'Bearer <JWT access token>'  

* /api/clients/id/<id_of_client> -> Return the client's information with the id you want to search.  

* /api/clients/name/<name_of_client> -> Return the client's information with the name you want to search.  

* /api/policies/client/<name_of_client> -> Return the list of policies linked to a client name.  

* /api/policies/<id_of_policy> -> Return the user information linked to the given policy id.  

**POST**
* /api/login -> Gives a JWT to have access to all the other endpoints. Requests: {"email": "xxx"} inside the body and returns the JWT access token needed for the rest of the api calls.  

## Database
MongoDB is the database I decided to use for this task. I needed a fast and easy to use database so I worked with mongoose to make it easier.  

All the data is stored in a free MongoDB server at https://www.mongodb.com/cloud. The data is taken from (Clients) http://www.mocky.io/v2/5808862710000087232b75ac and (policies) http://www.mocky.io/v2/580891a4100000e8242b75c5  

## Tools used

In this assesment I used the following resources:  
-express: this is the framework I decided to use  
-jsonwebtoken: an easy way to manage login and information about the client  
-mongoose: I decided to use MongoDB and mongoose is really nice to work with stored data  
-nodemon: monitoring tool for the nodejs project  
-mocha: framework for asynchronous testing  
-chai: assertion library I used to create the testing  
-dotenv: I stored passwords, port numbers, etc in a .env file and this package makes it easier to use  
-standardJS: a really nice javascript linter I used previously  

## Installation

To install all the packages needed to run the app:
```
npm install
```

## Running the tests

With this command, the automated tests for this project will run
```
npm test
```

## Deployment

To run the application you need to enter at the command line:
```
npm start
```
