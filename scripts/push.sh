MINOR=2
docker tag "backend:0.0.$MINOR" "vriera/backend:0.0.$MINOR"
docker tag "nginx-spa:0.0.$MINOR" "vriera/nginx-spa:0.0.$MINOR"
docker push  "vriera/nginx-spa:0.0.$MINOR"
docker push "vriera/backend:0.0.$MINOR"
