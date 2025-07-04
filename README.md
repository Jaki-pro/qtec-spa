# Qtec Ecommerce SPA

## Project Overview
Qtec Ecommerce SPA is a modern, single-page application for an online store. It features a product catalog, product detail pages, a shopping cart, and a checkout flow. The project is structured with a React frontend (client) and a Node.js/Express backend (server).

## Tech Stack

### Frontend
- React (with TypeScript)
- Vite (for fast development and build)
- Material UI (MUI) for UI components

### Backend
- Node.js
- Express.js

## Project Structure
```
client/    # React frontend
server/    # Node.js backend
```

## How to Run the Project

### Prerequisites
- Node.js (v16 or above recommended)
- npm (comes with Node.js)

### 1. Install Dependencies

Open a terminal in the project root and run:

```
cd client
npm install
cd ../server
npm install
```

### 2. Start the Backend Server

In the `server` directory, run:

```
npm start
```

The backend will start on its configured port (default: 5000).

### 3. Start the Frontend (React) App

In a new terminal, go to the `client` directory and run:

```
npm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173) (default Vite port).

### 4. Open the App

Visit [http://localhost:5173](http://localhost:5173) in your browser. The frontend will communicate with the backend server for product and cart operations.

---

## Notes
- Make sure both frontend and backend servers are running for full functionality.
- You can customize ports and environment variables as needed.
- For development, hot reloading is enabled via Vite.

---

For any issues, please check the respective `README.md` files in `client` and `server` (if available) or contact the project maintainer.
