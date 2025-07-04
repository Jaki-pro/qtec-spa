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

### Database
- Mongodb

## Project Structure
```
client/    # React frontend
server/    # Node.js backend
```

## How to Run the Project

### Prerequisites
- Node.js (v16 or above recommended)
- npm (comes with Node.js)

### 1. Clone Repository 
Open a terminal and run the command:

```
git clone https://github.com/Jaki-pro/qtec-spa.git
```

### 2. Install Dependencies

```
cd client
npm install
cd ../server
npm install
```

### 3. Start the Backend Server

In a new terminal, go to the `server` directory and run:

```
npm run dev
```

The backend will start on its configured port (default: 5000).

### 4. Start the Frontend (React) App

In a new terminal, go to the `client` directory and run:

```
npm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173) (default Vite port).

### 5. Open the App

Visit [http://localhost:5173](http://localhost:5173) in your browser. The frontend will communicate with the backend server for product and cart operations.

---

## Notes
- Make sure both frontend and backend servers are running for full functionality.
 
