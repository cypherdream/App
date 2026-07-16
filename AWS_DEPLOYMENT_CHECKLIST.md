# AWS EC2 Backend Deployment Checklist

## ✅ Pre-Deployment

- [ ] AWS Account created (Free Tier)
- [ ] MongoDB Atlas account created
- [ ] MongoDB Atlas cluster created and connection string copied
- [ ] GitHub account with your App repository

## ✅ AWS Setup

- [ ] EC2 instance launched (t2.micro - Free Tier)
- [ ] Security Group configured (ports 22, 80, 443, 5000 open)
- [ ] Key pair downloaded and saved safely
- [ ] Public IPv4 address noted

## ✅ Server Setup (SSH into instance)

- [ ] System packages updated: `sudo yum update -y`
- [ ] Node.js installed: `node --version`
- [ ] Git installed: `git --version`
- [ ] PM2 installed: `sudo npm install -g pm2`
- [ ] Repository cloned: `git clone https://github.com/cypherdream/App.git`
- [ ] Backend dependencies installed: `npm install`

## ✅ Configuration

- [ ] `.env` file created in `~/App/backend/`
- [ ] `MONGODB_URI` configured with MongoDB Atlas connection string
- [ ] `JWT_SECRET` set to random secure key
- [ ] `CORS_ORIGIN` set to `*` (or your app domain)
- [ ] `NODE_ENV` set to `production`

## ✅ Deployment

- [ ] Backend tested locally: `npm start`
- [ ] PM2 started: `pm2 start server.js --name 'app-backend'`
- [ ] PM2 configured to restart on reboot: `pm2 startup && pm2 save`
- [ ] Backend running: `pm2 status` shows online

## ✅ Testing

- [ ] Health check works: `curl http://YOUR_PUBLIC_IP:5000/api/health`
- [ ] Can register user via Postman/curl
- [ ] Can login successfully
- [ ] JWT token received and valid
- [ ] Can access protected endpoints with token

## ✅ Android App Integration

- [ ] Updated `API_BASE_URL` in Android app to `http://YOUR_PUBLIC_IP:5000/api/`
- [ ] Tested login from Android app
- [ ] Tested data operations from Android app
- [ ] CORS working properly

## ✅ Monitoring & Maintenance

- [ ] PM2 logs checked: `pm2 logs`
- [ ] Backend stays running after server restart
- [ ] Automatic restarts configured
- [ ] Error logging enabled
- [ ] MongoDB connection stable

## ✅ Security

- [ ] JWT_SECRET is strong and random
- [ ] EC2 security group restricts access appropriately
- [ ] Key pair file (.pem) is kept secure
- [ ] .env file is NOT committed to GitHub
- [ ] HTTPS setup planned (future: use Certbot for free SSL)

## 📊 Free Tier Monitoring

- [ ] AWS Billing Dashboard checked
- [ ] No unexpected charges
- [ ] Services staying within free tier limits
- [ ] Set up billing alerts

## 🎉 Deployment Complete!

- [ ] Backend is live and accessible
- [ ] Android app connected and working
- [ ] All APIs responding correctly
- [ ] Logs being monitored

---

## 🆘 Quick Troubleshooting

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs app-backend

# Restart backend
pm2 restart app-backend

# SSH into AWS instance
ssh -i /path/to/app-backend-key.pem ec2-user@YOUR_PUBLIC_IP

# Check if port 5000 is listening
sudo netstat -tlnp | grep 5000
```

---

**Your backend is now running on AWS Free Tier! 🚀**
