# home-landing

Caddy-based landing page Docker image for my home network services

Note that this is highly specific to my configuration. You'd need to update the Caddyfile, services and their associated files/identifiers if you also want to use this.

![image](https://user-images.githubusercontent.com/6416201/169433837-6b2e2f16-913a-4829-9206-cdd56e51fbcd.png)

### docker-compose example

```yaml
version: "3.7"

services:
  home-landing:
    container_name: home-landing
    image: "ghcr.io/tetra-fox/home-landing:latest"
    restart: unless-stopped
    ports:
      - "80:8080"
      - "443:8443"
    environment:
      - PUID=1000
      - PGID=1000
      - UMASK=002
      - TZ=Etc/UTC
    volumes:
      - ${DATA_ROOT}/caddy:/config
    cap_add:
      - NET_ADMIN # the caddy image is modified to include fail2ban :3
```
