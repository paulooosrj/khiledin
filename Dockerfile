FROM node:12-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm prune
RUN npm install -g concurrently nodemon webpack --no-progress
RUN npm install --no-progress

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
