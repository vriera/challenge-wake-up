# Design

## Interpretation

The application must provide a platform primarily for waiters, they will be able to create an order based on many products from the restaurant they are working in. It's expected for the waiter to use a mobile phone or a tablet.

There will be two types of users: *Waiters* and *Managers*.

**The restaurant owner/manager** is in charge of creating the menu and assigning accounts to the waiters. He will be able to confirm the completion of an order (meaning the customer has payed it) as well as keeping in track sales perfomance global and per waiter. Further analytic tools are out of scope.

Payment won't be processed by the application, it's just a managment/ordering tool.

An idea for monetizing this application could be restricting the number of active orders, menu items and/or waiters. As well as providing quick customer support. This will be considered out of scope for this challenge.

It is assumed that the restaurant has 24/7 internet access and that the waiters have a working device to connect into the application.

Regarding the expansion of the application, only a local market will be considered. There will be support for only one currency represented by the symbol **$**, with two digits of precision. The only supported language will be english. 

## Functional Requirements

* The manager will be able to register their restaurant.
* The manager will be able to manage items from their menu.
* Menu items must have a name, description and a respective category.
* The menu must be able to be filtered by category.
* The manager will be able to provide access into the application to their waiters.
* A waiter will be able to log-in with the provided credentials.
* A waiter will be able to explore the menu.
* A waiter will be able to create an order.
* The manager will be able to change the state of a created order.
* The manager can display the ongoing orders (for example to the kitchen staff).


## Non-functional Requirements

* The orders must be created, displayed and managed in real time.
* The waiters cannot take too long (for example: 1 minute) to finish creating the order after the restaurant's customer has communicated their selection.
    * The number of clicks required to add an item / finish the order must be minimized.
* The UI must be intuitive for waiters of different ages (expected <=65 yo. , around retirement age)
* The application must be up at any bussiness time, it can be critical for the restaurant.
* The application must be able to sustain load increaseas at different mealtimes per day. As well as peaks regading differences in each weekday/special days such as a holidays.
* The application must adapt to different devices (desktop, laptop, mobile-phone, tablet).
* The orders and more especially their monetary information is considered sensitive data.   
    * The managers can only access the information regarding their restaurant. 
    * The waiters could only see their respective historic data.

## Quality attributes

* **Availability:** This application could be an essencial tool for the operation of the registered restaurant. Any down time can mean a big loss for our customers. Our goal will be 99.9% up time at bussiness hours.
* **Scalability:** Given the nature of the activity related to the application, there is going to be a noticiable fluctuation of usage in the application, down the the hour level. The system must be able to handle this rise. 
    * Optimizations to the infrastructure could be applied after tracking this load.
* **Usability:** The UI must be intuitive to ensure it provides actual value to our customers, if not their will resort to their previous *modus operandi*. Minimal or none training should be required for restaurant's staff to adopt this solution. 
* **Portability:** The waiters can use a wide range of devices. The application (more importantly the UI) must be able to mould to suit the respective screen sizes.
* **Performance:** The application must be able to run real-time without slowing down the order creation flow for a waiter.
* **Security:** The implementation must ensure each user can only access the information they are allowed to.


I acknowledge the importance of the Usability and Portability in this solution, but due to my set of skills i'm not sure much i could succed in that regard.

## Architecture

Given the time constraints of a challenge the following some things had to be sacrified:

* The back-end won't have a microservices architecture to reduce the complexity, but the solution must stride to be modular enough to be easy to migrate into microservices in the future.
* I won't be including a load balancer in this challenge, but i'm going to take steps to make the solution compatible with one in the future.

* No cloud-specific components will be used.

The application will consist of the following components:

* **A Front-End:** a Single Page Application built with React. A SPA design will ensure the application can be scaled horizontally, in the future it could be hosted in an AWS bucket. 

* **A monolithic Back-End:** This back-end will expose a JSON REST API.
    * It will be comprised of different modules. This modules will have their scope minimized to certain resources/logic. The idea es to have modules be easily converted into a microservice in the future.
    * The security will be endpoint-based, the Authentication will be done via JWT.
    * Using JSON as the data type makes the communication between React and Nest.js (Both js based) much easier.
    * Implementing a REST API will ensure horizontal scalability.

* **Database**: A PostgresSQL database will be used. Given the structured nature of the models and the requirement of analytics an SQL solution was picked over a non-SQL.
    * In the future, keeping read-replicas for analytics would be a good way to ensure performance.

All of the components will be run on docker containers, making it easier to scale in clusters.


## Possible upgrades

* Adding support for multiple managers per restaurant
* Adding support for multiple menues per restaurant





