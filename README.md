
# 🚖 Ride Booking System API

A backend application built with **Node.js, Express, TypeScript, and MongoDB** that simulates a ride booking platform like Uber/Pathao.  
It supports **role-based access control (Admin, Driver, Rider)**, ride lifecycle management, fare calculation, driver earnings, and admin controls

## 📌 Features (Detailed)

## 👤 User Features (Rider & Driver)

***Registration & Login:*** Secure sign-up and authentication using JWT.

**Role-based Access:** Users can register as rider, driver, or admin.

**Profile Management:** Each user can view their own account details.

**Account Restrictions:** Blocked users cannot log in or perform actions until unblocked by an admin.

## 🚗 Rider Features

**Ride Request:** Riders can request a new ride by providing pickup and dropoff locations.

**Ride Tracking:** Riders can view their active and past rides.

**Fare Calculation:** Riders can see the fare estimate before booking (stored in database).

**Ride Status Updates:** Riders are notified as their ride moves through statuses: requested → picked up → in transit → completed.

**Cancellation:** Riders can cancel a ride before it is picked up by a driver.

## 🚙 Driver Features

**Ride Management:** Drivers can view rides assigned to them.

**Ride Acceptance/Rejection:** Drivers can accept or reject rides. Rejected rides are made available again.

**Status Updates:** Drivers can update ride status step by step:

picked_up → in_transit → completed → (or rejected)

**Earnings Tracking:** Drivers can view their earnings per ride and total income.

**Ride History:** Drivers have access to all previously completed rides with detailed fare info.

**Suspension Handling:** If suspended by an admin, drivers cannot take new rides until reinstated.

## 🛡️ Admin Features

**User Management:**

View all users (riders & drivers).

Block/unblock users.

**Driver Management:**

Approve or suspend drivers.

Monitor driver activity and status.

**Ride Management:**

View all rides in the system.

Check ride status and history.

Ensure compliance and fairness between riders and drivers.

System Control: Acts as the super role, having access to all protected resources.

## 🔐 Security Features

**Password Hashing:** All user passwords are encrypted using bcrypt before saving.

**JWT Authentication:** Ensures secure access for riders, drivers, and admins.

**Role-based Authorization:** Prevents unauthorized access to protected routes (e.g., only admins can block/unblock users).