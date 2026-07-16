#!/bin/bash

# Automated AWS Deployment Script
# Run this on your AWS EC2 instance to set up everything automatically

echo "🚀 Starting AWS Deployment Setup..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js
echo "📦 Installing Node.js..."
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install Git
echo "📦 Installing Git..."
sudo yum install -y git

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Clone repository
echo "📦 Cloning repository..."
cd ~
git clone https://github.com/cypherdream/App.git

echo "📦 Installing backend dependencies..."
cd ~/App/backend
npm install

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "📝 Next steps:"
echo "1. Create .env file: nano .env"
echo "2. Add these variables:"
echo "   PORT=5000"
echo "   NODE_ENV=production"
echo "   MONGODB_URI=your_mongodb_connection_string"
echo "   JWT_SECRET=your_secret_key"
echo "   CORS_ORIGIN=*"
echo ""
echo "3. Start backend: pm2 start server.js --name 'app-backend'"
echo "4. Save PM2: pm2 save && pm2 startup"
echo ""
echo "Your backend will be at: http://YOUR_PUBLIC_IP:5000"
echo ""
