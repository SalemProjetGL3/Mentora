# Use official Node.js LTS image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm ci; fi

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy only the built files and production dependencies
COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile --production; else npm ci --only=production; fi

COPY --from=builder /app/dist ./dist
COPY .env ./

# Docker cannot read .env at build time, so set a default or use build args if needed
EXPOSE ${PORT:-3010}

# Start the application
CMD ["node", "dist/main"]