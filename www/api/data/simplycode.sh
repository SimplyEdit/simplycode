docker run \
    --env "USER_GID=$(id -g)" \
    --env "USER_ID=$(id -u)" \
    --interactive \
    --publish-all   \
    --rm \
    --tty \
    --volume "${PWD}:/var/www/www/api/data" \
    --volume "${PWD}/assets:/var/www/html/assets" \
    ghcr.io/simplyedit/simplycode-docker:main
