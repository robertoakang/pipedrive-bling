#!/bin/bash

pwd=$(pwd)
echo $1 $2

run() {
    echo "docker run -it \
        $cond \
        --name=$APP_NAME \
        --log-opt max-size=4M \
        $volume \
        -p "$APP_PORT":"$APP_PORT" \
        -d \
        --restart=unless-stopped $APP_NAME"
}

if [ $1 == "local" ]
    then
        cond="--net='host'"

        if [ $2 == "deploy" ]
            then
                read  -n 1 -p "Do you want to use volume?: [y/n] " proceed
                if [ "$proceed" = "y" ]; then
                    volume=""
                else 
                    volume="-v $pwd/src:/usr/app/src"
                fi

                printf "\n"

                read  -n 1 -p "Do you want too use default .env?: [y/n] " proceed_env
                if [ "$proceed_env" = "y" ]; then
                    export $(egrep -v '^#' .env.dev | xargs)
                else 
                    export $(egrep -v '^#' .env | xargs)
                fi

                docker build -t $APP_NAME -f docker/Dockerfile .
                docker stop $APP_NAME
                docker rm $APP_NAME
                eval $(run)
        fi

        if [ $2 == "stop" ]
            then
                docker stop $APP_NAME
        fi

        if [ $2 == "exec" ]
            then
                docker exec -it $APP_NAME $3
        fi

        if [ $2 == "start" ]
            then
                docker start $APP_NAME
        fi

        if [ $2 == "logs" ]
            then
                docker logs -f $APP_NAME
        fi
fi