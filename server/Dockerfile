# Build stage
FROM node:24-alpine AS builder
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# Production stage
FROM node:24-alpine AS production
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 80

CMD ["npm", "start"]