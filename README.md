# Express-TS Starter

An Express.js starter template with TypeScript, designed for rapid development of RESTful APIs with common utilities preconfigured. This starter repository is equipped with essential dependencies and dev dependencies to simplify project setup.

## Features

- **TypeScript**: Strongly-typed language for improved developer experience and code maintainability.
- **Express**: Fast and lightweight web framework for building APIs.
- **Environment Configuration**: Manage environment variables with `dotenv`.
- **Authentication**: Handle token-based authentication with `jsonwebtoken` and secure password management with `bcrypt`.
- **CORS Support**: Easily configure cross-origin resource sharing using `cors`.
- **Cookie Parsing**: Parse cookies with `cookie-parser`.
- **Development Tools**: Type definitions, hot reloading with `nodemon`, and TypeScript build tools for a smooth development workflow.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd express-ts-starter
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Available Scripts

- **`npm run dev`**: Start the development server with hot-reloading using `nodemon` and `ts-node`.
- **`npm run build`**: Compile TypeScript files to JavaScript in the `dist` directory.
- **`npm start`**: Run the compiled JavaScript files from the `dist` directory.

### File Structure

```plaintext
express-ts-starter/
├── src/
│   ├── index.ts       # Entry point for the application
│   ├── routes/        # Define your routes here
│   ├── middlewares/   # Custom middlewares
│   ├── controllers/   # Route handlers (business logic)
│   ├── models/        # Define data models or interfaces
│   ├── utils/         # Helper functions and utilities
├── .env               # Environment variables file (not included in version control)
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project metadata and dependencies
└── README.md          # Documentation
```

### Configuration

1. Create a `.env` file in the root directory and define the necessary environment variables. For example:
   ```plaintext
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ``

2. Replace `your_jwt_secret` with a strong secret for JWT signing.

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the server at `http://localhost:<PORT>` (default is 3000).

### Installed Dependencies

#### Production Dependencies
- **bcrypt**: For secure password hashing.
- **cookie-parser**: Parse HTTP cookies.
- **cors**: Enable cross-origin resource sharing.
- **dotenv**: Load environment variables from `.env` files.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: Generate and verify JSON web tokens.

#### Development Dependencies
- **@types/bcrypt**: Type definitions for `bcrypt`.
- **@types/cookie-parser**: Type definitions for `cookie-parser`.
- **@types/cors**: Type definitions for `cors`.
- **@types/jsonwebtoken**: Type definitions for `jsonwebtoken`.
- **nodemon**: Automatically restart the server on file changes.
- **ts-node**: Run TypeScript directly without compilation.
- **tsx**: Enhanced TypeScript execution environment for Node.js.
- **typescript**: TypeScript compiler and language support.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

