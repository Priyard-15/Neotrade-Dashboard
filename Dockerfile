FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the React app
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
