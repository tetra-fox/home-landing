FROM node:20-alpine AS build
WORKDIR /app
COPY . /app

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM hotio/caddy:release-2.6.4
COPY Caddyfile /config/Caddyfile
COPY --from=build /app/build /public

# HEALTHCHECK CMD wget --no-verbose --tries=1 --spider localhost || exit 1