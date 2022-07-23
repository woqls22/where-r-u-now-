# where-r-u-now?
### Usage
```
$ docker-compose up -d
```

### Description

- https://www.notion.so/jaebeenlee/182134fbd9804730b417aafd3530da98

### Demo

[![데모](http://img.youtube.com/vi/jliI87aV7vI/0.jpg)](https://youtu.be/jliI87aV7vI)


### Stacks

- Springboot
- kafka(zookeeper)
- react(typescript based, Mobx)

### 디렉토리구조
```
└── where-r-u-now-
    ├── README.md
    ├── docker-compose.yml
    ├── kafka/
        │   └── Dockerfile
    ├── server/
            └── whereRU/
                ├── Dockerfile
                ├── mvnw*
                ├── mvnw.cmd
                ├── pom.xml
                ├── src/
                ├── target/
                └── whereRU.iml
    └── web/
        ├── Dockerfile
        ├── README.md
        ├── config-overrides.js
        ├── node_modules/
        ├── package.json
        ├── public/
        ├── src/
        ├── tsconfig.json
        ├── webpack.config.js
        └── yarn.lock
```
