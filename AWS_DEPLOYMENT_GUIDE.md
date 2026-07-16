# AWS Deployment Guide

## 🚀 Deploy Your Backend to AWS (Free for 12 Months)

### Prerequisites
1. AWS Account (Free Tier eligible)
2. Backend code (already ready!)
3. MongoDB Atlas (free database in cloud)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up with email
- Create a free cluster

### 1.2 Get Your Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/app-db?retryWrites=true&w=majority
   ```
4. Replace `username` and `password` with your credentials
5. Save this - you'll need it for AWS

### 1.3 Whitelist IP Address
- In MongoDB Atlas, go to "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (for testing)
- Click "Confirm"

---

## Step 2: Create AWS Account

### 2.1 Sign Up for AWS
- Go to: https://aws.amazon.com/free/
- Click "Create a free account"
- Enter email and password
- Add payment method (won't charge for free tier)
- Verify phone number
- Choose "Basic" support plan

### 2.2 Complete Setup
- Verify email
- Log in to AWS Console
- Go to region: **us-east-1** (has most free services)

---

## Step 3: Launch EC2 Instance (Virtual Server)

### 3.1 Open EC2 Dashboard
1. Log in to AWS Console
2. Search for "EC2"
3. Click "EC2"
4. Click "Instances" (left menu)
5. Click "Launch Instances"

### 3.2 Configure Instance

**Name:** `app-backend`

**AMI (Image):** Amazon Linux 2 (Free Tier eligible)
- Scroll down
- Click "Amazon Linux 2 AMI"
- Click "Select"

**Instance Type:** `t2.micro` (Free Tier)
- Already selected by default
- Click "Next"

**Network Settings:**
- Click "Create security group"
- Name: `app-backend-sg`
- Allow incoming traffic:
  - SSH (port 22) - from your IP
  - HTTP (port 80)
  - HTTPS (port 443)
  - Custom TCP (port 5000) - for Node.js app
- Click "Review and Launch"

**Storage:** 30GB free (default is fine)

### 3.3 Create Key Pair
1. Click "Create new key pair"
2. Name: `app-backend-key`
3. Type: RSA
4. Format: .pem (for macOS/Linux) or .ppk (for Windows)
5. Click "Download Key Pair"
6. **Save this file safely** - you'll need it!

### 3.4 Launch Instance
1. Review settings
2. Click "Launch"
3. Wait 2-3 minutes for instance to start
4. Copy your **Public IPv4 address** (e.g., `54.123.45.67`)

---

## Step 4: Connect to Your Server

### 4.1 Connect via SSH

**On macOS/Linux:**
```bash
# Change permissions
chmod 400 /path/to/app-backend-key.pem

# Connect
ssh -i /path/to/app-backend-key.pem ec2-user@YOUR_PUBLIC_IP
```

**On Windows (using PuTTY):**
1. Download PuTTY: https://www.putty.org/
2. Convert `.pem` key to `.ppk` using PuTTYgen
3. Open PuTTY
4. Host: `ec2-user@YOUR_PUBLIC_IP`
5. Load your `.ppk` key
6. Click "Open"

---

## Step 5: Install Node.js & Dependencies

**Run these commands on your AWS server:**

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version

# Install Git
sudo yum install -y git
```

---

## Step 6: Deploy Your Backend

### 6.1 Clone Your Repository
```bash
# Navigate to home directory
cd ~

# Clone your GitHub repo
git clone https://github.com/cypherdream/App.git
cd App/backend
```

### 6.2 Install Backend Dependencies
```bash
npm install
```

### 6.3 Create .env File
```bash
# Create .env file
nano .env
```

**Paste this (update with YOUR values):**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/app-db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_use_something_random
JWT_EXPIRE=7d
CORS_ORIGIN=*
```

**Save file:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

### 6.4 Test Backend
```bash
# Start backend
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Test it:**
```bash
# Open another terminal/SSH session
curl http://localhost:5000/api/health
```

If you see the health response, it's working! ✅

Stop the server: `Ctrl + C`

---

## Step 7: Run Backend in Background (Forever)

### 7.1 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 7.2 Start Backend with PM2
```bash
cd ~/App/backend
pm2 start server.js --name "app-backend"
pm2 startup
pm2 save
```

### 7.3 Check if Running
```bash
pm2 status
```

Your backend is now running 24/7! ✅

---

## Step 8: Access Your Public Backend

### Your Public URL:
```
http://YOUR_PUBLIC_IP:5000
```

**Example:**
```
http://54.123.45.67:5000/api/health
```

**Test with curl:**
```bash
curl http://54.123.45.67:5000/api/health
```

---

## Step 9: Connect Your Android App

### Update Android Configuration:

```kotlin
// Replace with YOUR AWS PUBLIC IP
const val API_BASE_URL = "http://54.123.45.67:5000/api/"
```

**Or for physical devices (not emulator):**
```kotlin
const val API_BASE_URL = "http://YOUR_AWS_IP:5000/api/"
```

### Example API Call:
```kotlin
// Login
val response = apiService.login(
    LoginRequest(
        email = "user@example.com",
        password = "password123"
    )
)

// Get token
val token = response.token

// Authenticated request
val headers = mapOf("Authorization" to "Bearer $token")
val userData = apiService.getUserProfile(headers)
```

---

## 💰 Free Tier Benefits (12 Months)

- ✅ EC2: 750 hours/month (runs continuously)
- ✅ Free data transfer (up to limits)
- ✅ No charges if you stay in free tier
- ✅ Can run small database and app

---

## 🔒 Important Security Notes

1. **Change JWT_SECRET** to something random:
   ```bash
   openssl rand -base64 32
   ```

2. **Keep your key pair safe** - don't share `.pem` file

3. **Use HTTPS eventually** - set up SSL certificate (free with Certbot)

4. **Monitor costs** - go to AWS Billing dashboard

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Check connection string in `.env`, whitelist IP in MongoDB Atlas |
| Backend not responding | SSH in and check: `pm2 status` or `pm2 logs` |
| CORS errors | Set `CORS_ORIGIN=*` in `.env` (or specific app URL) |
| Port not accessible | Check Security Group allows port 5000 |
| Out of free tier | Monitor AWS Billing, stop unused services |

---

## 📊 Monitor Your Backend

```bash
# View logs
pm2 logs app-backend

# Restart if needed
pm2 restart app-backend

# Stop backend
pm2 stop app-backend

# Check status
pm2 status
```

---

## 🎉 You're Done!

Your backend is now:
- ✅ Running 24/7 on AWS
- ✅ Publicly accessible
- ✅ Free for 12 months
- ✅ Connected to MongoDB Atlas (free)
- ✅ Ready for your Android app

**Your public URL: `http://YOUR_PUBLIC_IP:5000`**

---

## Next Steps

1. Test all API endpoints with Postman
2. Update your Android app with the public URL
3. Test login/registration
4. Monitor with PM2 logs
5. Set up automatic backups for MongoDB

---

**Need help? Refer to this guide or check AWS docs!** 🚀
