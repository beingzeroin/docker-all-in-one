FROM alpine:latest

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update
RUN apk add --no-cache mongodb

RUN mkdir -p /data/db && \
    chown -R mongodb /data/db

VOLUME /data/db
EXPOSE 27017

CMD [ "mongod", "--bind_ip", "0.0.0.0"]