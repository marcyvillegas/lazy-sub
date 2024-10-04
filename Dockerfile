# base image
FROM node:20-alpine

# copying the files of the application
# the /app/ is inside the docker container 
# -> copy package.json and paste to /app/
# -> copy whole directory and paste to /app/
COPY package.json /app/
COPY . /app/

# change directory or folder path to /app
WORKDIR /app

# install the dependencies
RUN npm install

# expose port
EXPOSE 3000

# run the application
CMD ["npm", "run", "dev"]

# run in terminal:

# to create an docker image 🖼️
# docker build -t test:1.0 .

# to run image as docker container 📦
# docker run -p 3000:3000 --name lazy-sub test:1.0