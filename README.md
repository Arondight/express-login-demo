# express-login-demo

## About

A login demo with [Express.js](https://github.com/expressjs/express.git) and [Vue.js](https://github.com/vuejs/core.git). I use this to practice front-end techniques.

## Dependence

### Node.js

```shell
export N_NODE_MIRROR="https://mirrors.ustc.edu.cn/node/"
export N_NODE_DOWNLOAD_MIRROR="https://mirrors.ustc.edu.cn/node/"
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo -E bash -s lts
```

### podman

1. [podman](https://podman.io/getting-started/installation) (and start as a service).
2. [podman-compose](https://github.com/containers/podman-compose#installation).

## Build

```shell
git clone https://github.com/Arondight/express-login-demo.git
cd ./express-login-demo/
sudo podman-compose -f ./podman-compose/mongodb.yml up -d
npm install
npm run build
npm start
xdg-open https://localhost:8000
```

## LICENSE

[MIT License](LICENSE).
