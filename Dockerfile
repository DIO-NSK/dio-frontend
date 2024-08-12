FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN yarn install --production

EXPOSE 8080
CMD ["yarn", "start"]
