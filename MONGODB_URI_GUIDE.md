# 🔗 MongoDB URI Configuration Guide

## 📍 **How to Use MongoDB URI**

The JPL Auction Platform now supports MongoDB URI for easy database configuration.

### 🎯 **Priority Order**
1. **MONGODB_URI** (highest priority)
2. Individual components (DB_HOST, DB_PORT, etc.)

---

## 🔧 **Configuration Options**

### **Option 1: MongoDB URI (Recommended)**

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/jpl_auction
```

**MongoDB with Authentication:**
```env
MONGODB_URI=mongodb://username:password@localhost:27017/jpl_auction
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority
```

**MongoDB Atlas with Options:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority&authSource=admin
```

### **Option 2: Individual Components**

```env
DB_HOST=localhost
DB_PORT=27017
DB_NAME=jpl_auction
DB_USER=your_username
DB_PASSWORD=your_password
```

---

## 🌐 **MongoDB Atlas Setup**

### **1. Create MongoDB Atlas Account**
- Go to: https://www.mongodb.com/atlas
- Sign up for free account

### **2. Create Cluster**
- Choose free tier (M0)
- Select region closest to you
- Create cluster

### **3. Configure Access**
- **Network Access**: Add IP address (0.0.0.0/0 for development)
- **Database Access**: Create user with read/write permissions

### **4. Get Connection String**
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy connection string

### **5. Update Environment**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority
```

---

## 🐳 **Docker MongoDB Setup**

### **Local Docker MongoDB:**
```bash
# Run MongoDB container
docker run --name jpl-mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -p 27017:27017 \
  -d mongo:latest
```

**Environment:**
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/jpl_auction?authSource=admin
```

### **Docker Compose:**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: jpl-mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

---

## 🔐 **Authentication Examples**

### **No Authentication (Local Development):**
```env
MONGODB_URI=mongodb://localhost:27017/jpl_auction
```

### **With Username/Password:**
```env
MONGODB_URI=mongodb://myuser:mypassword@localhost:27017/jpl_auction
```

### **MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster.mongodb.net/jpl_auction
```

### **With Authentication Database:**
```env
MONGODB_URI=mongodb://myuser:mypassword@localhost:27017/jpl_auction?authSource=admin
```

---

## ⚙️ **Connection Options**

### **Basic URI:**
```env
MONGODB_URI=mongodb://localhost:27017/jpl_auction
```

### **With Connection Options:**
```env
MONGODB_URI=mongodb://localhost:27017/jpl_auction?retryWrites=true&w=majority&maxPoolSize=10
```

### **MongoDB Atlas with Options:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority&authSource=admin&ssl=true
```

---

## 🧪 **Testing Connection**

### **Test MongoDB URI:**
```bash
# Test connection
cd backend
node -e "
const { connectDB } = require('./config/database');
connectDB().then(connected => {
  console.log('Connection:', connected ? '✅ Success' : '❌ Failed');
  process.exit(0);
});
"
```

### **Test with Different URIs:**
```bash
# Test local MongoDB
MONGODB_URI=mongodb://localhost:27017/jpl_auction node test-mongodb.js

# Test MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jpl_auction node test-mongodb.js
```

---

## 🚀 **Quick Setup Commands**

### **1. Local MongoDB:**
```bash
# Start MongoDB
mongod

# Set environment
export MONGODB_URI=mongodb://localhost:27017/jpl_auction

# Start application
cd backend && npm start
```

### **2. Docker MongoDB:**
```bash
# Start MongoDB container
docker run --name jpl-mongodb -p 27017:27017 -d mongo:latest

# Set environment
export MONGODB_URI=mongodb://localhost:27017/jpl_auction

# Start application
cd backend && npm start
```

### **3. MongoDB Atlas:**
```bash
# Set Atlas URI
export MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jpl_auction

# Start application
cd backend && npm start
```

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Connection Refused:**
   - Check if MongoDB is running
   - Verify port 27017 is open
   - Check firewall settings

2. **Authentication Failed:**
   - Verify username/password
   - Check authSource parameter
   - Ensure user has proper permissions

3. **Network Issues:**
   - Check IP whitelist (MongoDB Atlas)
   - Verify network connectivity
   - Check DNS resolution

### **Debug Connection:**
```bash
# Enable debug logging
DEBUG=mongoose:* npm start
```

---

## 📝 **Environment File Examples**

### **Development (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/jpl_auction
PORT=3001
NODE_ENV=development
```

### **Production (.env):**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority
PORT=3001
NODE_ENV=production
```

### **Docker (.env):**
```env
MONGODB_URI=mongodb://admin:password123@mongodb:27017/jpl_auction?authSource=admin
PORT=3001
NODE_ENV=development
```

---

**🎉 MongoDB URI is now fully supported in the JPL Auction Platform!**

