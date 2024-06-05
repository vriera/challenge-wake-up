cd..
docker-compose -f "docker-compose-local.yml" down
cd scripts
./build.sh
cd ..
docker-compose -f "docker-compose-local.yml" up -d