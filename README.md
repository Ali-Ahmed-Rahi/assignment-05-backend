
# Ride Booking System API

This project is a **ride booking system** built with **Express.js, TypeScript, and MongoDB (Mongoose)**.  
It supports three roles: **Rider, Driver, Admin** with **role-based access control**.  
The system manages **user authentication, driver approvals, and ride lifecycle management**.

---

## 🚀 Features

- **Authentication (JWT-based)**
  - Rider, Driver, and Admin can register and login
  - Passwords are hashed using **bcrypt**

- **Role-based Access Control**
  - Riders → request rides
  - Drivers → accept and complete rides
  - Admins → approve/suspend drivers, view all users and rides

- **Driver Management**
  - Driver registration
  - Admin approval system
  - Driver availability (online/offline)

- **Ride Management**
  - Request a ride
  - Accept a ride (driver)
  - Update ride status → `requested → accepted → in-progress → completed / cancelled`

- **Validation**
  - Handled using **Zod**
  - Validates input for users, drivers, and rides

- **Error Handling**
  - Centralized error handler with custom `ApiError`

---

## 🛠️ Tech Stack

- **Backend:** Express.js + TypeScript  
- **Database:** MongoDB with Mongoose  
- **Validation:** Zod  
- **Authentication:** JWT + bcrypt  
- **Environment Variables:** dotenv  

---

## 📂 Project Structure
```
src/
 ┣ modules/
 ┃ ┣ auth/
 ┃ ┣ user/
 ┃ ┣ driver/
 ┃ ┣ ride/
 ┃ ┗ admin/
 ┣ middlewares/
 ┣ utils/
 ┣ app.ts
 ┗ server.ts
```

---

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register` → Register (rider/driver/admin)
- `POST /api/auth/login` → Login

### Users
- `GET /api/users` → Get all users (admin only)

### Drivers
- `POST /api/drivers` → Create driver profile
- `GET /api/drivers` → Get all drivers (admin only)
- `GET /api/drivers/:id` → Get driver by ID
- `PATCH /api/drivers/approve/:id` → Approve driver (admin only)
- `PATCH /api/drivers/suspend/:id` → Suspend driver (admin only)

### Rides
- `POST /api/rides` → Request ride (rider only)
- `PATCH /api/rides/:id/accept` → Accept ride (driver only)
- `PATCH /api/rides/:id/status` → Update ride status
- `GET /api/rides` → View all rides (admin only)

---

## ⚡ How to Run Locally

1. Clone repo / unzip project  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in root:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```
4. Run project:
   ```bash
   npm run dev
   ```

---

## ✅ Assignment Requirements Checklist
- [x] Express + TypeScript + MongoDB  
- [x] JWT Authentication  
- [x] Riders, Drivers, Admin roles  
- [x] Role-based access control  
- [x] Ride lifecycle management  
- [x] Zod validation  
- [x] Centralized error handling  
