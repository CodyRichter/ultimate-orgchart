To run the frontend and backend see the respective README within each folder

In order to run the database using Docker:

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Open the 404-Brain-Not-Found project folder in terminal
3. Type "docker-compose up" and wait for the program to compile
4. Make sure you have MongoCompass installed to see the database - connect using the url in the backend .env file

  ## Setting up the replica set

  1. If you have used `docker-compose up` to set up the local database before 11/7/2020, you must run `docker-compose down` to uninstall the previous container

  2. In the 404-brain-not-found directory run `docker-compose up` which will take care of setting up the 3 mongo instances which we will use in our replica set

  3. Once `docker-compose up` is finished open a **new terminal** and `cd` into the 404-brain-not-found directory

  4. Run `docker exec -it localmongo1 /bin/bash` if on Mac or Windows and `sudo docker exec -it test bash` if on Linux
  
  5. Enter `mongo` which is the password to login to the mongoshell

  6. Obtaining your local IPv4 address

    1. If you are using Windows run `ifconfig` in the command prompt which will display the list of IP addresses. What we want is the **WI-FI** IP address. (Do not use google to find your ip address which will not work)

    2. If you are using Mac go to **System-Preferences— Network—Advanced—TCP/IP—Ipv4 address** to get your IPv4 address

    3. If you are on Linux .... (tbd)

  7. Run the below command in the mongo shell and replace `{Your_local_ip}` with the address that you found in the previous step (**Notice: remember to remove the ''{}''**).

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

  8. Press enter to configure the replica sets
  9. Paste this Url `mongodb://localhost:27011,localhost:27012,localhost:27013/company?replicaSet=rs0` to the connection field in MongoCompass to check if you successfully configured the replica set
