# Backend Setup & Integration Guide

## ✅ What Has Been Created

Your Node.js/Express backend is now complete with:

### ✨ Features Included
1. **User Authentication**
   - User registration with email validation
   - Login with JWT tokens
   - Token verification
   - Password hashing with bcrypt

2. **User Management**
   - Get current user profile
   - Update user profile (name, phone, avatar)
   - View all users

3. **Data Management**
   - Create data entries
   - Read/retrieve data
   - Update existing data
   - Delete data
   - User-level data isolation (users can only access their own data)

4. **Security**
   - JWT-based authentication
   - Password hashing
   - Error handling middleware
   - CORS support
   - Input validation

5. **Database**
   - MongoDB integration
   - Mongoose ODM
   - Data models for User and Data collections
   - Timestamps on all records

---

## 🚀 How to Run the Backend

### Step 1: Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version
- Install and verify: `node --version`

### Step 2: Install MongoDB

**Option A: Local MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and start the service
- Connection: `mongodb://localhost:27017/app-db`

**Option B: MongoDB Atlas (Recommended)**
- Sign up: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/app-db`

### Step 3: Navigate to Backend
```bash
cd backend
```

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Configure Environment

**Create `.env` file:**
```bash
cp .env.example .env
```

**Edit `.env` with your settings:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/app-db
JWT_SECRET=your_super_secret_key_here_change_this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Step 6: Start the Backend

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### Step 7: Verify It's Running

Open in browser or use curl:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Backend is running ✅",
  "timestamp": "2024-..."
}
```

---

## 🔗 API Quick Reference

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get User Profile (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer TOKEN"
```

### Create Data Entry
```bash
curl -X POST http://localhost:5000/api/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Entry",
    "description": "This is my data",
    "content": {"key": "value"}
  }'
```

---

## 📱 Connect Android App to Backend

### In Your Android Project

1. **Update API URL in your Android configuration:**

```kotlin
// For development (Android emulator)
const val API_BASE_URL = "http://10.0.2.2:5000/api/"

// For physical device or production
const val API_BASE_URL = "http://YOUR_BACKEND_URL:5000/api/"
```

2. **Example: Login API call**

```kotlin
data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val success: Boolean, val token: String)

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
}
```

3. **Use the token for authenticated requests:**

```kotlin
val token = loginResponse.token
val headers = mapOf("Authorization" to "Bearer $token")

interface ApiService {
    @GET("users/me")
    suspend fun getProfile(@Header("Authorization") auth: String): User
}
```

---

## 🧪 Test with Postman

1. Download [Postman](https://www.postman.com/)
2. Import requests from the README.md file
3. Set `{{token}}` environment variable after login
4. Test all endpoints

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 already in use | Change `PORT` in `.env` or kill the process |
| MongoDB connection error | Ensure MongoDB is running, check connection string |
| CORS errors | Add your app URL to `CORS_ORIGIN` in `.env` |
| Module not found | Run `npm install` again |
| Token expired | Re-login to get a new token |

---

## 📦 Project Files Structure

```
backend/
├── models/
│   ├── User.js          # User schema & methods
│   └── Data.js          # Data schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── users.js         # User profile endpoints
│   └── data.js          # Data CRUD endpoints
├── middleware/
│   ├── auth.js          # JWT protection middleware
│   └── errorHandler.js  # Error handling
├── server.js            # Main server file
├── package.json         # Dependencies
├── .env.example         # Environment template
└── .gitignore           # Git ignore rules
```

---

## ✅ Next Steps

1. ✅ Backend is set up and running
2. 🔄 Connect your Android app using the API URL
3. 🧪 Test all endpoints
4. 🚀 Deploy to production when ready
5. 📚 Refer to README.md for detailed API documentation

---

**Your backend is ready to go! 🎉**
