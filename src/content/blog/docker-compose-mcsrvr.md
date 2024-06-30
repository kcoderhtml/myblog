---
title: Docker Compose Minecraft Server setup.
slug: docker-compose-mcsrvr
date: July 8, 2023
---

# Docker Compose Minecraft Server setup.

![docker compose and minecraft logos](https://assets.vrite.io/64974cb888e8beebeb2c925b/_fL_L6Ai92y9KW6w44lrz.jpeg)

Today, I am going to show you how to set up a docker minecraft server on Ubuntu. I use [itzg/docker-minecraft-server](https://github.com/itzg/docker-minecraft-server) for all my servers as, when paired with docker compose, it provides a fast, easy way to deploy new servers.

## Step 1 — Install Docker and Docker Compose:

1.  Update packages and install docker: Open a terminal and run the following command:
```bash
sudo apt-get update
sudo apt install docker docker-compose
```

1.  Add your user to the docker group: This allows you to run Docker commands without using sudo:
```bash
sudo usermod -aG docker $USER
```
2.  Verify installations: Check if Docker and Docker Compose are installed correctly by running the following commands:
```bash
docker --version
docker-compose --version
```

You should see the version numbers of Docker and Docker Compose, indicating that they are successfully installed.

If so, then that's it! You have now installed Docker and Docker Compose on Ubuntu.

## Step 2 — Configure the config

1.  Now copy the following code into a file called `docker-compose.yaml` or run the following command to download the file from my GitHub:
```bash
curl -O "https://gist.githubusercontent.com/kcoderhtml/dfc6674cf92c540bf0952d6387e7feab/raw/031868036ef4b971e5fe07298252321b610e7569/docker-compose.yml"
```
```yaml
version: "3.7"

services:
    mc:
    # set container name to mc
    container_name: mc
    # select what image we want to use
    image: itzg/minecraft-server:latest
    # configure variables
    tty: true               # equivalent for -t
    stdin_open: true        # equivalent for -i
    restart: unless-stopped
    # map storage for the server
    volumes:
        # use a named, managed volume for data volume
        - ./data:/data
    # load configuration from env file
    env_file: .env
    # expose the Minecraft server port outside of container
    ports:
        - 25565:25565
```

> This YAML file tells docker compose to create a minecraft server using the image `itzg/minecraft-server:latest` it also maps the data files of the server to the current directory, so you can add a custom world or edit the minecraft server config.

1.  Create an environment file called `.env` which will store the version information and whitelist. Don’t forget to set the proper memory value for your machine.
    
```bash
### Minecraft Server ###
EULA=true
# Set server type (vs the default of vanilla)
DIFFICULTY=hard 
# whitelist any players you want seperated by commas
WHITELIST=testplayer1,testplayer2
# set version information valid values: VANILLA | PAPER | FABRIC | FORGE
TYPE=PAPER
VERSION=1.19.2
# set memory
# its recommended to set MAX_MEMORY to around 2 gigs less than 
# the total amount of memory on your machine
INIT_MEMORY=2G
MAX_MEMORY=6G
```

## Step 3 — Start the server:

1.  Create a folder called `data`.
    
2.  Run the following command to start the server:
```bash
docker compose up -d
```

> If the server ever stops in the future than run the above command again to start it back up.

I hope you enjoy this tutorial and that it helped you in some way. Good luck!