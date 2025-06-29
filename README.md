# Farmer-Assistance

An e-commerce platform dedicated to assisting farmers by providing essential resources, tools, and community support. This application includes both an admin dashboard for managing products, users, and orders, as well as a user-friendly frontend for farmers to access the platform's features.

## Features and Functionality

**Frontend:**

*   **Product Catalog:** Browse and search for a variety of agricultural products, including fertilizers, pesticides, seeds, and tools.
*   **Product Details:** View detailed information about each product, including pricing, expiry dates, composition, application methods, and more.
*   **Shopping Cart:** Add products to a cart and proceed to checkout.
*   **User Authentication:** Secure login and signup functionality for users.
*   **Profile Management:** Users can manage their profile information, including personal details and addresses.
*   **Order History:** View a history of past orders.
*   **Weather Information:** Access current weather conditions and forecasts to aid in farming decisions.
*   **Marketplace Directory:** Find nearby marketplaces with information on commodity prices.
*   **Cold Storage Directory:** Locate cold storage facilities for preserving agricultural products.
*   **Community Forum:**  A messaging area where farmers can communicate and share information.
*   **Help and Support:** Access FAQs and contact information for customer support.

**Admin Dashboard:**

*   **Admin Authentication:** Secure login for administrators.
*   **User Management:** View, search, and delete user accounts.
*   **Product Management:** Add, view, edit, and delete agricultural products.
*   **Order Management:** View and update order statuses (Pending, Confirmed, Cancelled, Completed).

## Technology Stack

**Frontend:**

*   **React:** A JavaScript library for building user interfaces.
*   **Redux:** A state management library for managing application data.
*   **React Router:** A library for handling routing and navigation.
*   **Axios:** A library for making HTTP requests.
*   **Tailwind CSS:**  CSS framework for styling.
*   **Slick Carousel:** A responsive carousel library.
*   **EmailJS:** Library to send emails directly from client-side JavaScript
*   **react-mobile-app-button:** Library to display mobile app buttons
*   **@fortawesome/react-fontawesome:** Library to use font-awesome library

**Backend:**

*   **Node.js:** A JavaScript runtime environment.
*   **Express.js:** A web application framework for Node.js.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB.
*   **MongoDB:** A NoSQL database.
*   **bcryptjs:** A library for hashing passwords.
*   **jsonwebtoken:** A library for creating and verifying JSON Web Tokens (JWT).
*   **multer:** A node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
*   **cors:**  Middleware to enable Cross-Origin Resource Sharing.
*   **dotenv:** Loads environment variables from a `.env` file into `process.env`.
*   **socket.io:**  Library for enabling real-time, bidirectional and event-based communication.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version 14 or higher)  [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (Node Package Manager) Usually comes with Node.js installation
*   **MongoDB:**  [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation Instructions

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/venkatapavan22/Farmer-Assistance.git
    cd Farmer-Assistance/backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the `backend` directory.
    *   Add the following environment variables:

        ```
        PORT=7000
        DB_USERNAME=<your_mongodb_username>
        DB_PASSWORD=<your_mongodb_password>
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        ```

    *   Replace `<your_mongodb_username>`, `<your_mongodb_password>`, `<your_mongodb_connection_string>`, and `<your_jwt_secret>` with your actual MongoDB credentials, connection string, and a secret key for JWT.

4.  **Run the backend server:**

    ```bash
    npm start
    ```

    The backend server should now be running on port 7000 (or the port specified in your `.env` file).

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
        The project uses only the base URL, which has already been provided as `URL` and `API_URL` in `frontend/src/Services/api.js`

4.  **Run the frontend application:**

    ```bash
    npm run dev
    ```

    The frontend application should now be running and accessible in your browser.

### Admin Panel Setup

1.  **Navigate to the admin directory:**

    ```bash
    cd ../admin
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
       The project uses only the base URL, which has already been provided as `URL` and `API_URL` in `admin/src/Services/api.js`

4.  **Run the admin application:**

    ```bash
    npm run dev
    ```

    The admin application should now be running and accessible in your browser.

## Usage Guide

**Frontend:**

1.  **Access the application in your browser.**
2.  **Browse the product catalog, view product details, and add items to your cart.**
3.  **Login or signup to manage your profile and place orders.**
4.  **Use the weather, marketplace, and cold storage services to aid in farming decisions.**

**Admin Dashboard:**

1.  **Access the admin panel in your browser.**
2.  **Log in with your admin credentials.** (You might need to create an admin user first; see "Backend Setup" above for the `addAdmin` functionality).
3.  **Manage users, products, and orders using the sidebar navigation.**

## API Documentation

The backend provides the following REST API endpoints:

*   `POST /admin/login`: Authenticates an admin user.
    *   Request Body: `{ username, password }`
    *   Response Body: `{ message, token, adminId, username }`
*   `POST /admin/signup`: Registers a new admin user
     *   Request Body: `{ username, password }`
    *    Response Body: `{ message, username }`
*   `GET /product/get`: Retrieves a list of all products.
    *   Response Body: `{ products: [] }`
*   `GET /product/get/:id`: Retrieves a specific product by ID.
    *   Response Body: `{ product: {} }`
*   `POST /product/add`: Adds a new product. Requires admin authentication.
    *   Request Body (multipart/form-data):  `name`, `category`, `description`, `price`, `manufacturer`, `sku`, `expiryDate`, `composition`, `applicationMethod`, `targetPestsDiseases`, `nutrients`, `applicationFrequency`, `applicationSeason`, `safetyInstructions`, `storageInstructions`, `images`
    *   Response Body: `{ message, product: {} }`
*   `DELETE /product/delete/:id`: Deletes a product by ID. Requires admin authentication.
    *   Response Body: `{ message }`
*    `GET /user/getUsers`: Retrieves a list of all users. Requires admin authentication.
     *   Response Body: `{ users: [] }`
*   `DELETE /user/deleteUser/:id`: Deletes a user by ID. Requires admin authentication.
    *   Response Body: `{ message }`
*   `POST /user/signup`: Registers a new user.
    *   Request Body: `{ username, email, password, phoneNumber }`
    *   Response Body: `{ message, username }`
*   `POST /user/login`: Authenticates a user.
    *   Request Body: `{ username, password }`
    *   Response Body: `{ message, token, userId, userName }`
*   `GET /user/getUser/:id`: Retrieves a specific user by ID. Requires user authentication.
    *   Response Body: `{ user: {} }`
*   `PUT /user/updateUser/:id`: Updates a user's profile. Requires user authentication.
    *   Request Body (multipart/form-data): `firstName`, `lastName`, `country`, `cityState`, `postalCode`, `image`
    *   Response Body: `{ message, user: {} }`
*   `GET /order/getOrdersByUser/:userId`: Retrieves orders for a specific user. Requires user authentication.
    *   Response Body: `[]` (array of order objects)
*   `GET /order/getOrders`: Retrieves all orders. Requires admin authentication.
    *   Response Body: `[]` (array of order objects)
*   `POST /order/create`: Creates a new order. Requires user authentication.
    *   Request Body: `{ userId, items: [], totalAmount }`
    *   Response Body: `{ message, order: {} }`
*   `PUT /order/updateStatus/:orderId`: Updates the status of an order. Requires admin authentication.
    *   Request Body: `{ status }` (`Pending`, `Confirmed`, `Cancelled`, `Completed`)
    *   Response Body: `{}` (updated order object)
* `POST /message/createMessage` Creates a new message.
    *  Request Body: `{ userId, message }`
    * Response Body: `{ message, message: "Message Sent Successfully"}`
* `GET /message/getMessages` Gets all messages. Requires admin authentication
    *  Response Body: `[]`
* `DELETE /message/deleteMessagesWhereUserIsNull` Deletes a message by ID. Requires admin authentication
     *  Response Body: `{message: "Message Deleted Successfully"}`
     * `GET /uploads/:imageName` To serve static images


## Contributing Guidelines

Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request to the `main` branch.

## License Information

This project does not currently have a specified license.  All rights are reserved by the owner of the repository.

## Contact/Support Information

For questions, bug reports, or feature requests, please contact:

*   [venkatapavan22@gmail.com](mailto:venkatapavan22@gmail.com)
