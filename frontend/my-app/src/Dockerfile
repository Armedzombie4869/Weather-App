FROM node:16 as buildStage
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . ./

FROM nginx
COPY --from=buildStage /app/build /usr/share/nginx/html