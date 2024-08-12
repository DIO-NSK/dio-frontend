FROM node:20-bullseye-slim as deps
WORKDIR /app

COPY package*.json yarn*.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-bullseye-slim as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN yarn build

FROM node:20-bullseye-slim
WORKDIR /app

COPY --from=builder /app ./
COPY --from=deps /app/node_modules ./node_modules

RUN yarn install --production --frozen-lockfile --prefer-offline

EXPOSE 8080

RUN yarn global add pm2
CMD ["pm2-runtime", "start", "process.yml"]
