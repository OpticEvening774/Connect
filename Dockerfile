FROM node:18
WORKDIR /usr/src/app

# Install backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend deps
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Build frontend
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Move built frontend to backend
RUN cp -R frontend/build backend/build

# Copy backend source
COPY backend/ ./backend/

EXPOSE 5000
# FINAL: If the server.js is inside /usr/src/app/backend
CMD ["node", "backend/server.js"]
