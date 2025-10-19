FROM node:18-alpine

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package files first
COPY package*.json ./

# Remove any existing node_modules and package-lock to force clean install
RUN rm -rf node_modules package-lock.json

# Install dependencies and rebuild native modules for Alpine
RUN npm install

# Rebuild bcrypt specifically for Alpine Linux
RUN npm rebuild bcrypt --build-from-source

# Copy source code
COPY . .

# Ensure images directory exists and has proper permissions
RUN mkdir -p images && chmod 755 images

# Expose port 3001
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
