# syntax=docker/dockerfile:1
# App image for the school's own server (see docs/betrieb.md). Built by .github/workflows/deploy.yml.
# DATABASE_URL and PAYLOAD_SECRET are build secrets: pages are prerendered from the live database,
# but neither value ends up in an image layer. At runtime both come from /srv/stuebi/.env.

FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-bookworm-slim AS build
WORKDIR /app
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
    --mount=type=secret,id=payload_secret,env=PAYLOAD_SECRET \
    npm run build

FROM node:24-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Uploads live outside the image: /srv/stuebi/media on the server is mounted here.
RUN mkdir -p media && chown node:node media
USER node
EXPOSE 3000
CMD ["node", "server.js"]
