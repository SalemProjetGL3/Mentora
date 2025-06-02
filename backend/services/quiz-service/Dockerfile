FROM node:22-alpine

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copier package.json et installer les dépendances
COPY package*.json ./

# Copier le reste du codeAdd commentMore actions
COPY . .


# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]