# pull the Node.js Docker image
FROM node:18.1.0

# create the directory inside the container
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package.json ./

# copy the tsconfig.json files from local machine to the workdir in container
COPY tsconfig.json ./

# run npm install in our local machine
RUN yarn install --latest

# copy prisma file
COPY prisma ./prisma

# copy env variable
COPY .env ./.env

# generate prisma files
RUN yarn prisma generate

# migrateion database
RUN yarn prisma migrate dev --name init

# copy the generated modules and all other files to the container
COPY . .

RUN yarn build

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

EXPOSE 5432

# the command that starts our app
CMD ["yarn", "start:prod"]
