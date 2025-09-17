Ride Booking API
Project Overview

This is a Ride Booking API for managing riders, drivers, and rides in a ride-hailing system. It allows:

Rider registration, login, and ride requests

Driver registration, login, and managing ride status

Admin management for users, drivers, and rides

Role-based access control for secure operations

Viewing earnings, approving drivers, blocking/unblocking users

This API is built using Node.js, Express.js, MongoDB, and TypeScript, with JWT-based authentication.

Setup & Environment Instructions

Clone the repository

git clone <repository_url>
cd ride-booking-api


Install dependencies

npm install


Environment variables
Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>


Start the server

npm run dev


API Testing
Use Postman or Insomnia. The server runs by default at:

http://localhost:5000

API Endpoints Summary
1. Auth Routes
Method	URL	Description	Body / Params
POST	/api/auth/register	Register new rider/driver/admin	{ name, email, password, role }
POST	/api/auth/login	Login user	{ email, password, role }
2. User / Rider Routes (Admin Only)
Method	URL	Description
GET	/api/users	Get all users/riders
GET	/api/users/:id	Get a user/rider by ID
PATCH	/api/users/:id	Update user info
PATCH	/api/users/:id/block	Block a user
PATCH	/api/users/:id/unblock	Unblock a user
3. Driver Routes
Method	URL	Description
GET	/api/drivers	Get all drivers
PATCH	/api/drivers/:id/approve	Approve a driver (Admin)
PATCH	/api/drivers/:id/suspend	Suspend a driver (Admin)
PATCH	/api/drivers/:id/availability	Set driver online/offline
GET	/api/drivers/:id	Get driver info
4. Ride Routes
Method	URL	Description
POST	/api/rides/request	Rider requests a ride
PATCH	/api/rides/:id/status	Update ride status (picked_up, in_transit, completed, rejected)
GET	/api/rides/me/driver	Get rides assigned to logged-in driver
GET	/api/rides	Admin: Get all rides
5. Admin Routes
Method	URL	Description
GET	/api/admin/users	View all riders/users
PATCH	/api/admin/users/:id/block	Block or unblock a user
GET	/api/admin/drivers	View all drivers
PATCH	/api/admin/drivers/:id/approve	Approve/suspend a driver
GET	/api/admin/rides	View all rides
Notes

Use Bearer Token in Authorization header for protected routes.

Roles are strictly enforced: rider, driver, admin.

Only admin can approve/suspend drivers or block/unblock users.

Driver must be approved to receive rides.