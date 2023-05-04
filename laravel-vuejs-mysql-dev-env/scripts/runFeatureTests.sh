# get id of docker container with name laravel-vuejs-mysql-dev-env-app
containerId=$(docker ps -aqf "name=laravel-vuejs-mysql-dev-env-app")

# run unit tests
docker exec -it $containerId bash -c "cd ./back-end && php artisan test --testsuite=Feature --stop-on-failure"
