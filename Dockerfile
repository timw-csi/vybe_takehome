FROM node:latest

# Frontend
WORKDIR /usr/src/app/frontend

COPY frontend/package*.json .

RUN npm install

COPY frontend/ .

RUN npm run build


# Backend
WORKDIR /usr/src/app/backend

COPY backend/package*.json .

RUN npm install

COPY backend/ .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
