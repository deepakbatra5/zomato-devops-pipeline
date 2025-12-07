# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
# 			npm ci --silent; \
# 		else \
# 			npm install --silent; \
# 		fi
# COPY . .
# EXPOSE 4000
# CMD ["npm","start"]
# backend/Dockerfile

FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./

RUN npm install

# Copy rest of the source code
COPY . .

# Environment
ENV PORT=4000

EXPOSE 4000

# Start the server
CMD ["npm", "start"]
# your package.json already has: "start": "node src/server.js"
