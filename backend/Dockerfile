FROM node:14-alpine AS build
ARG PORT
WORKDIR /app
RUN echo $PORT
COPY . ./
RUN rm .env 
RUN mv .env.prod .env
RUN npm ci --silent
CMD node app.js