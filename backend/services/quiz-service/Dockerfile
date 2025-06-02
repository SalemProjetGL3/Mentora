FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files from the quiz-service directory
COPY services/quiz-service/package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

# Copy source code from quiz-service directory
COPY services/quiz-service/ ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]