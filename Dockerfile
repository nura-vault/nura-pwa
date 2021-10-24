FROM node:13.12.0-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install

#############################

FROM node:13.12.0-alpine
WORKDIR /app

# add app
COPY --from=build /app .
COPY . ./

# build
RUN npm run build

RUN npm install serve -g --silent

# start app
CMD ["serve", "-s", "build", "-p", "80"]