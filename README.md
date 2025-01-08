# cftech_microInsta_api

## Overview
This project implements a RESTful API for a simplified Instagram-like application. It provides functionality for user management, post creation, deletion, updating, and more. The project uses Node.js, TypeScript, MySQL, and Sequelize as the ORM.

## Features
- User registration and login with JWT authentication.
- CRUD operations for posts.
- Middleware for request validation and authentication.
- Database migrations and seeding.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **TypeScript**: Type-safe JavaScript.
- **MySQL**: Relational database.
- **Sequelize**: ORM for MySQL.
- **Joi**: Validation library.
- **dotenv**: Manage environment variables.

## Project Structure
```
cftech_api/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── controllers/
│   │   ├── userController.ts   # User management
│   │   └── postController.ts   # Post management
│   ├── Interface/
│   │   ├── userInterface.ts   # User Interface
│   │   └── postInterface.ts   # Post Interface
│   ├── middleware/
│   │   ├── authMiddleware.ts   # JWT authentication
│   │   └── validationMiddleware.ts # Request validation
│   ├── models/
│   │   ├── user.ts             # User model
│   │   └── post.ts             # Post model
│   ├── routes/
│   │   ├── userRoutes.ts       # User routes
│   │   └── postRoutes.ts       # Post routes
│   ├── validations/
│   │   └── postValidation.ts   # Joi schemas for posts
│   ├── services/
│   │   ├── userService.ts      # user logic
│   │   └── postService.ts      # Post-related logic
│   ├── migrations/             # Database migration files
│   └── app.ts                 # api entry point
|   ├── server.ts             # application entry point 
├── .env                        # Environment variables
├── package.json                # Project metadata and dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Akky7098/cftech_microInsta_api.git
   cd cftech_microInsta_api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=cftech_api
   DB_PORT=3306
   JWT_SECRET=your_secret_key
   ```

4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Seed the database (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

6. Start the application:
   ```bash
   npm start
   ```
## Scripts
- **Start application**: `npm start`
- **Start in nodemon**: `npm run dev`
- **Run migrations**: `npx sequelize-cli db:migrate`
- **Undo migrations**: `npx sequelize-cli db:migrate:undo`
- **Run seeds**: `npx sequelize-cli db:seed:all`

## Validation
Validation is implemented using **Joi**. Example schemas are located in `src/validations/`.

## Middleware
- **Authentication**: Validates JWT tokens.
- **Validation**: Ensures request payloads meet schema requirements.
