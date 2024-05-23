#!/bin/bash

############################################################
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo "This script allow to init a base project."
   echo
   echo "Syntax: generate_docker_base_files.sh [-g|h|r]"
   echo "options:"
   echo "h     Print this Help."
   echo "b     Build container. Params: <docker_env file>."
   echo "g     Generate Docker files. Params: <container_name>"
   echo "r     Run container. Params: <container_name>."
   echo
   echo "Usage example 1: generate_docker_base_files.sh -g my_container"
   echo "Usage example 2: generate_docker_base_files.sh -r my_container"
}


############################################################
# Generate docker-compose.yml file                         #
############################################################
GenerateDockerCompose()
{
  IMAGE_NAME=cuvl_lab3_${PWD##*/}
  echo "Generating docker-compose.yml file..."

  echo "version: '3.2'" > docker-compose.yml
  echo "services:" >> docker-compose.yml
  echo "  cuvl_lab3:" >> docker-compose.yml
  echo "    build:" >> docker-compose.yml
  echo "      context: ." >> docker-compose.yml
  echo "      dockerfile: Dockerfile" >> docker-compose.yml
  echo "    container_name: \${CONTAINER_NAME}" >> docker-compose.yml
  echo "    image: ${IMAGE_NAME}" >> docker-compose.yml
  echo "    volumes:" >> docker-compose.yml
  echo "      - ./src:/home/node/app/src" >> docker-compose.yml
  echo "      - ./tests:/home/node/app/tests" >> docker-compose.yml

  echo "Generating docker-compose.yml file...Done!"
}

############################################################
# Generate Dockerfile                                      #
############################################################
GenerateDockerfile()
{
  echo ""
  echo "Generating Dockerfile ..."

  PLATFORM=$(uname -m)
  FROM_PLATFORM=""
  if [[ $PLATFORM == "arm64" ]] # is a mac
  then
    FROM_PLATFORM="--platform=linux/x86-64 node:18-alpine"
  else
    FROM_PLATFORM="node:18-alpine"
  fi

  echo "FROM $FROM_PLATFORM" > Dockerfile
  echo "" >> Dockerfile
  echo "RUN apk add tar vim" >> Dockerfile
  echo "" >> Dockerfile
  echo "RUN curl --silent --location https://rpm.nodesource.com/setup_18.x | sh -" >> Dockerfile
  echo "RUN apk add nodejs" >> Dockerfile
  echo "" >> Dockerfile
  echo "" >> Dockerfile
  echo "WORKDIR /home/node/app" >> Dockerfile
  echo "" >> Dockerfile
  echo "COPY package*.json ./" >> Dockerfile
  echo "" >> Dockerfile
  echo "RUN npm install --verbose" >> Dockerfile
  echo "" >> Dockerfile
  echo "COPY . /home/node/app" >> Dockerfile
  echo "" >> Dockerfile

  echo "CMD \"npm\" \"run\" \"start:dev\"" >> Dockerfile

  echo "Generating Dockerfile ...Done!"
}

############################################################
# Generate env file                                        #
############################################################
GenerateDockerEnvFile()
{

  echo "# LOCAL ENVIRONMENT" > docker_dev.env
  echo "CONTAINER_NAME=$1" >> docker_dev.env

  echo "Generating docker_env file...Done!"
}

GenerateDockerIgnore()
{
  echo "node_modules" > .dockerignore 
  echo "npm-debug.log" >> .dockerignore 
}
############################################################
# Generate docker files                                    #
############################################################
GenerateAllDockerFiles(){
  GenerateDockerCompose $1
  GenerateDockerfile $2
  GenerateDockerEnvFile $1
  GenerateDockerIgnore
}

############################################################
# Run container                                            #
############################################################
RunContainer() 
{
  IMAGE_NAME=cuvl_lab3_${PWD##*/}

  CONTAINER_NAME=$1
  if [ -z "$1" ]
  then
    echo -n "Enter container name[$CONTAINER_NAME]: "
    read containername
  fi

  if [ -n "$containername" ] 
  then
    CONTAINER_NAME=$containername
  fi

  # echo "docker run -it --rm --name "$CONTAINER_NAME" -v $(pwd):/home/node/app/src "$IMAGE_NAME"_"$CONTAINER_NAME" sh"
  docker run -it --rm --name "$CONTAINER_NAME" -v $(pwd):/home/node/app "$IMAGE_NAME" sh
}

############################################################
# (Re)Build image and container to run tests.              #
############################################################
BuildContainer()
{
  ENV_FILE=$1
  if [ -z "$1" ]
  then
    echo -n "Enter docker env file path: "
    read dockerenvfile
  fi

  if [ -n "$dockerenvfile" ] && [ -e "$dockerenvfile" ]
  then
      ENV_FILE="$dockerenvfile"
  fi

  export INVALIDATE_CACHE=$((1+RANDOM%120))
  docker-compose --env-file=$ENV_FILE up --build --force-recreate
}

############################################################
# Main program                                             #
############################################################
# Get the options
while getopts ":hgbr:" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      b) # display Help
         echo "Building container..."
         BuildContainer $2
         echo "End building container."
         exit;;
      g) # display Help
         echo "Generating docker files..."
         GenerateAllDockerFiles $2
         echo "End generating docker files."
         exit;;
      r) # Run container
         RunContainer $2
         exit;;
      \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done

Help
echo
