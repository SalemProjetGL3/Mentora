# Utilise une image Node.js
FROM node:22-alpine

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copier package.json et installer les dépendances
COPY package*.json ./


# Copy shared library package files for caching
COPY libs/auth-utils/package*.json ./libs/auth-utils/

# Copy all remaining source code
WORKDIR /usr/src/app
COPY services/gamification-service ./services/gamification-service
COPY libs/auth-utils ./libs/auth-utils

# Build the shared library
WORKDIR /usr/src/app/libs/auth-utils
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Build gamification-service if needed
WORKDIR /usr/src/app/services/gamification-service
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]