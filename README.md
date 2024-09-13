# Boilerplate Project

This is a full-stack boilerplate project using React for the front-end and Express for the back-end, including user authentication, session management, and PostgreSQL as the database.

## Features

### Frontend
- **React Router** for navigation.
- **React Hot Toast** for toast notifications.
- **React Hook Form** for form handling.
- **React Spinners** for loading animations.
- **AccountStatusProvider** to handle account-related logic like login state.
- Authentication pages:
  - Login
  - Register
  - Reset Password
- Configured with ESLint and Tailwind CSS for styling.

### Backend
- **Express.js** as the backend framework.
- **PostgreSQL** as the database, using `pg` for querying.
- **Passport.js** for user authentication using local strategy.
- **Sessions** stored in PostgreSQL using `connect-pg-simple`.
- Basic API endpoints for account authentication.

## Installation

### Prerequisites

- Node.js installed
- PostgreSQL running with a valid user and database

### Frontend Setup

1. Clone the repository and navigate to the frontend folder:
   ```bash
   git clone https://github.com/boatman-27/BoilerPlate
   cd boilerplate
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd ../server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a .env file:
   ```bash
   PG_USER=<your_pg_username>
   PG_PASSWORD=<your_pg_password>
   PG_HOST=<your_pg_host>
   PG_PORT=<your_pg_port>
   PG_DATABASE=<your_pg_database>
   SESSION_SECRET=<your_session_secret>
   NODE_ENV=development
   ```
4. Create Users & session tables:
   ```sql
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    userId VARCHAR(8) NOT NULL UNIQUE,
    userRole VARCHAR(10) CHECK (userRole IN ('admin', 'student')),
    plan VARCHAR(10) NOT NULL DEFAULT 'bronze' CHECK (
        (userRole = 'admin' AND plan = 'all-access') OR
        (userRole = 'student' AND plan IN ('bronze', 'silver', 'gold'))
    )
    );

   CREATE TABLE session (
    sid VARCHAR PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP WITHOUT TIME ZONE NOT NULL
    );
   ```
5. Run the development server:
   ```bash
   nodemon index.js
   ```
## Scripts

### Frontend

- `npm run dev`: Start the frontend in development mode.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Lint the frontend code using ESLint.

### Backend

- `npm start`: Start the backend server.

## Environment Variables

The project requires the following environment variables for the backend:

- `PG_USER`: PostgreSQL user
- `PG_PASSWORD`: PostgreSQL password
- `PG_HOST`: PostgreSQL host
- `PG_PORT`: PostgreSQL port
- `PG_DATABASE`: PostgreSQL database name
- `SESSION_SECRET`: Secret for session management

## License

This project is licensed under the ISC License.
Feel free to adjust the sections based on your preferences or project structure!
   
