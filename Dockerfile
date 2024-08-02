FROM node:18-alpine 
# Create app directory
WORKDIR /app
# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install  
# Copy rest of the app
COPY . .


RUN ["yarn","run", "dev"]
