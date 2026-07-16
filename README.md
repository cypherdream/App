# App - Mobile & Backend Solution

A complete mobile app with a full-featured Node.js/Express backend. Includes user authentication, data management, and REST API endpoints.

## 📁 Project Structure

```
App/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB models (User, Data)
│   ├── routes/             # API routes (auth, users, data)
│   ├── middleware/         # Auth & error handling middleware
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment variables template
│   └── .gitignore          # Git ignore rules
├── android/                # Android app source
├── .github/workflows/      # CI/CD workflows
└── README.md              # This file
```

## 🚀 Quick Start

### Backend Setup

#### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)

#### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/app-db
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/app-db?retryWrites=true&w=majority
   ```

5. **Start the backend:**

   **Development mode** (with auto-reload):
   ```bash
   npm run dev
   ```

   **Production mode:**
   ```bash
   npm start
   ```

6. **Verify it's running:**
   - Visit: `http://localhost:5000/api/health`
   - Expected response: `{ "status": "Backend is running ✅", "timestamp": "..." }`

---

## 📱 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

#### Verify Token
```http
POST /api/auth/verify
Authorization: Bearer <token>
```

---

### User Profile

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

### Data Management

#### Create Data Entry
```http
POST /api/data
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Data",
  "description": "Description here",
  "content": { "key": "value" }
}
```

#### Get All User Data
```http
GET /api/data
Authorization: Bearer <token>
```

#### Get Single Data Entry
```http
GET /api/data/:id
Authorization: Bearer <token>
```

#### Update Data Entry
```http
PUT /api/data/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": { "updated": true }
}
```

#### Delete Data Entry
```http
DELETE /api/data/:id
Authorization: Bearer <token>
```

---

## 🔌 Connect Your Android App

Update your Android app to use the backend API:

### Android Configuration

**In your Android app's configuration file, set:**

```kotlin
// Development
const val API_BASE_URL = "http://10.0.2.2:5000/api/"

// Production
const val API_BASE_URL = "https://your-deployed-backend.com/api/"
```

**Example API call with Retrofit/OkHttp:**

```kotlin
// Register
val registerRequest = RegisterRequest("John Doe", "john@example.com", "password123")
val response = apiService.register(registerRequest)

// Login
val loginRequest = LoginRequest("john@example.com", "password123")
val response = apiService.login(loginRequest)
val token = response.token

// Authenticated requests
val headers = mapOf("Authorization" to "Bearer $token")
val userData = apiService.getUserProfile(headers)
```

---

## 🧪 Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API collection:
   - Create requests for each endpoint above
   - Set headers: `Content-Type: application/json`
   - For authenticated endpoints, add: `Authorization: Bearer <your_token>`

---

## 🗄️ Database Setup

### Local MongoDB

1. **Install MongoDB** - [Download](https://www.mongodb.com/try/download/community)
2. **Start MongoDB:**
   ```bash
   mongod
   ```
3. **Connect in `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/app-db
   ```

### MongoDB Atlas (Cloud)

1. **Create account** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a cluster**
3. **Get connection string** and update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/app-db
   ```

---

## 📊 Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | Database URL | `mongodb://localhost:27017/app-db` |
| `JWT_SECRET` | JWT signing key | `your_secret_key` |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

---

## 🔐 Security Notes

- **Never commit `.env`** - Use `.env.example` as template
- **Change `JWT_SECRET`** in production
- **Use HTTPS** in production
- **Validate all inputs** on the server
- **Use strong passwords** (min 8 characters)
- **Keep dependencies updated** - `npm audit` and `npm update`

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection error
- Ensure MongoDB is running (`mongod` for local)
- Check connection string in `.env`
- For Atlas, whitelist your IP

### Port already in use
```bash
# Change PORT in .env or kill the process
# On macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### CORS errors
- Check `CORS_ORIGIN` in `.env`
- Add your app's origin to the list

---

## 📚 Deployment

### Deploy to Heroku

1. **Install Heroku CLI** - [Download](https://devcenter.heroku.com/articles/heroku-cli)
2. **Login:**
   ```bash
   heroku login
   ```
3. **Create app:**
   ```bash
   heroku create your-app-name
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Deploy to AWS, DigitalOcean, or other cloud
- Use Docker container
- See deployment guides in documentation

---

## 📞 Support & Help

- **GitHub Issues** - Report bugs or feature requests
- **Documentation** - Check inline code comments
- **Environment setup** - Follow the Quick Start section above

---

## 📄 License

MIT License - Feel free to use this project freely

---

## ✅ Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] MongoDB connected successfully
- [ ] Can register and login
- [ ] Can create/read/update/delete data
- [ ] Android app configured with API URL
- [ ] Token-based authentication working
- [ ] CORS configured for your app

---

**Happy coding! 🎉**
