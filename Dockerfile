FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY ./ /app/
RUN npm run build