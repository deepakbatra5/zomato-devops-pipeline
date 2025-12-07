# FROM node:18-alpine as build
# WORKDIR /app
# COPY package*.json ./docker compose up
# RUN if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
# 			npm ci --silent; \
# 		else \
# 			npm install --silent; \
# 		fi
# COPY . .
# RUN npm run build
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]
# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
