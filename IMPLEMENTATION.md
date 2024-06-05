# Implementation

## Dropped features

* There are no analytics tools, just a summary of each order.
* Order state management features have not been implemented.

## Entities

* **Manager**: It will represent the central entity of the system, in this way we don't really have a Restaurant entity. A manager will have associated a restaurant name, but we can assume that an id that represents a restaurant will be the manager's id.
* **Menu**: This is the list of items that are available for a certain restaurant. It's associated with a restaurant via the manager. Managers can add and remove items from their menu.

* **MenuItem**: An item from a menu. They can be logically deleted to not affect any possible issue when trying to visualize older orders.

* **Waiter**: A waiter represents a user that has been allowed to interact with the menu by the manager. He will log in via a token granted by the manager + the restaurant name.

* **Order**: An order is created by a waiter; it contains a set of menu items and the time it was created.

* **OrderItem**: A reference to a MenuItem and an amount, for a given order.

## Website

The website will allow exploration and usage of the "menu":

* Managers can explore and modify the menu via the interface.

* Waiters can explore the menu and create an Order
    * Waiters can add and remove items from the order and visualize the status.

Managers can add waiters and generate a token for them to log in.

Users can visualize orders:
* Waiters can visualize a summary for each order they created.

* Managers can visualize a summary of all the orders from his restaurant.

The Application does not have any discovery features for the restaurants/managers that are submitted into the platform. Since this will be a management tool and operational tool, a view for discovery has not been implemented.

It's expected for users to log in/sign up and go directly into their dashboard features. There are no other flows implemented.

The menu and the orders view have infinite scroll features.

As far as technologies, React-Bootstrap has been key in ensuring the page is reactive enough to fit different screen sizes, ranging from mobile phones to laptops.

For querying the backend, React Query (TanStack Query) has been used. It provides features that make it easier to create infinite scrolls and cache information.

### Compromises

* No real images are being used, just a placeholder.

* Input validation is minimal.

* Error messages are not very granular.

## Backend

* The backend is built with a Nest.JS API; it tries to follow a REST-API design.

* A modular design has been approached, each module having its own logic. In this way, a transition into a microservices architecture won't require much redesigning.

* For managing the entities, it uses TypeORM connecting to a PostgreSQL database.

* Under the */specs* endpoint, a swagger can be accessed.

### Compromises

* Some security validations under the fetching of the orders have not been performed.

* No modifying order states.

* MenuItems cannot be modified to ensure consistency over time.