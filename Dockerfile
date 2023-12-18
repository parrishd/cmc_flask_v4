# develop stage
FROM node:18-alpine as develop-stage
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# Add nginx config
COPY nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
