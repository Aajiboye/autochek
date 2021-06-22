# autochek
A system that can tell the distance between a preconfigured location and user's location.

# pattern 
A microservice pattern approach was implemented. This repository contains two microservices, the location microservice and the coordinator service (api-cord). 

# installation
This installation assumes that you have nodejs and mongodb installed and running on your system.
1. clone repo using git clone https://github.com/Aajiboye/autochek.git
2. There are two services, the location microservice and the cordinator service. 
# configuring the location microservice
  1. install dependencies by typing npm install (ensure you are in the same directory as the location-service root directory)
  2. set up server environment by creating a .env file on the root directory and supply the data recommended in the env.example file.
  3. run the server by typing npm start.
If all of these were properly done, the server will start to run on the specified port.
# configuring api cord
  The coordinator is the entry point to the system and it intercept every request to the location service. In a bigger system, all micro services in the system are coordinated by this single service. It implies that no direct request is made to any microservice.
  1. install dependencies by typing npm install (ensure you are in the same directory as the api-cord root directory)
  2. set up server environment by creating a .env file on the root directory and supply the data recommended in the env.example file.
  3. run the server by typing npm start.

Once the api cord is running, the endpoints can be tested. See link to postman documentation below:
  https://documenter.getpostman.com/view/8640133/TzeahQdV
  
  Note that the environment variable with identifier BASE=localhost:8080/autochek/v1/
 
