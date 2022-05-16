FROM node:18.1.0
WORKDIR /app
COPY ./package.json ./
COPY .env ./
RUN yarn install
RUN yarn prisma generate
COPY . .
COPY tsconfig.json ./
COPY ./prisma ./
EXPOSE 5000
CMD ["yarn", "start:prod"]
