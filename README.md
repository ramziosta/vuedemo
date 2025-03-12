# Project Setup

## How to Run the App

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Server**
   Open a terminal and run:
   ```bash
   npm run server
   ```
   This starts the backend server on `http://localhost:8000`.

3. **Run the Frontend**
   Open a second terminal and run:
   ```bash
   npm run dev
   ```
   This starts the Vite development server on `http://localhost:3000`.

4. **Open the App**
   Go to `http://localhost:3000` in your browser.

## Features
- Navigate through the app to manage trader data.
- Perform **CRUD operations** (Create, Read, Update, Delete) on traders.
- View **live exchange rates** fetched from an API.

## Overview
This project is a **Data Visualization Dashboard** built with **Vue.js** (frontend) and **Node.js** (backend). It demonstrates a clean, responsive design and a working API connected to MongoDB. The app focuses on managing and displaying trader data with dynamic interactions and external data fetching.

### Frontend (Vue.js)
- Built with **Vite** for faster builds and modern JavaScript support.
- Uses **TailwindCSS** for a responsive, modern UI.
- Displays trader data fetched from the backend.
- Fetches and displays live **exchange rates** from an external API for added value.

### Backend (Node.js)
- Powered by **Express.js** to handle API requests.
- Connects to **MongoDB Atlas** for data persistence.
- Implements endpoints for **GET**, **POST**, **PUT**, and **DELETE** operations on trader data.
- Supports error handling and custom IDs for cleaner data management.

## Data Selection
The dataset represents **trader profiles** — each containing details like **name**, **type**, **location**, **salary**, and **company**. This lets the app simulate a recruitment or talent marketplace dashboard.

Additionally, the app integrates real-time **exchange rate data** from an external API, adding dynamic financial insight to the dataset.

---
Happy coding!

