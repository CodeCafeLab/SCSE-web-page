#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/SCSE-web-page

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git pull origin main || {
    echo "⚠️  Warning: git pull failed, continuing with current code..."
}

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend
echo "🏗️  Building frontend..."
npm run build

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install

# Build backend
echo "🏗️  Building backend..."
npm run build

# Return to root directory
cd ..

# Set permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/SCSE-web-page/dist
chmod -R 755 /var/www/SCSE-web-page/dist
chown -R www-data:www-data /var/www/SCSE-web-page/server/dist
chmod -R 755 /var/www/SCSE-web-page/server/dist

# Restart PM2 processes (if SCSE processes exist)
echo "🔄 Checking PM2 processes..."
if pm2 list | grep -q "scse"; then
    echo "🔄 Restarting SCSE PM2 processes..."
    pm2 restart scse || pm2 restart all
else
    echo "ℹ️  No SCSE PM2 processes found, skipping PM2 restart"
fi

# Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx || {
    echo "⚠️  Warning: nginx reload failed, but deployment completed"
}

echo "✅ Deployment completed successfully!"

