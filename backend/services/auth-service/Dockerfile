# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy auth-service package files first for caching
COPY services/auth-service/package*.json ./services/auth-service/

# Copy shared library package files for caching
COPY libs/auth-utils/package*.json ./libs/auth-utils/

# Copy all remaining source code
WORKDIR /usr/src/app
COPY services/auth-service ./services/auth-service
COPY libs/auth-utils ./libs/auth-utils

# Build the shared library
WORKDIR /usr/src/app/libs/auth-utils
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Build auth-service if needed
WORKDIR /usr/src/app/services/auth-service
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build
# RUN npm run build && ls -la dist

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start"]