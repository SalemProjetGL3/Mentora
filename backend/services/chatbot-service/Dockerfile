# Utilise une image Node.js
FROM node:22-alpine

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Copier fichier .env dans roadmap-service/
COPY .env .env


# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]
