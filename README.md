# Asteroid Tracker

Asteroid Tracker is a full stack web application built with React and Node.js (Express) that allows users to view a list of asteroids, search for asteroids by name or date range, and add asteroids to a favorite list.

## Features

- View a list of asteroids
- Search for asteroids by name
- Search for asteroids by date range
- View detailed information about asteroids
- Add asteroids to a favorite list

## Prerequisites

Before running the application, make sure you have the following installed on your local machine:

- Node.js (version 16.13.1 or higher)
- npm (version 9.5.1 or higher)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/Hazzouma/nasa-asteroids-api.git
```

2. Navigate to the project's backend folder:

```shell
cd backend-asteroids
```

3. Install backend dependencies:

```shell
npm install
```

4. Start the backend server:

```shell
npm start
```

5. Open a new terminal window and navigate to the project's frontend folder:

```shell
cd frontend-asteroids
```

6. Install frontend dependencies:

```shell
npm install
```

7. Start the frontend development server:

```shell
npm start
```

8. Access the application by visiting `http://localhost:3000` in your web browser.

## Folder Structure

The project repository consists of the following folders:

- backend-asteroids: Contains the backend server code built with Node.js (Express).
- frontend-asteroids: Contains the frontend React application code.

# SQL Test Challenge:

The single SQL query would be:

```shell
SELECT a.name, a.email, SUM(b.quantity * c.price)
AS total_amount
FROM users a,
orders b,
products c
WHERE c.category = 'Electronics' AND a.id = b.user_id AND b.product_id = c.id
HAVING COUNT(b.id) >= 3 AND total_amount > 1000
GROUP BY a.id, a.name, a.email
ORDER BY total_amount DESC;
```
