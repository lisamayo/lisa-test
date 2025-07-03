> bash scripts/composer/POST_INSTALL.sh
Running yarn install...
qemu-x86_64: Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory
Yarn install failed.
Script bash scripts/composer/POST_INSTALL.sh handling the post-install-cmd event returned with error code 1
 
 
 
 .failed to solve: ddev/ddev-webserver:v1.23.5: failed to resolve source metadata for docker.io/ddev/ddev-webserver:v1.23.5: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: `` 
Failed to start accredo: docker-compose build failed: composeCmd failed to run 'COMPOSE_PROJECT_NAME=ddev-accredo docker-compose -f /Users/c7x4hg/sites/accredo-drupal/.ddev/.ddev-docker-compose-full.yaml --progress=plain build', action='[--progress=plain build]', err='exit status 17', stdout='#0 building with "default" instance using docker driver

#1 [db internal] load build definition from Dockerfile
#1 transferring dockerfile: 750B done
#1 DONE 0.0s

#2 [web internal] load build definition from Dockerfile
#2 transferring dockerfile: 2.19kB done
#2 DONE 0.0s

#3 [web internal] load metadata for docker.io/ddev/ddev-webserver:v1.23.5
#3 ERROR: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``

#4 [db internal] load metadata for docker.io/ddev/ddev-dbserver-mariadb-10.4:v1.23.5
#4 ERROR: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``
------
 > [db internal] load metadata for docker.io/ddev/ddev-dbserver-mariadb-10.4:v1.23.5:
------
------
 > [web internal] load metadata for docker.io/ddev/ddev-webserver:v1.23.5:
------
', stderr='failed to solve: ddev/ddev-webserver:v1.23.5: failed to resolve source metadata for docker.io/ddev/ddev-webserver:v1.23.5: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``', output='#0 building with "default" instance using docker driver

#1 [db internal] load build definition from Dockerfile
#1 transferring dockerfile: 750B done
#1 DONE 0.0s

#2 [web internal] load build definition from Dockerfile
#2 transferring dockerfile: 2.19kB done
#2 DONE 0.0s

#3 [web internal] load metadata for docker.io/ddev/ddev-webserver:v1.23.5
#3 ERROR: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``

#4 [db internal] load metadata for docker.io/ddev/ddev-dbserver-mariadb-10.4:v1.23.5
#4 ERROR: error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``
------
 > [db internal] load metadata for docker.io/ddev/ddev-dbserver-mariadb-10.4:v1.23.5:
------
------
 > [web internal] load metadata for docker.io/ddev/ddev-webserver:v1.23.5:
------
', stderr='failed to solve: ddev/ddev-webse
