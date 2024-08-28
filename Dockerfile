# develop stage
FROM node:18-alpine as develop-stage
RUN apk add --no-cache git
WORKDIR /app
# 4GB value (in MB)
ENV NODE_OPTIONS=--max_old_space_size=4096
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage
WORKDIR /app
RUN yarn
RUN quasar build

# production stage
FROM nginx:1.25.3-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Add nginx config
COPY nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
