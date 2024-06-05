cd ../frontend && yarn run build
cd .. && docker build -t "nginx-spa:0.0.1" .