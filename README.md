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
    restart: always
    volumes:
      - /home/pi/service-data/caddy/data:/data
      - /home/pi/service-data/caddy/config:/config
    network_mode: host # Not required, you can just expose ports 80 and 443
```
