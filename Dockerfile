FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy project files
COPY . .

# Build client frontend
RUN npm run build

# --- Production Image ---
FROM node:20-alpine

WORKDIR /app

# Copy backend dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend assets and server
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/sql ./sql

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server/server.js"]
