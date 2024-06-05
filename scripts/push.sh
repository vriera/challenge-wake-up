MINOR=5
docker tag "backend:0.0.1" "vriera/backend:0.0.$MINOR"
docker tag "nginx-spa:0.0.1" "vriera/nginx-spa:0.0.$MINOR"
docker push  "vriera/nginx-spa:0.0.$MINOR"
docker push "vriera/backend:0.0.$MINOR"
