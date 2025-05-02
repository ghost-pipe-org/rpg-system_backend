FROM node:lts-alpine3.17
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start", ":", "dev"]
