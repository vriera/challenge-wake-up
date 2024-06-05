docker build . -t "build-app-env:0.0.1"

docker run --rm \
  -v "$(pwd)/.env:/app/.env" \
  -v "$(pwd)/build:/app/build" \
  build-app-env:0.0.1
