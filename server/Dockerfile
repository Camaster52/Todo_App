FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN ls -la /app/src/server.js
CMD ["node", "src/server.js"]