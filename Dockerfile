# Use Node.js LTS image as a base
FROM node:18

# Set the working directory to the project root
WORKDIR /usr/src/app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy frontend source and build the React app
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copy built frontend to backend so Express can serve it
RUN cp -R frontend/build backend/build

# Copy the rest of the backend code
COPY backend/ ./backend/

# Expose your backend port (change if necessary)
EXPOSE 5000

# Set working directory to backend and start the server
WORKDIR /usr/src/app/backend
CMD ["node", "server.js"]
