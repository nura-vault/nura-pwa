FROM node:13.12.0-alpine AS installation

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent

#############################

FROM node:13.12.0-alpine AS build

# set working directory
WORKDIR /app

# add node modules
COPY --from=installation /app .
# add source code
COPY . ./

# build
RUN npm run build

#############################

FROM node:13.12.0-alpine AS final

# set working directory
WORKDIR /app

# add build folder
COPY --from=build /app/build ./build

RUN npm install serve@12.0.0 -g --silent
EXPOSE 80

# start app
CMD ["serve", "-s", "build", "-p", "80"]