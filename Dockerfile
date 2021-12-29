# webpack build
FROM node:17 AS webpack
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

# serve static from nginx
FROM nginx:latest
COPY --from=webpack /app/dist /usr/share/nginx/html

HEALTHCHECK CMD ["pidof", "-q", "nginx"]