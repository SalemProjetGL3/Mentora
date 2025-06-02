# Use the lightweight Node image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json for the shared lib (for caching)
COPY libs/auth-utils/package*.json ./libs/auth-utils/

# Copy package.json for the user-service (for caching)
COPY services/user-service/package*.json ./services/user-service/

# Copy source code
COPY services/user-service ./services/user-service
COPY libs/auth-utils ./libs/auth-utils

# Build the shared library
WORKDIR /usr/src/app/libs/auth-utils
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Build the user-service
WORKDIR /usr/src/app/services/user-service
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Expose the port your service uses (assume 3001 for user-service)
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
