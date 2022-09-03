# Base Stage
FROM node:18-alpine AS base

WORKDIR /home/node/app

ENV HUSKY=0
ENV CI=true
ENV NODE_ENV="development"

RUN apk add -u --no-cache dumb-init jq

COPY --chown=node:node package.json yarn.lock .yarnrc.yml .yarn/ ./

# Remove global cache config line
RUN echo "$(tail -n +2 .yarnrc.yml)" > .yarnrc.yml
COPY --chown=node:node .yarn/ .yarn/

ENTRYPOINT ["dumb-init", "--"]

# Development Stage
FROM base AS dev

WORKDIR /home/node/app

ENV NODE_ENV="development"

RUN apk add -u --no-cache git gpgconf

COPY --chown=node:node tsconfig*.json src/ ./

RUN yarn install --immutable

# Build Stage
FROM dev AS builder

WORKDIR /home/node/app

ENV NODE_ENV="development"

COPY --chown=node:node tsconfig*.json src/ ./

RUN yarn install --immutable
RUN yarn run build

# Runner Stage
FROM base AS runner

WORKDIR /home/node/app

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps --max_old_space_size=4096"

COPY --chown=node:node --from=builder /home/node/app/dist dist

RUN yarn workspaces focus --all --production
RUN chown node:node /home/node/app

USER node

EXPOSE 3000

ARG BUILD_NUMBER=1
ENV BUILD_NUMBER=${BUILD_NUMBER}
RUN contents="$(jq ".version += \".${BUILD_NUMBER}\"" package.json)" && echo "${contents}" > package.json

CMD ["yarn", "start:prod"]
