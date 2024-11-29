docker run -d \
  --name nosql \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=securepassword123 \
  -v ./data:/data/db \
  --restart unless-stopped \
  mongo:latest
