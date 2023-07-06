ARG NODE_VERSION=20
ARG CADDY_VERSION=2

FROM node:${NODE_VERSION}-alpine AS node-build

COPY . /app
WORKDIR /app

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM caddy:${CADDY_VERSION}-builder-alpine AS caddy-build

RUN xcaddy build \
    --with github.com/mholt/caddy-l4@master \
    --with github.com/caddyserver/transform-encoder@master \
    --with github.com/hslatman/caddy-crowdsec-bouncer/http@main \
    --with github.com/hslatman/caddy-crowdsec-bouncer/layer4@main

FROM caddy:${CADDY_VERSION}-alpine

COPY --from=caddy-build /usr/bin/caddy /usr/bin/caddy
COPY --from=node-build /app/build /public
COPY --from=node-build /app/Caddyfile /etc/caddy/Caddyfile

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["run", "--config", "/etc/caddy/Caddyfile"]

#