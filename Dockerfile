FROM node:18 AS webpack
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

FROM caddy:2.5.2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=webpack /app/dist /public

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider localhost || exit 1
