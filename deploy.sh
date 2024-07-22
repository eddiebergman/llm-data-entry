mkdir -p file_storage data logs
export UID=$(id -u)
export GID=$(id -g)
docker-compose up --build
