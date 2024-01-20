ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}

WORKDIR /user/src/nextjs-frontend

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY .next ./

COPY . .

ENV NODE_VERSION ${NODE_VERSION}