FROM node:8
VOLUME [ "/src" ]
WORKDIR /src

RUN apt-get update && apt-get install build-essential \
    python \
    make \
    g++ \
    nano \
    -y
