# Utilise une image Node.js
FROM node:22-alpine

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copy shared library package files for caching
COPY libs/auth-utils/package*.json ./libs/auth-utils/

# Copier package.json et installer les dépendances
COPY package*.json ./

# Copy all remaining source code
WORKDIR /usr/src/app
COPY services/course-service ./services/course-service
COPY libs/auth-utils ./libs/auth-utils

# Build the shared library
WORKDIR /usr/src/app/libs/auth-utils
RUN npm install -g @nestjs/cli
RUN npm install
RUN npm run build

# Build course-service 
WORKDIR /usr/src/app/services/course-service
RUN npm install -g @nestjs/cli
RUN npm install

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]