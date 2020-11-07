In order to run the app using Docker:

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Make sure you have Angular, Nest, and MongoDB installed
3. Open the Docker app
4. Open the 404-Brain-Not-Found project folder in terminal
5. Type "docker-compose build" and let the application set itself up (should take around 10 minutes)
6. Type "docker-compose up" and wait for the program to compile
7. In order to open mongo shell if needed, type "sudo docker exec -it test bash" if on Linux, and "docker exec -it mongodb bash" if on Windows in terminal
8. Then, type "mongo" in terminal and the shell should open



## Setting up the replica set

1. If you have used `docker-compose up` to set up the local database, you can run `docker-compose down` to uninstall the container

2. In the 404-brain-not-found directory run `docker-compose up` which will take care of setting up 3 replica sets

3. Once your `docker-compose up` is finished

4. Open a **new terminal** and`cd` into 404-brain-not-found directory

5. Run `docker -exec -it localmongo1 /bin/bash` 

6. Enter `mongo` which is password to login mongoshell

7. Here is the most important part

   1. If you are using Windows run `ifconfig` in the command prompt which will display the list of IP addresses. What we really want is the **WI-FI** IP address. (Do not use google to find your ip address which will not work)

   2. If you are using Mac go to **System-Preferences— Network—Advanced—TCP/IP—Ipv4 address** to get your IPv4 address

   3. Run this command replace `{Your_local_ip}` to the address that you just found out(**Notice: remember to remove the ''{}''**).

      ```shell
      rs.initiate({
        _id : 'rs0',
        members: [
          { _id : 0, host : "{YOUR_LOCAL_IP}:27011" },
          { _id : 1, host : "{YOUR_LOCAL_IP}:27012" },
          { _id : 2, host : "{YOUR_LOCAL_IP}:27013" }
        ]
      })
      
      //for example 
      rs.initiate({
        _id : 'rs0',
        members: [
          { _id : 0, host : "192.168.0.38:27011" },
          { _id : 1, host : "192.168.0.38:27012" },
          { _id : 2, host : "192.168.0.38:27013" }
        ]
      })
      ```

   

   4. Press enter to configure the replica sets

   5. Make sure you have download **Mongo Compass**

   6. Pase this Url `mongodb://localhost:27011,localhost:27012,localhost:27013/company?replicaSet=rs0` to the connection field to check if you successfully config the replica set

