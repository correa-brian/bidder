# Bidder

## Setup
Clone repository

Build the docker container
```
docker-compose build
```


Start the webserver
```
docker-compose up
```

Visit status page:
```
127.0.0.1:8080
```

Shut down container
```
docker-compose down
```

## Extra Commands / Resources
Examine container
```
docker run -it -p 8080:8080 bidder sh
```
