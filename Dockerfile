FROM node:19-alpine AS webpack
WORKDIR /app
COPY . /app

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --prod
RUN pnpm run build

FROM hotio/caddy:release-2.6.4
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=webpack /app/dist /public

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider localhost || exit 1
