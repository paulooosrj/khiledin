FROM node:12-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN apk add g++ make python

RUN apk update && apk add --no-cache git shadow

RUN npm prune
RUN npm audit fix --force
RUN npm install -g concurrently nodemon webpack
RUN npm install --unsafe-perm

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
