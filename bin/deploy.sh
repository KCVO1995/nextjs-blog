git pull
yarn install --production=false
yarn build
docker build -t kcvo/node-web-app .
docker kill app
docker rm app
docker run --name app --network=host  -p 3000:3000 -d kcvo/node-web-app
