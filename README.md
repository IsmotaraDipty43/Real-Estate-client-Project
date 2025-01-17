# HomeScape - Real Estate Platform

HomeScape is a fully responsive real estate platform built using the MEAR stack (MongoDB, Express.js, Angular, React, and Node.js). It enables users to buy and sell properties with advanced user roles for Admins, Agents, and Normal Users. The platform integrates Stripe for secure payments and provides an intuitive user experience with notifications and alerts.

## Live Demo
[HomeScape](https://realstate-be053.web.app/)

## Admin Credentials
- **Username:** Admin@gmail.com  
- **Password:** Admin@

## Agent Credentials
- **Username:** Agent@gmail.com  
- **Password:** Agent@

## Features
1. **User Roles and Management:**
   - Three user roles: Admin, Agent, and Normal User.
   - Admin can promote users to Agent and track their activities.
   - Fraud detection: Admin can declare users as fraudulent, disabling their ability to list properties, deleting their existing listings, and removing them from Firebase.

2. **Property Management:**
   - Agents can add, update, and delete properties.
   - Admin approval is required for properties added by Agents to appear on the platform.
   - Users can request property purchases, with Agents having the ability to accept or reject these requests.

3. **Wishlist and Reviews:**
   - Users can add properties to their wishlist.
   - Users can review and rate properties, with Admins having the ability to manage and delete reviews.

4. **Offers and Purchases:**
   - Users can make offers to Agents for properties.
   - Secure payments are handled via Stripe upon offer acceptance by Agents.

5. **Notification System:**
   - SweetAlert and toast notifications for real-time updates and alerts.

6. **Authentication:**
   - Email and password-based login and registration.
   - Google login integration for easy access.
   - Password reset functionality for user convenience.

7. **Admin Dashboard:**
   - Manage all users and properties.
   - Delete fraudulent users and their associated properties from Firebase.
   - Approve or reject properties submitted by Agents.

8. **Agent Dashboard:**
   - Manage personal property listings and track user purchase requests efficiently.
   - Update property details directly from the dashboard.

9. **Secure Environment:**
   - JWT token authorization for secure API access.
   - Global secure environment setup for backend configuration.
   - Axios instance for streamlined API calls.

10. **Responsive Design:**
    - Fully responsive UI for seamless experience across desktops, tablets, and mobile devices.

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** TanStack Query
- **Authentication:** Firebase
- **Payment Gateway:** Stripe
- **Authorization:** JWT Tokens
