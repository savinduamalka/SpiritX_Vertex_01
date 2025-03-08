## Project Overview

SecureConnect consists of two main parts:
- **Signup Page**: Where users create their accounts with a unique username and strong password.
- **Login Page**: Where users sign in and are greeted with a friendly, personalized welcome page.

## Additional Functionalities

- **CORS**: Enabled CORS to allow front-end calls.
- **Password Hashing**: Implemented password hashing using bcrypt for secure password storage.
- **JWT Authentication**: Implemented JWT authentication for secure user sessions.

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/savinduamalka/SpiritX_Vertex_01.git
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory with the following content:
    ```properties
    MONGO_URL = mongodb+srv://Database_User:D11XksBtyk5kvFrC@cluster0.cehv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    PORT = 3001
    JWT_SECRET = AUTHkey
    ```

4. **Start the server**:
    ```sh
    npm start
    ```

5. **Run the development server with nodemon**:
    ```sh
    npm run dev
    ```

## Database Connection

The project uses MongoDB Atlas for the database. Ensure you have a MongoDB Atlas account and create a cluster. Use the connection string provided by MongoDB Atlas in the `.env` file.

## Frontend

### Additional Implementations or Functionalities


1. **MUI Alerts for User Feedback**:
   - MUI alerts are used to provide user feedback for validation errors and successful actions.

2. **Password Visibility Toggle**:
   - Custom password visibility toggle buttons are implemented for both the password and confirm password fields.

3. **Session Management**:
   - Basic session management is implemented to keep the user logged in until they click the “Logout” button on the landing page.

4. **Password Strength Indicator**:
   - A password strength indicator is implemented that dynamically updates based on password complexity.

## Commands to Run the Code

1. **Install Dependencies**:
   ```sh
   npm install

2. **Run the Development Server**:
<<<<<<< HEAD
   ```sh
   npm run dev
   
3. **Build the Project**:
   ```sh
   npm run build
   
4. **Lint the Code**:
   ```sh
   npm run lint
   
5. **Preview the Build**:
   ```sh
=======
sh
   npm run dev
   
3. **Build the Project**:
sh
   npm run build
   
4. **Lint the Code**:
sh
   npm run lint
   
5. **Preview the Build**:
sh
>>>>>>> 23486e03863042a41d91b710ba5fdf2d7c75af8f
   npm run preview
   
6. **Run the Backend Server**:
   - Ensure you have a backend server running at `http://localhost:3001` as specified in the `.env` file.
