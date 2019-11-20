FROM nginx:alpine

# Nginx
COPY ./config/nginx.conf /etc/nginx/nginx.conf

# Install node
RUN apk add --update nodejs>12.3.1 nodejs-npm>6.9

# Create app directory
WORKDIR /usr/src/app

# PM 2
RUN npm install -g pm2
RUN pm2 install pm2-server-monit

# Copy build files
COPY . .

EXPOSE 80

ENTRYPOINT /bin/ash -c "exec nginx -g 'daemon off;'  & pm2 start --no-daemon ./server/index.js -i max"
