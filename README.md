# Online counselling platform

This project is an Online Counselling platform designed for needed, providing an interactive counselling sessions. It features session management, authentication, and note-taking functionality for counselors and clients.

## Features
- Authentication system with JWT-based login.
- Role-based access control (Counselors & Clients).
- Session management for learning interactions.
- Notes feature for counselors to record session details.
- Clients can view their session notes.

## Tech Stack
- **Frontend:** React (Vite) with Tailwind CSS
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT with password hashing
- **Email Service:** NODEMAILER (for password reset and notifications)
- **Password Hashing:** Bcryptjs

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository
```sh
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file and add:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_secret_key
NODEMAILER_SENDER_MAIL=your_api_key
NODEMAILER_MAIL_PASSWORD=your_secret_key
```
4. Start the backend server:
```sh
npm start
```

### Frontend Setup
1. Navigate to the frontend folder:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the development server:
```sh
npm run dev
```

## API Endpoints
### Authentication
- **POST** `/auth/login` - Login users
- **POST** `/auth/register` - Register users
- **POST** `/auth/reset-password` - Reset password

### Session Management
- **GET** `/sessions/:sessionId` - Get session details
- **POST** `/sessions/create` - Create a new session

### Notes
- **GET** `/notes/:sessionId` - Get notes for a session
- **POST** `/notes/add/:sessionId` - Add notes to a session
- **GET** `/sessions/notes/:clientId` - Get all notes for a client

## Usage
- Counselors can log in, manage sessions, and add notes.
- Clients can log in and view session notes.


## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch-name`).
3. Commit changes and push to your fork.
4. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact sudharsanselva2003@gmail.com or visit our GitHub repository.


