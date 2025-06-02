# ⚡ Charger Management System

A full-stack application for managing electric vehicle (EV) charging stations with interactive maps, authentication, and responsive UI.

---

## 🚀 Overview

The **Charger Management System** is designed to allow administrators to onboard and manage EV charging stations. The application includes user authentication, CRUD operations for chargers, real-time map integration (via Leaflet), and a responsive glassmorphic UI.

---

## ✨ Features

- 🔐 User authentication with JWT
- 📋 View, add, edit, delete chargers
- 🗺️ Interactive Leaflet Map with location markers
- 🧭 Reverse geocoding to show location names
- 📱 Fully responsive design using Tailwind CSS & DaisyUI
- 🔍 Filter chargers by status and connector type
- 🧠 Protected routing using React Router

---

## 🛠️ Tech Stack

### Frontend
- React.js (CRA)
- Tailwind CSS + DaisyUI
- Axios
- React Router
- Leaflet.js (for maps)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- CORS, dotenv, etc.

---

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| POST   | `/auth/login`                  | User login              |
| POST   | `/auth/signup`                 | Register a user         |
| GET    | `/chargers/`                   | Get all chargers        |
| POST   | `/chargers/create-charger`     | Add a new charger       |
| PUT    | `/chargers/update-charger/:id` | Update existing charger |
| DELETE | `/chargers/delete-charger/:id` | Delete charger          |
