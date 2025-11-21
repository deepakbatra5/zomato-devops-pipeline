FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
			npm ci --silent; \
		else \
			npm install --silent; \
		fi
COPY . .
EXPOSE 4000
CMD ["npm","start"]