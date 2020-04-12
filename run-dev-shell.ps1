docker build -f "./dev.Dockerfile" -t pi-sense-hat-library .
docker run --rm -it -v "$(pwd):/src" pi-sense-hat-library /bin/sh
