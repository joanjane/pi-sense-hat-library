#!/bin/sh
docker build -f "./dev.Dockerfile" -t pi-sense-hat-library .
docker run --privileged --rm -it -v "$(pwd):/src" pi-sense-hat-library /bin/sh
