
# go to root directory of project
while [[ $PWD != '/' && ${PWD##*/} != 'nextjs-mongodb' ]]; do cd ..; done

# if the name of the current dir is / exit with error
if [[ $PWD == '/' ]]; then
    echo "Error: Could not find nextjs-mongodb directory"
    exit 1
fi

# get id of docker container with name laravel-vuejs-mysql-dev-env-app
containerId=$(docker ps -aqf "name=nextjs-mongodb-app-1")

# enter shell of docker container with id $containerId using bash
docker exec -it $containerId bash